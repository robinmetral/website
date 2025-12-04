---
title: "Bye Cloudflare, hello Deuxfleurs"
categories:
  - name: meta
published_date: "2025-12-04"
template: page
---

For the past three or four years, this website has been served by [Cloudflare Pages](https://robinmetral.com/notes/deploying-a-static-site-to-cloudflare-pages/).

Until today.

It's now hosted on a handful of refurbished servers running in people's living rooms.

---

I initially started using Cloudflare Pages because it was free, easy to set up, powerful, and above all: extremely fast.

Pages websites are deployed to Cloudflare's CDN, which spans hundreds of locations around the world (over 330 at time of writing). In other words: my website was served from the data center closest to the user, in all likelyhood from the same country, or even region. This improves performance as it reduces latency (the time it takes for a packet to go from a client device to the web server). Cloudflare claims that "the Cloudflare network can reach about 95% of the world’s population within approximately 50 ms."

---

Large "web apps" (bloated websites) rely on CDNs like Cloudflare's because web performance is getting so bad that hosting close to users is seen as a solution to "fix" performance issues, instead of reducing page weight.[^1]

For a small personal website like this one, using a CDN doesn't make a lot of sense: performance gains are minimal since most (if not all) pages weigh under 10 kB and should load in a single round-trip. If anything, hosting on 330 data centers only adds to the website's environmental footprint. There genuinely doesn't need to be a copy of this page on a server in Tahiti.

---

Enter [Deuxfleurs](https://deuxfleurs.fr/).

Deuxfleurs is the [kitten](https://www.chatons.org/en) I've been looking for: this small non-profit hosts static websites (among other things) on second-hand desktop computers repurposed into servers.

[The production servers](https://guide.deuxfleurs.fr/infrastructures/production/) are hosted in a handful of locations (for redundancy). By "locations", I mean "living rooms": there's a chance that the page you're reading was served from here:

![Three servers and a router piled up on a small table](https://guide.deuxfleurs.fr/img/serv_corrin.jpg)

Cosy!

---

Post-migration observations:

Performance-wise, quick manual testing using WebPageTest (2 runs per case) shows that for a US desktop on wifi, LCP (Largest Contenful Paint) increased from ~0.5s to ~1.7s (still within Google's definition of "good"). In Europe, LCP is stable at ~0.5s, as expected since the servers are in France.

One minor issue is that Deuxfleurs' static hosting solution doesn't (yet) support setting custom `Cache-Control` headers, which I used on Cloudflare Pages to cache static assets (CSS, images) as immutable, and to increase the default caching of HTML resources. I've [reported it](https://git.deuxfleurs.fr/Deuxfleurs/dxfl/issues/36) and the feature should be added soon![^2]

In terms of publishing workflow, the website isn't automatically built and deployed from a new git commit anymore. I'll automate it by deploying to Deuxfleurs using a GitHub Action (or similar).

One positive side-effect of migrating is that Cloudflare isn't [injecting unwanted tracking scripts](https://community.cloudflare.com/t/cant-disable-web-analytics-for-coudflare-pages-site/761716) into webpages anymore.

I'm very happy!

[^1]: When solving problems, we're biased towards adding rather than substracting _([Nature 592, 258–261, 2021](https://www.nature.com/articles/s41586-021-03380-y))_
[^2]: Perks of using a small, convivial non-profit as a host
