---
title: "WordPress: A New Hope"
publishDate: "2021-10-25"
template: "/templates/page.html"
buildScript: "/scripts/formatPostDate.js"
---

My frustration with WordPress is a big part of what led me into frontend engineering.

Five years ago, all of my websites were using WordPress. Of course. What else? Wix, Squarespace? Expensive for pet projects and not customizable enough to someone who likes to tinker with web things.

But that doesn't mean I was actually _happy_ with WordPress. Looking back, I think there were two main reasons for this:

1. Installing and maintaining the hosted [.org version](https://wordpress.org/support/article/wordpress-vs-wordpress-com/) was a pain—is my install secure enough? How do I ssh into the server again? Or log into phpmyadmin?
2. Customization was possible, but not easy. I don't know how to make WordPress themes so I had bought an [Enfold](https://themeforest.net/item/enfold-responsive-multipurpose-theme/4519990) licence. Enfold's theme editor was helpful but bloated and limited, I had to write custom CSS in obscure textareas, reach for third-party plugins for things like forms (which further increased the complexity of consistent styling), and regularly contact Enfold's support for help to work around basic theme constraints.

And that's when I first heard the word "Jamstack".[^1]

I won't go into too many details now, but in a nutshell, the idea is that instead of storing your content in a database and have a server generate pages on demand (or <abbr title="Server-Side Rendering">SSR</abbr>—this is WordPress's architecture), you would generate static websites during a build step using an <abbr title="Static Site Generator">SSG</abbr>, and deploy them to a CDN.

Anyways—I went all-in and I haven't used WordPress since[^2]... until yesterday.

---

After I got into the Jamstack, I built [my aunt's website](https://montpellier.yoga/) using [Gatsby](https://www.gatsbyjs.com/) (pulling from a headless WordPress). But today, I can't keep up with maintenance anymore, so I decided to switch back to a "vanilla" WordPress setup that she can manage without my help.

I was dreading the migration and procrastinated for a few months until I finally came around to do it, and to my surprise... it was great!

I wasn't expecting to say this, but I would probably recommend WordPress (heartily, not for lack of a better alternative) not only to people who don't code, but also to Jamstack developers building websites for others.

I'll try to explain why, and to make this more fun, let's make it a discussion between me (2021 me) and 2016 me.

**2016 me**: Hosting WordPress is complicated and I don't want to ssh into a remote server.

**2021 me**: WordPress is so popular that many [hosting providers](https://wordpress.org/hosting/) will handle this for you. Even if you want to truly self-host (e.g. on your <abbr title="Virtual Private Cloud">VPC</abbr>), you'll rarely have to think about the server at all, since maintaining/upgrading WordPress is incredibly simple. Rule of thumb: don't touch the server and the server will just work.

**2016 me**: Okay, but the mere fact that there is a server makes a WordPress site vulnerable—static sites are much more secure.

**2021 me**: That's true. But still, a best-practice WordPress install is secure _enough_ for most websites. Follow a [good guide](https://wordpress.org/support/article/hardening-wordpress/) when setting up WordPress and remember the "no touching the server" rule, and you should be fine.

**2016 me**: Actually, my real problem with WordPress is that I just don't like the editing experience, it feels... old and cluttered.

**2021 me**: I still think this about 2016 WordPress. But I must say that I was very impressed with [Gutenberg](https://wordpress.org/gutenberg/), the new default WordPress editor. The idea of "blocks" is really cool and powerful—you can think of them like components[^4].

**2016 me**: And don't get me started on theming. Free themes are full of "pay to unlock this feature" buttons, while premium themes that promise limitless customization are bloated and hard to use. And I really don't want to learn PHP to create or edit a theme.

**2021 me**: This might be one of my main remaining pain points with WordPress. What I would recommend is to choose a simple theme, like an official WordPress theme (I used [Twenty Twenty-One](https://wordpress.com/theme/twentytwentyone)) or something from [Anders Noren](https://andersnoren.se/teman/), and avoid customizing it too much. This will make it easier to maintain, and you'll end up with a high-quality website (accessible, user-friendly, performant). Looking to the future, the WordPress team is working on block-based [Full-Site Editing](https://make.wordpress.org/design/handbook/focuses/full-site-editing/), so you should soon be able to customize your theme without relying on a third-party theme editor (look out for WordPress 5.9 coming out in December).

**2016 me**: But what about plugins? WordPress sites will generally always need to rely on third-party code, which will at worst open them up to vulnerabilities, and at best just make them slower.

**2021 me**: Yes, and that's why my recommendation here is the same as with themes: stick to trusted, widely used plugins, and only use as few as necessary. For example, [Contact Form 7](https://wordpress.org/plugins/contact-form-7/) comes to mind to add forms to your website. But also, take a moment to consider the alternative here: to add a contact form to a static site, you'll have to sign up and pay for a form API, and set it up yourself. And if it requires an API key, you might even want to proxy your requests through a server (or a cloud function) to keep them safe. This will make the website much more complicated to maintain over time.

**2016 me**: I can actually keep my secrets safe by using Next.js API routes—

**2021 me**: This is besides the point: you moved away from WordPress because statically generated were simple, secure and fast _by default_, and now you're telling me you want to buy into a complex, hybrid client-server framework that will likely lock you in with one host (Vercel)?

**2016 me**: That's it right here: at the end of the day, I don't want my website to be slow. It's bad for my visitors and for SEO. With <abbr title="Static Site Generator">SSG</abbr>s, I can create blazingly blazing fast websites.

**2021 me**: Yes, a static page will tend to be faster than a server-side-rendered one because it can easily be hosted on a CDN. But generally, what will impact your page performance the most are things like third-party scripts or unoptimized images—you should only have to worry about CDNs _after_ you've cut down on bytes and JS execution time. Also, think practically: how fast does your site really _need_ to be on the other side of the planet? For example, my aunt's website is not meant for people outside of France at all, so hosting it on a server in Paris is totally fine[^3].

**2016 me**: So what, should I just abandon the Jamstack and go back to WordPress now?

---

Of course not.

All I wanted to say is that:

1. WordPress isn't that bad, and it actually got a lot better in recent years.
2. It shouldn't be prematurely dismissed in favor of the Jamstack.

So I guess this is a message to my past self: if you're going to make a website for someone else, do yourself a favor and just use WordPress.

[^1]: The JAM in Jamstack stands for "JavaScript, APIs, Markup"—it used to be stylized "JAMstack" but [apparently](https://en.wikipedia.org/wiki/Jamstack) people dropped the capitalization at some point.
[^2]: Except as a headless CMS, which made it wither (a) complex to style the frontend because of the nondeterministic nature of the content, or (b) a pain to set up and maintain a WordPress install with [Advanced Custom Fields](https://www.advancedcustomfields.com/).
[^3]: Side note: when testing the site's speed with [WebPageTest](https://www.webpagetest.org/), its [web vitals](https://web.dev/vitals/) for a test from Paris were a <abbr title="Largest Contentful Paint">LCP</abbr> of 0.569s, a <abbr title="Cumulative Layout Shift">CLS</abbr> of 0, and a <abbr title="First Input Delay">FID</abbr> of 0.000s. For a test from Hong Kong, the CLS and FID didn't change but the CLS increased to 1.393s. So Hong-Kong was roughly 2x slower, but still incredibly fast. I'm not sure how much the Hong-Kong speed would worsen if the page were heavier.
[^4]: And technically they _are_ components: Gutenberg is [built with React](https://github.com/WordPress/gutenberg).
