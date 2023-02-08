---
title: "Deploying a static site to Cloudflare Pages"
categories:
  - name: dev
publishDate: "2022-04-03"
template: "/templates/page.html"
buildScript: "/scripts/processNote.js"
---

I don't often praise cloud service providers, but I've been really enjoying Cloudflare lately.

This website is deployed to Cloudflare Pages, and makes use of several other Cloudflare products, on the free plan.

I thought I'd write a short overview of how (and why) developers can start using the Cloudflare platform to host their static websites and/or serverless functions.

## What's Cloudflare?

Cloudflare started off as a <abbr title="Content Delivery Network">CDN</abbr> and <abbr title="Distributed Denial-of-Service">DDoS</abbr> mitigation services company, and these are still its core products. They're used mostly by large companies to optimize web performance and shield themselves against attacks. In recent years, it started to move downmarket and released several products for developers, such as [Cloudflare Pages](https://pages.cloudflare.com/).

## What's Cloudflare Pages?

Cloudflare Pages is essentially a <abbr title="Continuous Integration">CI</abbr>/<abbr title="Continuous Deployment">CD</abbr> workflow for building and deploying a static site on Cloudflare's CDN. It's comparable to [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).

It also comes with nice extras, like deploy previews on pull requests, and easy integration with other Cloudflare services (primarily Workers—more on this below). At it simplest, this is what it does:

1. Picks up a new commit in a git repository
2. Builds the site
3. Deploys the static assets to Cloudflare's CDN

## How to deploy a static site to Cloudflare Pages

It's very straightforward—you won't even need screenshots.

1. Connect to your GitHub/Gitlab account, choose a repository
2. Choose a name for the site (it will be deployed to `example.pages.dev`)
3. Add build settings, typically a build command and the path to the build output directory (there are also presets for popular static site generators). That's also where you can add environment variables if you have build-time secrets
4. Click "Deploy", you're done!

You'll also find these instructions with more details (and possibly more up-to-date) in the Cloudflare Pages [Getting Started guide](https://developers.cloudflare.com/pages/get-started/).

**One caveat**: if your build command depends on modern Node.js features, you might have to override the default Node.js version in Cloudflare Pages (12.18 at time of writing). You can set the `NODE_VERSION` environment variable or, even better, add a `.nvmrc` file at the root of your repository—here's [the .nvmrc for this website](https://github.com/robinmetral/website/blob/c5cfcd7b2e764361c49ba8a4081828d833f62735/.nvmrc). More information in the official [language support docs](https://developers.cloudflare.com/pages/platform/build-configuration/#language-support-and-tools).

As soon as your site is set up, Cloudflare will automatically deploy all new commits to your main branch.

## Setting up a custom domain for your site

Adding a custom domain to your Cloudflare Pages site will have two benefits: the first is obviously nice URLs, but you'll also get Cloudflare's DDoS protection service for free!

First, add a domain to your Cloudflare account by following the [Cloudflare setup support guide](https://support.cloudflare.com/hc/en-us/articles/201720164#2YulMb5YJTVnMxgAgNWdS2).

In a nutshell (assuming that you already own a domain name):

1. Click "Add Site" on your Cloudflare dashboard
2. enter your domain hostname (`example.com`)
3. choose Cloudflare's free plan (you can always change this later)
4. verify the DNS records that Cloudflare imported from your current DNS provider (probably your registrar, if you've never changed this before)
5. finally, go to your registrar and [change your nameservers to Cloudflare's](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/). (**Warning**: this could break things if you were using your domain for a website or for your email. Save a copy of your current DNS records and nameservers so you can revert the changes if things go wrong.)

After that, navigate to your Cloudflare Pages site view, click "Custom Domains" and follow the instruction to link your site to your custom domain.

## Redirecting `www.` to your root domain

It's common practice to redirect `www.example.com` to `example.com`, and this can be done using Cloudflare's DNS and page rules.

Start in your domain's DNS settings. After having linked your Cloudflare Pages site, you should see a `CNAME` record pointing to your Cloudflare Pages URL:

```
CNAME @ example.pages.dev.
```

_Note: `@` refers to your root domain, or domain apex: `example.com`._

You'll want to add a new DNS record for the `www` subdomain. There are different ways to achieve this, but the Cloudflare Pages docs recommend an `AAAA` record (an IPv6 Address record) pointing to `100::`, like this:

```
AAAA www 100::
```

For more details, refer to the Cloudflare Pages docs on [redirecting www to apex](https://developers.cloudflare.com/pages/how-to/www-redirect/).

## Do more with the Cloudflare platform

A final benefit of deploying your site to Cloudflare Pages is the potential integration with the rest of the Cloudflare platform:
[image optimization](https://www.cloudflare.com/products/cloudflare-images/) (think [Cloudinary](https://cloudinary.com/)), [live and on-demand streaming](https://www.cloudflare.com/products/cloudflare-stream/), a bunch of other security, performance, and network services, and of course [Cloudflare Workers](https://workers.cloudflare.com/).

Of the lot, I've only used Cloudflare Workers: Cloudflare's Functions-as-a-Service (FaaS) product[^1].

I've found them useful for several things:

- proxy API requests to avoid exposing an API key
- rewrite request headers, for example to optimize resource caching[^2]
- process and save form submissions (replaces a light backend service)

In simple cases, I've written Workers directly in the Cloudflare Workers web interface, and in more complicated ones (involving routing) I've been using the [Cloudflare Workers CLI tool, `wrangler`](https://github.com/cloudflare/wrangler) to develop them locally.

Cloudflare Pages also recently added a way to write Workers directly in a website's repository: a function in the `/functions` directory is deployed independently as a Cloudflare Worker[^3].

I personally prefer to keep them separate, because I don't feel the need to bundle them at this point.

I'm also mindful of vendor lock-in: right now, my website could be deployed to any web server or CDN, and my Workers could easily be ported to other <abbr title="Functions-as-a-Service">FaaS</abbr> providers—I just happen to have chosen Cloudflare for the time being.

## Wrapping up

This ended up being longer than intended!

Overall, I recommend Cloudflare for developers looking for an approachable, yet highly configurable platform to host static websites and serverless functions. (And also a very fast CDN![^4])

Using Cloudflare can be a bit daunting at first (especially when it comes to the myriad of DNS and performance products, which were clearly designed for enterprise[^5]), but developer products like Cloudflare Pages are much simpler to use.

In comparison with alternatives that I've used (Vercel and Netlify), the Cloudflare platform seems to be generally more customizable, feature-rich and performant. This is certainly because it started off as a CDN/security services company, as opposed to a CI/CD product. I also like how it feels like a true platform, an ecosystem of interrelated, opt-in products; while Vercel/Netlify tend to impose a more homogeneous product story onto users.

So if this seemed like it could be helpful to you, give it a try!

[^1]: FaaS products are confusingly called differently by virtually every cloud service provider: they're [Lambdas](https://aws.amazon.com/lambda/) on AWS, [cloud functions](https://cloud.google.com/functions/) on GCP, [edge functions](https://vercel.com/features/edge-functions) on Vercel, etc.
[^2]: I'm now doing this using a [Cloudflare Pages `_headers` file](https://developers.cloudflare.com/pages/platform/headers/). Here are the [`_headers` for this website](https://github.com/robinmetral/website/blob/c5cfcd7b2e764361c49ba8a4081828d833f62735/public/_headers).
[^3]: Just like [Next.js API routes](https://nextjs.org/learn/basics/api-routes) are deployed as edge functions on Vercel.
[^4]: I haven't really touched on this, but one of the main reasons I switched to Cloudflare was that I wanted a faster CDN (I was using Vercel before).
[^5]: You can rest assured that it comes nowhere near AWS, though!
