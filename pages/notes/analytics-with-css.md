---
title: "Analytics with CSS"
desription: "Yet another creative way to track users against their will?"
categories:
  - name: dev
published_date: "2024-05-20"
template: page
buildScript: "/scripts/processNote.js"
---

I like a lot of the ideas behind the [BearBlog](https://bearblog.dev/) blogging platform: lightweight pages, RSS feeds, and "No trackers, ads, or scripts".

But: in [How Bear does analytics with CSS](https://herman.bearblog.dev/how-bear-does-analytics-with-css/), the author explains how they came up with a new way to track unique page views without JavaScript.

> The main downside [of JS analytics], however, is that most adblockers block analytics scripts. And not just the bad ones, like Google Analytics. Even Fathom and Plausible analytics struggle with logging activity on adblocked browsers.

But... that's the point of these privacy tools (ad blockers, anti-tracking extensions, etc)! It's not about whether your tracker is "good" or "bad". It's about privacy and respecting users' choices.

If a subset of your users use privacy extensions to prevent ads and tracking, just don't track them, period.

Luckily, and despite these efforts to circumvent privacy extensions, uBlock and others still block the BearBlog analytics request (via the [EasyPrivacy blocklist](https://easylist.to/#easyprivacy)).
