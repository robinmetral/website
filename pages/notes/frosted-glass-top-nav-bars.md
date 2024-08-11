---
title: '"Frosted glass" top nav bars'
categories:
  - name: dev
published_date: "2022-12-12"
template: page
buildScript: "/scripts/processNote.js"
---

Is it just me or does every top nav bar look like this now?

<div style="height:300px;overflow-y:scroll;border:var(--border-width) solid currentColor;">
  <div style="position:sticky;top:0;">
    <div style="backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:var(--space-s);text-align:center;">Top nav goes here</div>
    <div style="height:1px;background:currentColor;opacity:0.2;"><!-- dirty hack to add opacity to a border with currentColor --></div>
  </div>
  <div style="padding:var(--space-s);">
    <p style="margin-bottom:var(--space-s);">(Scroll down!)</p>
    <p style="margin-bottom:var(--space-s);">Eligendi nisi sint soluta maxime. Dolor saepe eum minima ea. Officiis iusto vel laudantium. Quo nisi ipsum voluptatem voluptatem aperiam ea culpa. Unde odit ipsam maiores ea facilis aspernatur sapiente.</p>
    <p style="margin-bottom:var(--space-s);">Quo corporis et rerum ipsa deserunt fugit et beatae. Quae voluptatum voluptatem aperiam enim fugiat rerum dolorum sed. Eligendi dignissimos tempore magni quam ea. Porro velit quis praesentium.</p>
    <p style="margin-bottom:var(--space-s);">Non architecto facere amet ut quia necessitatibus nemo veniam. Similique quas voluptatem in exercitationem. Maiores qui nostrum optio ullam vitae.</p>
    <p style="margin-bottom:var(--space-s);">Est ex sit sint repellat nisi maxime eaque. Maxime eaque est veniam est perspiciatis. Labore est quo quam consequatur. Voluptate et sunt optio quidem quisquam non non laboriosam. Distinctio cupiditate recusandae voluptate.</p>
    <p style="margin-bottom:var(--space-s);">Velit laborum saepe quibusdam voluptatem. In ea dolorum sit laboriosam quia aliquam. Consequatur quidem alias facilis eaque quos a alias. Ut sed enim eum iusto at.</p>
  </div>
</div>

Case in point (from a couple minutes of browsing):

<img width="1280" height="1075" style="aspect-ratio:1280/1075;height:auto;" src="/static/images/2022-12-12-frosted-glass-navs.webp"  alt="Screenshots from tailwindcss.com, reflect.app, twitter.com, apple.com and brianlovin.com showing their 'frosted glass' top nav bars">

If you want the same for your top nav bar (I'm not judging[^1]), check the docs for [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter).

Update: ah, the general trend is called _glassmorphism_[^2]. There have been [articles about it](https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9). Someone even made a [CSS generator for glassmorphism](https://ui.glass/generator/) that [launched on ProductHunt](https://www.producthunt.com/products/glassmorphism) last year. Looks like I'm a bit late to the party

[^1]: maybe a little bit.
[^2]: after other –morphisms: skeuo–, neu–, etc.
