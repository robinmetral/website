---
title: "A new website"
description: "I'm rebuilding my website using Astro, with a fern-inspired theme and a focus on accessibility."
publishDate: "2021-08-22"
layout: "../../layouts/Post.astro"
---

The time has come: I'm rebuilding my website (again). Welcome to robinmetral.com v5! [^1]

v5 changes from v4 in a number of more and less visible ways.

---

## The less visible

### Astro

This website is now built using [Astro](https://astro.build).

I first heard about Astro from [Connor](https://connorbaer.co), before following along Robin Rendle's [firsthand experience with it](https://www.robinrendle.com/notes/redesign-moving-to-astro/) on his blog. He ended up [having doubts](https://www.robinrendle.com/notes/2021-08-11-redesign-everything-broke/) about Astro, but still: after spending less than a minute on their website, I was convinced to switch.

By default, websites built with Astro send zero bytes of JavaScript to the browser. They are truly static, made of only HTML and CSS.

But it doesn't abandon interactivity completely: it runs any JavaScript at build time, and supports something called [partial hydration](https://docs.astro.build/core-concepts/component-hydration). So for example:

- data can be fetched at build time, to avoid runtime network requests. For my [homepage](/), I'm calling a [weather API](https://brightsky.dev/) to show the appropriate greeting: "Hello from _sunny_/_rainy_/_stormy_/... Berlin"
- any interactive component can be selectively hydrated, i.e. transformed from static markup to dynamic JavaScript. This has been called an [island architecture](https://jasonformat.com/islands-architecture/)–I like the metaphor :)

And that's not all: Astro also supports my favorite tooling out of the box: [Tailwind](https://tailwindcss.com/) for styling, Markdown (with remark plugins!) for writing articles, TypeScript, and more.

Too good to be true? A little: Astro is still in early beta, so it still has a lot of bugs and crucially lacks developer tools like a formatter or proper TypeScript type-checking.

Fortunately, Astro is under active development, and these issues are being worked on[^2]. Exciting!

### Accessibility

Even is this site isn't visited by many, I want everyone to have a good experience with it, so I'm trying to make it as inclusive as possible.

So far, this involves:

- proper keyboard navigation and focus styles (unfortunately, Tailwind strips off these styles by default, so you need to set them explicitly)
- a skip link for keyboard/screen reader users ([what is a skip link?](https://webaim.org/techniques/skipnav/))
- a dark/light theme switcher based on your OS's preferred color scheme (read [the rationale](https://inclusive-components.design/a-theme-switcher/) on Heydon Pickering's excellent Inclusive Component)
- accessible footnotes (in progress: this is soon to be [my first contribution to Astro](https://github.com/snowpackjs/astro/issues/1191)!)

<p class="sr-only">It looks like you're using a screen reader. If you have any feedback or suggestions, I'd love to hear them! You can contact me anytime at robin@metral.ch.</p>

---

## The more visible

### New styles

I started using a font called [Fern](https://djr.com/notes/junes-font-of-the-month-fern-text) by David Jonathan Ross. It's more playful and laid back than my v4 font, [Bitter](http://www.solmatas.com/#/bitter/), a slab serif by Sol Matas. I also love its small caps, italics, and ornaments ✷❧

To complement the font, I'm in the process of refining a fern-inspired color palette, with forest greens and mineral oranges. The biggest challenge so far is to maker it suitable for both light and dark themes.

### New contents

(in progress)

[^1]: I built my few websites with WordPress (v1), then went through a couple homepages using [Gatsby](https://github.com/gatsbyjs/gatsby/) (v2, v3), one using [Next.js](https://github.com/vercel/next.js) (v4), and finally this one: v5.
[^2]: There's [an issue](https://github.com/snowpackjs/astro/issues/1020) about the lacking type-checking, and a Prettier plugin is [currently being built](https://github.com/snowpackjs/astro/issues/408) into the Astro VSCode extension.
