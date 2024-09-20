---
title: "RSS"
categories:
  - name:
published_date: "2024-05-14"
template: page
---

RSS

- aggregator: fetches feeds, and keeps state of which posts are read or not (+optional: labels, favorite)
  - should be web based, because mobile and desktop should be synced (if I read a post on my phone, I don't want my laptop to show it to me as unread)
  - as a service: Feedly etc. Would like to avoid (subscription, bad interop, closed source)
  - self-hosted: Tiny Tiny RSS, FreshRSS, miniflux, ...
  - I don't want to use Omnivore, though it has good momentum right now: it already feels bloated and slow, I don't like the AI things (check: are there really any?), it's not designed to only be an aggregator but a full-fledged reading env. I have my own bookmarking solution (which I'm developing into a hughlighting solution as well). I see the feed as something separate: it feeds me posts, which I _might_ bookmark for later or which I might drop. It's noise and I'll try to pick signal from it, saving it to my bookmarks
  - Easy to find hosted instances of self-hosted solutions. TTRSS feels older and more complex, and I'm not sure if it's supported by a lot of clients. FreshRSS feels pretty nice and has good docs on which clients can be used with it. Haven't tried miniflux (there's an offical, SAAS hosted instance with a free trial, but dev asks not to use disposable email addresses to actually try it, threw me off), also I don't think it's widely supported by clients (?), e.g. Readrops
- clients
  - Android: Readrops. 3y old app. Dev is working on a V2. There might be others, but this one clearly has first-class support for FreshRSS
  - Ubuntu: Newsflash. State of the art, active community, great

## Others

Imported OPML, all articles are marked unread. Is the read-unread status built into OPML? Or is that state handled by the aggregator and not interoperable? (e.g. what if I wanted to switch between FreshRSS and TTRSS, would all articles be marked unread again?). This is not really a problem for me, since I see the feed as more of an infinite feed thing

How can I easily bookmark an article from the clients? They make it difficult to get to the article's link (there's always an "open in browser" button but loading this to then save in my bookmarking solution feels weird)

Or should I bookmark only after reading sometimes? e.g. I read something in the client's reader (not on the web), like it, bookmark+archive it, or if I don't like it I don't bookmark at all? Why not but it would be better to use the reader in my bookmarking solution, so I can use highlighting there later on. Usually I think it's a matter of reading the very beginning of a post and seeing what's worth bookmarking

ALSO some things aren't meant to be bookmarked! Videos. Releases that I might subscribe to. Social media. This kind of stuff. The feed will be pretty diverse (Q: is that a problem?), I should bookmark when I want to actively THINK about something, I guess

## Tools (aggregators)

- FreshRSS: https://github.com/FreshRSS/FreshRSS
  - public instance: https://rss.hostux.net/
- TTRSS: https://gitlab.tt-rss.org/tt-rss/tt-rss
  - public instance: https://rss.g3l.org/ (cood: hosted by folks in Ardèche 07!)
- Omnivore: https://github.com/omnivore-app/omnivore
  - new and shiny, but complex platform (seems to require Next.js on Vercel, GraphQL, GCP, a mailing tool etc.), plus will not be free anymore (https://docs.omnivore.app/about/pricing.html) and unlikely that others will host it for free in the future since it depends on a complex stack (see [domestication of users](https://seirdy.one/posts/2021/01/27/whatsapp-and-the-domestication-of-users/), this is a complex platform, OSS but not designed to be self hosted) ([people have been saying this since the early days of the tool](https://github.com/omnivore-app/omnivore/issues/25)). Compatible with third party apps that use the "standard" Google Reader API? https://github.com/omnivore-app/omnivore/issues/3984
  - official instance at https://omnivore.app/
- proprietary (Feedly etc)

## Tools (readers)

- Gnome: https://gitlab.com/news-flash/news_flash_gtk
-

## Others others

Look at https://gitlab.gnome.org/World/read-it-later, client for Wallabag :eyes:, similar to our notes tool???
