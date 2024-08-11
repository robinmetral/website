---
title: "Weeknote #30: coding"
categories:
  - name: weeknotes
published_date: "2023-10-15"
template: page
buildScript: "/scripts/processNote.js"
---

_Week 41 (9–15 October 2023)_

## Coding

Still recovering from my [climbing injury](/notes/weeknote-28-double-trouble/). I walk almost normally and carefully went bouldering again, sticking to the grade below my level. But we spent most of the week at home—beyond the mobility issues we needed the rest after [our trip last week](/notes/weeknote-29-languedoc-trip/).

So I coded. C and I have a small ongoing project to build a sort of [Pocket](https://getpocket.com/) alternative (a bookmarking service) because Pocket doesn't have the features we want, plus we don't want to pay $10/month[^1] only to find ourselves locked to Pocket for the foreseeable future[^2]. And it's fun.

This week we got the project to a working version! This is how it works in a nutshell:

- for saving article we use a custom bookmarklet. I packed all of [mozilla/readability](https://github.com/mozilla/readability) into it with Rollup. The bookmarklet sends the article to a cloud function (a [Cloudflare Worker](https://www.cloudflare.com/developer-platform/workers/))
- the function authorizes the request using dumb HTTP Basic Auth and saves the article in a [Cloudflare D1](https://www.cloudflare.com/developer-platform/d1/) database, sort of a hosted, serverless [sqlite](https://www.sqlite.org/) (picked this because it's nicely integrated with Workers, but I should probably start hosting Postgres or something)
- there's a web app (vanilla JS!) (deployed to [Cloudflare Pages](https://www.cloudflare.com/developer-platform/pages/)) that allows users (2 MAUs!) to fetch their saved articles, read them on a nice interface (C designed it so it's nicer than this website, promise), and favorite and/or archive them

The next big step is to add highlighting+annotation features, which unlike Hypothes.is won't be vulnerable to link rot since article content is saved to the DB. But in the meantime we both use the thing already for simple bookmarking/reading!

## Watching

Saw _Tokyo Vice_, it had been a while we hadn't watched a series! ([There's more coming](/notes/season-2-season/).) (Can't actually remember the last one we watched just now, probably a few months ago?[^3])

- [**Tokyo Vice** season 1 (2022) by J. T. Rogers](/notes/tokyo-vice-season-1-by-j-t-rogers/) 6/10
- [**Chicago** (2002) by Rob Marshall](/notes/chicago-by-rob-marshall/) 7/10
- [**A Haunting in Venice** (2023) by Kenneth Branagh](/notes/a-haunting-in-venice-by-kenneth-branagh) 6/10

## Reading

After a long wait my turn came to rent the third (audio)book of R. F. Kuang's [Poppy Wars trilogy](/notes/the-poppy-war-by-r-f-kuang/) on Libby. It's 24-hours long, I'm about a third through it and have 7 days left before the next person gets it. Homework.

[^1]: Pocket is free for bookmarking, but highlighting articles for example is a premium feature. [Hypothes.is](https://web.hypothes.is/) is great for highlighting/annotating (though not immune to link rot) but it's not designed to save bookmarks. [Instapaper](https://www.instapaper.com/) is probably the closest thing to what we'd like to build
[^2]: Pocket's [export feature](https://getpocket.com/export) is incredibly underwhelming. It only exports an HTML page with a list of URLs without any metadata (source site name, article length, date it was saved), without a way to access the article content except by accessing the URL (link rot warning), without tags, without highlights. I wonder what they do when someone requests their data under GDPR (let's see!)
[^3]: C reminds me we saw the first season of _Midnight Diner: Tokyo Stories_ (2016) recently-ish, there's a theme
