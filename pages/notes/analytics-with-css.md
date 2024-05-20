---
title: "Analytics with CSS"
desription: "Yet another creative way to track users against their will?"
categories:
  - name: dev
publishDate: "2024-05-20"
template: "/templates/page.html"
buildScript: "/scripts/processNote.js"
---

I like a lot of the ideas behind [BearBlog](https://bearblog.dev/), a lightweight blogging platform.

But: in [How Bear does analytics with CSS](https://herman.bearblog.dev/how-bear-does-analytics-with-css/), the author explains how they came up with a new way to track unique page views without JavaScript.

> The main downside [of JS analytics], however, is that most adblockers block analytics scripts. And not just the bad ones, like Google Analytics. Even Fathom and Plausible analytics struggle with logging activity on adblocked browsers.

But... that's the point of these tools (adblockers, script blockers, etc.)! It's not about whether your tracker is "good" or "bad". It's about privacy and respecting users' choices.

Luckily, and despite all these efforts to circumvent adblockers, uBlock and others still block the BearBlog analytics request (via the [EasyPrivacy blocklist](https://easylist.to/#easyprivacy)).
