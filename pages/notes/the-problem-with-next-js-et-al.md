---
title: "The problem with Next.js (et al.)"
categories:
  - name: dev
published_date: "2023-04-04"
template: page
---

...as an illustrated, real-world example.

Here's a wonderfully simple, single-page, static personal website: [ianspalter.com](https://ianspalter.com).[^1]

Let's take a look under the hood:[^2]

<img width="1280" height="703" style="aspect-ratio:1280/703;height:auto;" src="/static/images/20230404-nextjs-with-js.webp" alt="ianspalter.com with the devtools network tab open">

We can see that:

- The site uses Next.js (we can tell by the script names but the DOM is also wrapped in a `<div id="__next" />`)
- There's 26 total network requests, for a total of 2.08 MB and a total load time of 3.94s.[^3]
- 13 of those network requests (half of them) fetch Next.js scripts (as far as I can tell, there's not a single custom script, it's just built-in framework stuff)

Let's disable JS altogether and see what happens:

<img width="1280" height="703" style="aspect-ratio:1280/703;height:auto;" src="/static/images/20230404-nextjs-no-js.webp" alt="ianspalter.com with the devtools network tab open, and noticeably less network requests">

So, without JavaScript:

- The site looks exactly the same
- But now there's only 9 network requests (that's a _third_ of the JS version), for a total of 1.53 MB and a total load time of 2.55s.

## Answering questions you didn't ask (a.k.a. more thoughts)

- Yes, this is still quite heavy even with JS disabled. Optimize your images, and prefer [system fonts](https://modernfontstacks.com/) in general. A website like this could have as few as 4-5 requests (HTML document, CSS stylesheet, the picture, a font, a favicon) and a total weight of under 100 KB.
- Yes, it would be even worse on Create React App, since the site would be blank without JS. Next.js did help raise the bar of the React ecosystem, and it can still be a good choice for some use cases.
- I agree, that's far from the only problem with Next.js. This is just one that's closer to my heart than the whole "Next.js vs Remix" saga because while it's obvious to me now that a small static website shouldn't run on Next.js, I built plenty of them in the past without thinking twice about what opting into a frontend framework really meant. If someone gets into web development today, I can see how they could easily default to a JavaScript-heavy framework and their associated hosting services provider, instead of starting with HTML and adding complexity+abstractions selectively, when it makes sense for a given use case. The rising webpage obesity rate in the last few years might partly be an effect of equating frontend=React (or your client-side framework of choice) too much.
- Basically frontend frameworks can be [pits of despair](https://blog.codinghorror.com/falling-into-the-pit-of-success/) for frontend development (at the least when it comes to performance, which in turn impacts user experience, which is the whole point). I wouldn't call WordPress a pit of success (because it still requires a running server plus actual network calls can be slow if there's no CDN in the equation) but it seems to me that despite its shortcomings, pages will tend to be lighter and more accessible by default (i.e. when not making proactive efforts about any of these): it optimizes assets, has proper routing (multiple pages), nice form plugins that work without JS, some kind of caching defaults, etc etc

[^1]: although I use a personal website as an example, this is not meant as a personal attack AT ALL, but some kind of rant about frontend frameworks that will probably lead nowhere
[^2]: popped out my devtools because this loaded VERY slowly on my < 8 MB/s WiFi connection
[^3]: tested only once on my slow middle-of-nowhere WiFi connection. Of course this would load faster on fiber, and slower on some mobile connections

<style>
  article img {
    border: 1px solid currentColor;
  }
</style>
