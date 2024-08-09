---
title: "Building a zero-JS visibility toggle"
categories:
  - name: dev
publishDate: "2022-12-15"
template: page
buildScript: "/scripts/processNote.js"
highlightCode: true
---

[CSS selectors](https://www.w3.org/TR/selectors-4/) are awesome.

If you already use newish selectors on a daily basis, then what follows will probably seem very mundane by now (5 years after the release of [Selectors Level 3](https://www.w3.org/TR/selectors-3/)). I don't use complex selectors much[^1], so I'm still occasionally blown away by how incredible they've become. Today was such an occasion.

So I have this [grid of films I'm watching](/watching/):[^2]

<img width="1280" height="794" style="aspect-ratio:1280/794;height:auto;" src="/static/images/2022-04-08-image-grid-final.jpg" alt="A grid of posters of films I've watched recently">

Film names aren't displayed as plain text on the page, to avoid breaking the grid's alignment). But when a film has a crypic poster, or for searching through the list using <kbd>CMD</kbd> + <kbd>F<kbd>, a toggle to show/hide film names would be helpful.

Using something like React, this would be as simple as saving the toggle's value in [state](https://beta.reactjs.org/learn/state-a-components-memory) and conditionally rendering film names:

```jsx
function FilmsGrid(films) {
  const [showNames, setShowNames] = useState(false);
  return (
    <>
      <label htmlFor="toggle">Show film names</label>
      <input
        id="toggle"
        type="checkbox"
        checked={showNames}
        onChange={() => setShowNames(!showNames)}
      />
      <ul>
        {films.map((film) => (
          <li key={film.name}>
            <img src={film.posterUrl} alt={film.name} />
            {showNames && film.name}
          </li>
        ))}
      </ul>
    </>
  );
}
```

Done.

But [you might know](/notes/spring-summer-22-a-new-look-for-this-website/) that this website doesn't use any kind of JavaScript framework. The few lines of JS on here are painstakingly written in old-fashioned `<script>` tags, mutating the DOM directly with things like `document.getElementById("thing-to-update").innerText = "New content!"`. Turns out that this is a good incentive to reach for web technologies in the intended order: HTML first, CSS next, and JS last.[^3]

And for this toggle, only HTML and CSS are really necessary. I ended up building it with a handful of semantic HTML elements...

```html
<input id="toggle" type="checkbox" />
<label htmlFor="toggle">Show film names</label>
<ul>
  <!-- the data is populated at build time -->
  <li>
    <img src="poster.jpg" alt="Film name" />
    <span class="film-name">Film name</span>
  </li>
</ul>
```

...and the CSS selector magic that I was mentioning at the top of this note:

```css
/* if the checkbox is not checked, we hide film names */
#toggle:not(:checked) ~ ul li .film-name {
  display: none;
}
```

[Here it is](/watching/)! A simple, React-less, JS-less visibility toggle.

CSS selectors are awesome!

[^1]: We mostly use CSS-in-JS in my org, and CSS-in-JS isn't exactly known to embrace the cascade.
[^2]: Screenshot from a [previous post about building the grid](/notes/a-zero-js-lazy-loading-image-grid-for-2022/).
[^3]: Needless to say that using [insert JS framework] should not be a default for small, largely static websites like this one.
