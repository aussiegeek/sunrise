Angular + Go
============

I've been discussing with a few people recently about how I've been experimenting with hooking up Go + Angular, and especially what do do about the asset build pipeline.

I gave a talk recently at the Melbourne Go Meetup about how I put it together, but realised a simple repo would probably make it easier to see what I've done so far.

Beware I'm still getting the hang of Go & Angular so there are probably a number of things I'm doing wrong. Please tell tell me what they are.

Usage
-----

Development:

In seperate tabs:
* go run app.go
* grunt dev
* navigate to http://localhost:5000 and activative livereload

Productiion:
* Get your go binary on the server somehow (I just compile on the server)
* grunt dist:build

Issues
------

* Auto restarting go app while in dev on code changes
* Grunt doesn't seem to have a plugin to renaming images in a way that allows setting the expires to max
* Can't seem to wildcard javascript includes like in sprockets
