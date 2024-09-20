---
title: "Static site generator"
categories:
  - name: dev
published_date: "2024-05-27"
template: page
---

Goals:

- simplify publishing workflow. The core of the static site is its content, not the site itself
- near-zero maintenance cost. I don't want to spend time reading release notes or doing migrations
- written in JS: a language that's familiar to people making websites. You already have node.js and npm set up, no need to get Rust here. The point is to make a small website, it'll build fast without taking on that complexity, and you can look under the hood!
- low maintenance cost of the tool itself: no need to depend on the generator, just fork and maintain your own

Strategies:

- the web platform got much better. We can ship reasonably modern CSS and JavaScript to users and it'll 'll run in most browsers without any need for transpiling/prefixing/etcing.
- keep it simple. Maybe we don't need to minify scripts, maybe we just keep scripts small instead. And that's one less dependency. I like the idea that the user is getting the code I'm writing, without middlemen. A benefit: we can edit in the browser!

Non-goals:

- support complex websites. This is for building small websites with a few templates and static pages. Anything is possible, but the developer will have to accept the burden of adding complexity (that's a feature, not a bug). The generator will not provide helpers or (shivers) a GraphQL layer to "improve" DX

## Features

Only what's absolutely necessary.

Start from the end result, raw HTML and CSS and JS. Everything could be written by hand, but some aspects of this are tedious. Features are designed to make the website easier to work with and maintain over time.

- Node.js and Rust!
  - For JS developers who don't want Rust or who want to fork the Node.js version
  - For science
    - Rust perf pitfalls (2017, still relevant?): https://llogiq.github.io/2017/06/01/perf-pitfalls.html
- templating: I don't want to have to repeat the nav on every page. It's messy, and bug-prone when changing anything
  - nested templating (see what I did there?): again to avoid duplication, it would be possible to nest templates in order to have e.g. a shell template with the head, nav, etc, and a post template with styles for articles, for example
  - engines (JS):
    - https://github.com/eta-dev/eta
    - https://github.com/mde/ejs
    - https://github.com/mozilla/nunjucks. Too big?
    - https://github.com/janl/mustache.js
    - https://github.com/handlebars-lang/handlebars.js. "Largely compatible with mustache"
    - https://github.com/pugjs/pug. I don't like how it moves away from HTML
    - https://github.com/harttle/liquidjs. Port of the [Ruby original](https://github.com/Shopify/liquid) (by Shopify)
    - ES6 template literals
      - this is what hydrogen uses: https://github.com/hydrogenjs/hydrogen
      - too JS-centric? Would love it if the src folder could be built into a website using either a Node.js or a Rust engine. So would prefer HTML and Markdown files with frontmatter (yaml) over .js
  - engines (RS):
    - Crates by popularity: https://crates.io/search?q=template&sort=downloads
    - https://github.com/rust-sailfish/sailfish. Inspired by EJS (compat?)
    - https://github.com/nickel-org/rust-mustache. Port of handlebars
    - https://github.com/cobalt-org/liquid-rust. Port of Liquid
    - https://github.com/Keats/tera. Inspired by jinja2 (like Nunjucks. compat?)
  - logic or logic-less?
    - lots and lots of opinions
    - https://www.boronine.com/2012/09/07/Cult-Of-Logic-less-Templates/
    - I feel that mustache in our case might work only because it's meant to use on small sites (otherwise I can see how context might blow up, if using a single one of them). Another benefit is the portability, though for small sites, a handful of tamplates could easily be ported.
    - Still on the fence here
- markdown pipeline: writing HTML is tedious and hard to read. Markdown is almost an interoperable standard by now (you can write once in markdown on your website and then send as a newsletter on Buttondown, as a GitHub issue, as ...)
  - QUESTION: for frontmatter, yaml (older, more common) or toml (new kid on the block, simpler)? TODO: benchmark!
    - https://github.com/yaml/yaml-spec. YAML is complex! https://ruudvanasseldonk.com/2023/01/11/the-yaml-document-from-hell
      - Node.js parser: https://github.com/eemeli/yaml
      - Rust parser: https://github.com/chyh1990/yaml-rust (and others?)
    - https://github.com/toml-lang/toml:
      - Node.js parser: there are several: https://github.com/BinaryMuse/toml-node (oldest, but [seems unmaintained](https://github.com/BinaryMuse/toml-node/issues/50), https://github.com/iarna/iarna-toml (SvelteKit switched to this from toml-node), https://github.com/squirrelchat/smol-toml (new)
      - Ruse parser: https://github.com/toml-rs/toml
  - QUESTION: custom markdown plugins? Or should this be the resp of users, aka should they fork and add the plugins they want?
    - Personally I want footnotes, tables, TODO: which others?. But not everyone might
  - QUESTION: should it be possible to write pages in HTML at all or should there always be a template with the markup and a markdown file with the content?
    - In most cases I think the markup vs content thing works well
    - What about pages with a more complex structure e.g. a page with three columns?
      - Column text in frontmatter and md content holding the intro? (bit weird since frontmatter is usuall metadata, not meant for longer content)
      - Column text hardcoded in template with md only holding the intro? (weird to split content between md and template files)
    - What about pages that are custom build from another data source, e.g. from JSON (think my old Watching page)?
    - ANSWER: HTML should probably still be allowed. And we still don't want to repeat templates, so it should be injected into the templating engine as well. So we have (Markdown ->) HTML with template vars -> HTML
      - Does this mean that frontmatter is necessary for HTML pages? Otherwise, how can we e.g. get the page <\title> to work?
  - make sure the markdown gets rendered when opening the VSCode preview! (beware images) Good writing and reading exp
  - Node.js
    - https://github.com/markdown-it/markdown-it. (TODO: CommonMark compat. Big.)
      - simple project using markdown-it: https://github.com/joakin/markdown-folder-to-html. It also renames links from .md to .html so refs work locally
      - plugins
        - https://github.com/valeriangalliat/markdown-it-anchor: add permalinks to headings
    - https://github.com/markedjs/marked. (TODO: Not 100% compat with CommonMark. Unsafe (np for me). Small and fast)
    - https://github.com/jonschlinkert/remarkable. (Faster than marked according to README)
    - https://github.com/rsms/markdown-wasm (based on md4c in C, warning has some extra features)
    - https://github.com/micromark/micromark (Unified)
    - https://github.com/remarkjs/remark (Unified, built on top of micromark, adding an AST)
  - Rust
    - Warning: compile time vs runtime. Sailfish is compile time, which makes it fast. In my case I think compile time is what I want (only need rust installed)
    - Comparison: https://github.com/rosetta-rs/md-rosetta-rs
    - https://github.com/pulldown-cmark/pulldown-cmark. Used by core Rust repos e.g. https://github.com/rust-lang/mdBook/
    - https://github.com/wooorm/markdown-rs. Port of micromark. Paid by Vercel ofc.
    - ...
  - Shell
    - https://github.com/jgm/pandoc
      - This is a cool script to generate a website from Markdown using pandoc: https://wstyler.ucsd.edu/files/lmimg/spcv.txt (blog post: https://wstyler.ucsd.edu/posts/pandoc_website.html)
- ~CSS compiling or script minification or other optional build step~: I don't think this is needed! (you're free to add your own extra build step)
- static dir
  - gets copied over. Good for caching assets as immutable!
  - but is it a better DX to colocate assets with posts? In this case a post would be an index.md in a dir with assets colocated. Support both!
    - How does caching assets work with colocation? \*.jpg?
- RSS and Sitemap generation
  - RSS should definitely be there. It's a core feature and not trivial to implement
  - Sitemap: do research on whether it's actually useful for anyone other than search engines
- pagination for collections?
  - see what Zola does: https://www.getzola.org/documentation/templates/pagination/
- building search index?
  - cool but not v1
  - Zola: https://www.getzola.org/documentation/content/search/
- 404 page
  - Challenge: depends on the server
- ~TOC gen like Zola does~: not right now, as not all posts would want a TOC (it's typically for long posts), and it can probably easily be automated with MD extensions (e.g. All In One)
- simple live reload (page by page)?
  - Node.js: https://github.com/paulmillr/chokidar
  - Or should this be maintained by the site maintainer? (this is what hydrogen does)

To remove from brut:

- pretty URLs (a mistake)
- TS in the generator (a mistake, TS is for complex code)
- ...
