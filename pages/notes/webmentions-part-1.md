---
title: "Webmentions, part 1"
categories:
  - name: meta
  - name: dev
publishDate: "2022-04-09"
template: page
buildScript: "/scripts/processNote.js"
---

> Update, July 2022: I lost momentum here and I'm not so interested in webmentions anymore at this point. Part 2 was never published. I might come back to them once more in a few years!

Although I've known about [webmentions](https://www.w3.org/TR/webmention/) for years, I never actually set them up before.

But with encouragement from C who shared a good intro article by Rowan Manning, _[Webmentions for your Static Site](https://rowanmanning.com/posts/webmentions-for-your-static-site/)_, I think now's the time!

I have no intention of listing the hoops through which one has to jump in order to set up webmentions. It was painful enough to wrap my head around all the components and quirks of the standard—I'm not surprised that webmentions haven't really been picking up speed.

This note is little more than a test of my setup: if it shows up as a reaction to Rowan's post linked above, it worked.

---

At this point, this website should be set up for:

- [Web sign-in](https://indieweb.org/Web_sign-in) using [RelMeAuth](https://microformats.org/wiki/RelMeAuth), basically it has a link with `rel="me"` so I can log into services using my domain
- Receiving webmentions using the popular [Webmention.io](https://webmention.io/) service[^1]. This _just works_ with a couple `<link>` tags in my `<head>`, Webmention.io handles the complexity (thank you!)
- Microformats in notes so that other people's websites can receive webmentions from me. This uses the (badly documented, let's be honest) [`h-entry` microformat](http://microformats.org/wiki/h-entry)

Next up (for part 2):

- Display webmentions from others at the bottom of notes (provided by Webmention.io)
- Dispatch webmentions automatically in CI. Right now, I'm using yet another service called [Telegraph](https://telegraph.p3k.io/) to manually send webmentions from a web UI (a.k.a. to make a POST request that tells a target website that my note mentions it)
- Fix things after trial and error: it looks like this is how it's done!

I find the concept of webmentions really cool and I wish they weren't as complicated to understand/set up. Is it a design problem or a documentation problem? Maybe both?

[^1]: Using this service is why I needed RelMeAuth in the first place.
