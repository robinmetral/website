---
title: "TIL: [hidden] is overridden by CSS display"
categories:
  - name: dev
publishDate: "2022-10-30"
template: "/templates/page.html"
buildScript: "/scripts/processNote.js"
highlightCode: true
---

From Monica Dinculescu's [fyi: [hidden] is a lie](https://meowni.ca/hidden.is.a.lie.html):

```html
<style>
  div {
    display: block;
  }
</style>
<div hidden>
  lol guess who's not hidden anymore
  hint: it's this thing
</div>
```

Surprise today when trying to hide an element and the [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) attribute didn't work. Turns out it's a specificity issue: any CSS `display` value will override it. So e.g. a list item styled as a card (probably `display: block;`) can't be `hidden` using HTML only.
