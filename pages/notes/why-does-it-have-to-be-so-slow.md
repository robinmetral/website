---
title: "Why does it have to be so slow"
categories:
  - name: maps
  - name: web
publishDate: "2023-11-26"
template: "/templates/page.html"
buildScript: "/scripts/processNote.js"
---

Hey it's cool that [millionaires digitize their map collection and share it with the world](https://www.openculture.com/2023/11/oculi-mundi-a-beautiful-online-archive-of-130-ancient-maps-atlases-globes.html) but why does the website, "[Oculi Mundi](https://oculi-mundi.com/)", have to be so slow?

<img width="1280" height="618" style="aspect-ratio:1280/618;height:auto;" src="/static/images/20231126-oculi-mundi.webp" alt="A screenshot from Oculi Mundi's Collection page. We see a number of maps and manuscripts floating on a 3d canvas">

It's not like they haven't [thought about it](https://oculi-mundi.com/orientation):

> Oculi Mundi aims to be as accessible as possible. It should run smoothly on different Internet speeds and has been designed to be used smoothly on mobile phones, tables, laptops, and PCs.

...it's _not_ smooth though. Images take forever to load, complex JS animations and scrolljacking make the whole experience janky at best (some pages are simply unusable), and my 2014 laptop starts overheating if I browse for more than 10 seconds.

I took a quick look at transfer size: loading the homepage transfers about 2 MB. The "Collection" page (which contains a sort of floating gallery of the digitized map collection, pictured above) loads a total of about 15 MB (in 16s). This is... surprisingly little? At least given the number of images in there. Sure it could be better, but seeing how my ex-employer's pretty straightforward homepage loads about 8 MB (in 8s), we're within range of acceptable.

While transfer size is often the main cause of sluggishness for more traditional websites (that follow a predictable load &rarr; parse &rarr; paint pattern, with loading assets like fonts, images and videos taking the longest), in this case the issue really is the render itself. After loading and parsing, the browser has to calculate the dimensions and location of a LOT of these "floating" items for each paint, and since there's a lot of animating, there's also a lot of repainting. Events take my laptop up to 150ms to process: goodbye smooth 60 FPS animations, hello jank. This kind of processing obviously takes its toll on the CPU so as a bonus I get a noisy laptop fan. (Now may be the right time for a reminder that while this specific website might seem smooth on your M2 MacBook or your Samsung Galaxy S23[^1], [most of the world's internet users have old devices and slow connection speeds](https://infrequently.org/2022/12/performance-baseline-2023/).)

Then I start interacting and browsing the map collection and that's when, as the saying goes, shit hits the fan.

Nice maps though

[^1]: it is actually quite smooth on my S22
