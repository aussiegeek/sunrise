package main

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/pebbe/novas"
	"log"
	"net/http"
	"path"
	"strconv"
	"time"
)

func main() {
	log.Println("Starting on port 5000")
	r := mux.NewRouter()
	r.Handle("/api/sunrise", sunrise())
	r.PathPrefix("/").Handler(http.FileServer(http.Dir(path.Join("public"))))
	http.Handle("/", r)

	log.Fatalln(http.ListenAndServe(":5000", nil))
}

const (
	sundip = float64(-0.8)
)

type SunriseResponse struct {
	Sunrise time.Time `json:"sunrise"`
	Sunset  time.Time `json:"sunset"`
}

func sunrise() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		response := &SunriseResponse{}

		now := time.Now()

		height := 0.0
		temperature := 20.0
		latitude, err := strconv.ParseFloat(r.FormValue("latitude"), 64)
		if err != nil {
			log.Panicln(err)
		}
		longitude, err := strconv.ParseFloat(r.FormValue("longitude"), 64)
		if err != nil {
			log.Panicln(err)
		}

		geo := novas.NewPlace(float64(latitude), float64(longitude), height, temperature, 1010)
		sun := novas.Sun()

		t0 := novas.Date(now.Year(), int(now.Month()), now.Day(), 0, 0, 0, 0, now.Location())

		t1, _, err := sun.Rise(t0, geo, sundip, time.Second, novas.REFR_NONE)
		if err != nil {
			log.Panic(err)
		}
		response.Sunrise = t1.Time

		t1, _, err = sun.Set(t0, geo, sundip, time.Second, novas.REFR_NONE)
		if err != nil {
			log.Panic(err)
		}
		response.Sunset = t1.Time

		responseBytes, err := json.Marshal(response)
		if err != nil {
			log.Panicln("Error marshalling json", err)
		}
		w.Write(responseBytes)
	})
}
