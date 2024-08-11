---
title: "TIL: use the Firefox address bar as a calculator"
categories:
  - name: other
published_date: "2022-09-22"
template: page
---

_Since I'm still not sure what exactly I want this to be (this = this website) I figured I'd just try a <abbr title="Today I Learned">TIL</abbr> post._

---

There are times when you want to calculate something quickly and don't want to use your brain. (20 / 16, anyone?)

You're on your laptop, so different solutions open up:

1. use the OS's calculator (does anyone do that?)
2. take out a physical calculator out of the top right drawer of your desk if you're the kind of person to keep a physical calculator in the top right drawer of your desk
3. ask Google

I usually go for solution 3, BUT:

Chrome has this cool thing where typing "20 / 16" in the address bar gives you the answer immediately. Unfortunately Firefox doesn't (still it's in many other ways a superior browser, in my opinion that you haven't asked for), so I have to actually _search_ for the result of 20 / 16. That's slower, plus I don't actually want to know what 20/16 vision means.

(This is where we get to the TIL section.)

Turns out that the feature also exists in Firefox! It's just disabled by default.

To enable it, go to [about:config](https://support.mozilla.org/en-US/kb/about-config-editor-firefox), accept the risk, search for "calculator" and toggle `browser.​urlbar.​suggest.​calculator` <!-- This `code` element contains zero-width spaces after each dot to make sure the words wrap on small screens --> to `true`.

Done! Now you can simply type "20 / 16" in the Firefox address bar and you'll have your answer.

1.25
