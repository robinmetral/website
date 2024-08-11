---
title: "New website"
description: "I'm rebuilding my website using Astro, with a fern-inspired theme and a focus on accessibility."
categories:
  - name: meta
  - name: dev
published_date: "2021-08-22"
template: page
buildScript: "/scripts/processNote.js"
---

The time has come: I'm rebuilding my website (again). Welcome to robinmetral.com v5! [^1]

v5 changes from v4 in a number of more and less visible ways–here's a quick overview.

---

## The less visible

### New tech

This website is now built using [Astro](https://astro.build).

I first heard about Astro from [Connor](https://connorbaer.co), before following along Robin Rendle's [firsthand experience with it](https://www.robinrendle.com/notes/redesign-moving-to-astro/). He ended up [having justified doubts](https://www.robinrendle.com/notes/2021-08-11-redesign-everything-broke/) about it, but still: after spending less than a minute on [the Astro website](https://astro.build), I was convinced to switch.

By default, websites built with Astro send zero bytes of JavaScript to the browser. They are truly static, made of only HTML and CSS.

But they don't abandon interactivity completely: Astro runs any JavaScript at build time, and it supports something called [partial hydration](https://docs.astro.build/core-concepts/component-hydration). So for example:

- I'm fetching data from a [weather API](https://brightsky.dev/) to show an appropriate greeting on [the homepage](/): "Hello from _sunny_/_rainy_/_stormy_/... Berlin". The call happens at build time, so your browser never has to fetch the data itself [^2]
- any interactive component can be selectively hydrated, i.e. transformed from static markup to dynamic JavaScript, to do anything that a modern SPA can do. This has been called an [island architecture](https://jasonformat.com/islands-architecture/)–I like the metaphor :)

Finally, Astro also supports my favorite tooling out of the box: [Tailwind](https://tailwindcss.com/) for styling[^3], Markdown (with remark plugins!) for writing articles, TypeScript, and more.

Too good to be true? A little: Astro is still in early beta, so it still has a lot of bugs and crucially lacks developer tools like formatters or proper TypeScript type-checking.

Fortunately, Astro is under active development, and these issues are being worked on[^4]. Exciting!

### Better accessibility

I want everyone who visits this website to have a good experience with it, so I'm trying to make it as inclusive as possible.

So far, this has involved:

- proper keyboard navigation and focus styles (unfortunately, Tailwind strips off these styles by default, so you need to set them explicitly)
- a skip link for keyboard/screen reader users ([what is a skip link?](https://webaim.org/techniques/skipnav/))
- a dark/light theme switcher based on your OS's preferred color scheme (read [the rationale](https://inclusive-components.design/a-theme-switcher/) on Heydon Pickering's excellent Inclusive Component)
- accessible footnotes (in progress: this is soon to be [my first contribution to Astro](https://github.com/snowpackjs/astro/issues/1191)!)

<p class="sr-only">Speaking of which, it looks like you're using a screen reader. If you have any feedback or suggestions, I'd love to hear them! You can contact me any time at robin@metral.ch.</p>

---

## The more visible

### New styles

I started using a font called [Fern](https://djr.com/notes/junes-font-of-the-month-fern-text) by David Jonathan Ross. It's more playful and laid back than my v4 font, [Bitter](http://www.solmatas.com/#/bitter/), a slab serif by Sol Matas. I also love its small caps, italics, and ornaments: ✷❧

To complement the font, I'm in the process of refining a fern-inspired color palette, with forest greens and mineral oranges. The biggest challenge so far is to make it suitable for both light and dark themes.

### New contents

The content on this website will be published in the form of "notes" (term borrowed from [Robin Rendle](https://www.robinrendle.com/notes)). Notes can vary in length from a tweet to an essay, they can come out several times a day or once a year, and they can (and will) cover a variety of topics.

One of the things I've struggled with in the past when publishing is setting too many fences, too quickly. Think: coming up with types of content and content categories upfront, or committing to strict schedules only to drop everything when I would fall behind.

This time, I want to start without fences, grow this space more organically, and see where this goes.

Also, notes can end abruptly and they can sometimes feel like unfinished thou

[^1]: I built my first few websites with WordPress (v1.x), then went through a couple homepages using [Gatsby](https://github.com/gatsbyjs/gatsby/) (v2, v3), one using [Next.js](https://github.com/vercel/next.js) (v4), and finally this one: v5.
[^2]: This should generally be the default, to avoid unnecessary runtime network requests (why ask every visitor to fetch the same data when a server can do it once and share it with everyone?) Of course, the challenge becomes building the website often enough to keep the data up-to-date—mine autodeploys every two hours _(Update, September 3rd: I'm now making the call at runtime to avoid the CRON builds)_. Also, if a data source is highly dynamic, like a comment section, you might still want to fetch data at runtime. Luckily, Astro has a solution for this—go back to the second bullet point:
[^3]: Update, September 12th: I've stopped using Tailwind on this website in favor of vanilla CSS.
[^4]: There's [an issue](https://github.com/snowpackjs/astro/issues/1020) about the lacking type-checking, and a Prettier plugin is [currently being built](https://github.com/snowpackjs/astro/issues/408) into the Astro VSCode extension.
