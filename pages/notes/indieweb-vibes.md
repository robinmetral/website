---
title: "Indieweb vibes"
categories:
  - name: dev
publishDate: "2021-10-13"
template: "/templates/page.html"
buildScript: "/scripts/processNote.js"
---

> Update, March 2022: I've discontinued my whostyles and expect this note to contain broken links or features. I'll leave it online for archive purposes.

The [Indieweb](https://indieweb.org/) feels distinctly different from the rest of the internet. Fewer hero sections, blue CTA buttons, popular Google Fonts, newsletter subscription popups.

Technically, it's all about owning your content and data, and using open web standards as a platform for living and interacting online, rather than the gated platforms of F—, T—, etc.

In reality, it's a collection of loosely connected web spaces, each more delightfully unique than the last. Visiting one feels like stepping in someone's living room[^1].

Beyond the customized tech stacks and signature features (webmentions! webrings!), it seems that the biggest contributing factor to these Indieweb vibes is highly personalized stylesheet. Authors dedicate a lot of time and effort to crafting their own styles, which then becomes indissociable from the text they're enhancing.

To illustrate: when we think of a book in 2021, we're actually thinking of a _text_, that we can consume in hardcover paperback kindle audible[^2]. In contrast, a book before the invention of the printing press was a rare, unique artifact where formatting (think fancy drop caps, miniatures and other [illuminations](https://en.wikipedia.org/wiki/Illuminated_manuscript)) was an integral part of the object. Remove the formatting, and the essence of the manuscript is lost.[^3]

This relationship between words and styles is why I was so excited to learn about _whostyles_[^4].

Whostyles are an answer to the question: how might we retain styles when we take words out of the context they were published it?

For example, to bring up another manuscript metaphor, imagine that I want to quote [Maya](https://maya.land) on her philosophy for styling maya.land ([link](https://maya.land/technicalities/)).

I could do it like this:

> In the same way that one might ask “how would the Book of Kells have looked if Columban monks had had access to neon pigments”, I like to use contemporary CSS options as my means toward ends that are a little anachronistic.

That works, sure, but let's try it again, this time with Maya's whostyle:

<iframe
  width="100%"
  srcdoc="
  <html>
    <head>
      <link rel='stylesheet' href='https://maya.land/assets/whostyle.css' />
    </head>
    <body class='whostyle'>
      <p>In the same way that one might ask “how would the Book of Kells have looked if Columban monks had had access to neon pigments”, I like to use contemporary CSS options as my means toward ends that are a little anachronistic.</p>
    </body>
  </html>
  "
  onload="this.style.height=(Math.max(this.contentWindow.document.body.scrollHeight, this.contentWindow.document.documentElement.scrollHeight,this.contentWindow.document.body.offsetHeight, this.contentWindow.document.documentElement.offsetHeight,this.contentWindow.document.body.clientHeight, this.contentWindow.document.documentElement.clientHeight))+'px';"
></iframe>

Can you feel the difference?

I guess that all of this ties back to the beginning of this note, and what to me is the best thing about the Indieweb: all the unique, creative, carefully crafted personal spaces.

The rest of the internet? [Kicks Condor](https://www.kickscondor.com/) says it best ([link](https://www.kickscondor.com/things-we-left-in-the-old-web/)): it's gray and white, with a bit of blue.

<iframe
  width="100%"
  srcdoc="
  <html>
    <head>
      <link rel='stylesheet' href='https://www.kickscondor.com/css/whostyle.css' />
    </head>
    <body class='whostyle'>
      <h1>High Def With No Color</h1>
      <p>It seems that everything is white and blue in the present day. We’ve settled on these neutral colors, in case we need to sell it all. The old garish animated construction cones and embedded MIDI files are relegated to Neocities now—and who even cares what that is?</p>
      <p>When we post, we post a few words. A picture and a few words. Some gray words on white. With a little blue.</p>
    </body>
  </html>
  "
  onload="this.style.height=(Math.max(this.contentWindow.document.body.scrollHeight, this.contentWindow.document.documentElement.scrollHeight,this.contentWindow.document.body.offsetHeight, this.contentWindow.document.documentElement.offsetHeight,this.contentWindow.document.body.clientHeight, this.contentWindow.document.documentElement.clientHeight))+'px';"
></iframe>

_Note: I intentionally didn't do into the details of how whostyles work and how you can use them on your website, because I've had enough of iframes for the day. If this is something you're interested in, check back in for another note in a couple of days, or simply [read the source](https://github.com/robinmetral/website)._

[^1]: In this metaphor, I guess that a T— profile would be like a cubicle at a 90s tech company office. It's still "personal" in a way—it's tied to your name—but it feels devoid of personal*ity*.
[^2]: An exception to this could be magazines where articles are designed with care to augment texts. Still, I think we're losing something when writer and designer/illustrator are not the same person: visuals are added as an afterthought rather than being part of the creation process.
[^3]: This metaphor comes from an aside that struck me in a recent piece by L. M. Sacasas, [A World Ordered Only By Search](https://theconvivialsociety.substack.com/p/a-world-ordered-only-by-search). Although it's an entirely different topic, I can strongly recommend it.
[^4]: Via Robin Sloan's note, [Whomst Styles?](https://www.robinsloan.com/notes/whomst-styles/)
