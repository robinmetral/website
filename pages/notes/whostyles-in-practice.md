---
title: "Whostyles in practice"
publishDate: "2021-10-16"
template: "/templates/page.html"
---

> This is a technical note that follows up on the last one, [Indieweb vibes](./indieweb-vibes). Read on if you'd like to use whostyles on your website.

> **Trigger warning**: iframes

---

Technically, your whostyle is just a stylesheet that you intentionally share on your website, so that others can include your styles when they quote you.

Let's break it down:

1. A stylesheet
2. Shared on your website
3. Used by others for quoting you

1 and 2 are to create your own whostyle. The end result:

[https://robinmetral.com/whostyle.css](https://robinmetral.com/whostyle.css)

3 is to quote others with their whostyles. The end result (for a [quote by Kicks Condor](https://www.kickscondor.com/hypertexting/)):

<iframe
  width="100%"
  srcdoc="
  <html style='background-color:var(--bg);'>
    <head>
      <link rel='stylesheet' href='https://robinmetral.com/palette.css' />
      <link rel='stylesheet' href='https://www.kickscondor.com/css/whostyle.css' />
    </head>
    <body class='whostyle'>
      <h1>Hypertexting</h1>
      <p>‘Constructing a body of hypertext over time—such as with blogs or wikis—with an emphasis on the strengths of linking (within and without the text) and rich formatting.’</p>
    </body>
  </html>
  "
  onload="this.style.height=(Math.max(this.contentWindow.document.body.scrollHeight, this.contentWindow.document.documentElement.scrollHeight,this.contentWindow.document.body.offsetHeight, this.contentWindow.document.documentElement.offsetHeight,this.contentWindow.document.body.clientHeight, this.contentWindow.document.documentElement.clientHeight))+'px';"
></iframe>

## 1. A stylesheet

I won't go into too many details here, you know what a stylesheet is.

One gotcha: [the closest thing there is to a whostyles standard](https://www.kickscondor.com/whostyles/) specifies that your styles should target a `.whostyle`[^1] class, and whoever quoting you will add that class to the wrapping element (more about this under point 3):

> All styles within the file must be attached to the `.whostyle` selector, unless it's an `@-rule` (such as `@font-face`.)

I have my doubts about custom fonts or other non-CSS assets in whostyles.

- It's a compliance gray area: am I allowed to let you use my font on your website when you quote me, if you don't have a license for the said font?
- What about the privacy implications? If the CSS downloads external assets (like images from other websites, or fonts from a popular webfont host that also happens to be the biggest advertising company in the world), could these third-party sites track you on my website?
- And most importantly: is it fair to make visitors download kilobytes of extra assets?

With this in mind, I've decided not to include this very font ([Fern](https://djr.com/notes/junes-font-of-the-month-fern-text)) in [my own whostyle](https://robinmetral.com/whostyle.css), and instead substitute it with a widely available system font.[^2]

## 2. Shared on your website

Now that you have a `whostyle.css`, host it on your domain somewhere! Additionally you can point others to it using a `link` tag in your document's `head`: `<link rel="whostyle" href="/css/whostyle.css">`.

One additional thing I had to do here is ensure that the whostyle accepted CORS requests. Since the point is that others can include your stylesheet on their website (more on this below), the URL for your whostyle should allow cross-origin requests.

How to do this entirely depends on your website's infrastructure. Since my site is statically published to [Cloudflare Pages](https://pages.cloudflare.com/), I used a [Cloudflare Worker](https://workers.cloudflare.com/) (a cloud function) to rewrite the response headers when another site requests this page:[^3]

```js
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const response = await fetch(request);

  // Clone the response so that it's no longer immutable
  const newResponse = new Response(response.body, response);

  // Set CORS header
  newResponse.headers.set(
    "Access-Control-Allow-Origin",
    new URL(request.url).origin
  );

  // Append to/Add Vary header so browser will cache response correctly
  newResponse.headers.append("Vary", "Origin");

  return newResponse;
}
```

## 3. Used by others for quoting you

Now for the final part, let's switch hats and pretend that you want to quote someone else using their whostyle, that they have dutifully created and hosted on their website.

I've seen two ways of doing this (there may be more).

1. Copy the CSS over to your site
2. Import the stylesheet in an iframe

There are benefits and drawbacks to both approaches.

The first is the easiest, cleanest (because no iframes), most performant (because no iframes). But it will pin the styles to the point in time you copied them—if the author redesigns their site, the changes won't be reflected on yours.[^4]

The second will stay up-to-date since it downloads the whostyle directly from the author's website at runtime. But it is a pain to work with (because iframes), feels hacky (because iframes), and could be a security risk (because you load external content).

I could only find a single example of the second solution, on the [whostyles (draft) standard](https://www.kickscondor.com/whostyles/). Everyone else ([Robin Sloan](https://www.robinsloan.com/notes/whomst-styles/), [Jacob Hall](https://jacobhall.net/2021/08/horton-hears-a-whostyle/), and even [Kicks](https://www.kickscondor.com/one-year-of-maya.land/)) are copying styles over.

I still went for iframes. I don't necessarily recommend it, but I liked the idea of spaces where I quote others being small windows onto their websites, rather than mere copies.

Here's a basic example for quoting Kicks:

```html
<iframe
  srcdoc="
  <html>
    <head>
      <link rel='stylesheet' href='https://www.kickscondor.com/css/whostyle.css' />
    </head>
    <body class='whostyle'>
      <!-- The quote (in HTML) goes here -->
    </body>
  </html>
  "
></iframe>
```

I also made a few improvements to make them look better:

- iframes are notoriously difficult to size properly (i.e. avoid the scrollbar) because we don't know what the height of their content will be. A common solution is to resize it on load with JavaScript, but even this will not be 100% reliable across browsers. The most robust solution I've found is this one:
  ```js
  onload =
    "this.style.height=(Math.max(this.contentWindow.document.body.scrollHeight, this.contentWindow.document.documentElement.scrollHeight,this.contentWindow.document.body.offsetHeight, this.contentWindow.document.documentElement.offsetHeight,this.contentWindow.document.body.clientHeight, this.contentWindow.document.documentElement.clientHeight))+'px';";
  ```
- Related to the above: if, like me, your website has a custom background-color, you'll have to add additional styles into the iframe to avoid a white border around your quotes.[^5]

If I end up using whostyles again in the future, I would probably dig deeper into:

- Security: I trust the domains I'm importing stylesheet from, but are there ways to make things more robust, just in case?
- Making a remark plugin: I write my notes in markdown and it would be great if I didn't have to copy a big chunk of HTML over each time. This can probably be done programmatically at build time, plugging into the amazing [unified](https://unifiedjs.com/) ecosystem.

And that's that. If you're still here, I want to personally apologize about the roughness of this note and about all that iframe nonsense (but I did warn you). Thanks for reading!

[^1]: Sorry about the absence of code block styling throughout this note, it's the first time I'm writing code in here and I haven't come around to making it pretty yet.
[^2]: However, some of the whostyles I've used to quote others _are_ downloading fonts from G—, as well as external images.
[^3]: Related: [Robin Sloan on cloud functions](https://society.robinsloan.com/archive/cloud-study/).
[^4]: I've come to think that this is not necessarily a bad thing, instead, it might better reflect the author's thoughts at time of writing.
[^5]: I had to go even further and download an external stylesheet pointing to my own website, because my background color changes depending on your dark mode OS settings and I couldn't find a way to make `<style>` tags inside iframes (this might be related to the way I parse markdown)
