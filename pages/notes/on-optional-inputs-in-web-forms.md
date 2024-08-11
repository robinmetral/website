---
title: "On optional inputs in web forms"
description: "Nobody likes to fill forms—don't ask users for unnecessary information."
categories:
  - name: dev
published_date: "2022-09-16"
template: page
---

I was catching up on Kitty Giraudel's latest article, [The required fault in our stars](https://kittygiraudel.com/2022/08/05/the-required-fault-in-our-stars/).

In a nutshell, it explores ways to improve accessibility for the classic web pattern of adding an asterisk (\*) to a required input's label:

<div style="display:flex;flex-direction:column;">
<label for="example-input">Your name *</label>
<input id="example-input" type="text" required>
</div>

I won't go into the suggested solutions themselves—[the article](https://kittygiraudel.com/2022/08/05/the-required-fault-in-our-stars/) covers these.

BUT! To me, this seems like an engineering solution to a design problem: why ask users for information that is, by definition, not necessary?

Some examples:

- Asking for an optional middle name during signup: don't unless necessary (not everyone has these). Anyways, [prefer a single "full name" input](https://www.w3.org/International/questions/qa-personal-names).
- Asking for an optional email address to subscribe to a newsletter: instead, start by asking "do you want to subscribe to our newsletter?" and make the email input required if the user answers "yes".
- Asking for an optional zip code during signup to receive updates about nearby events: don't—let users opt into event notifications separately, after signup.

I can only think of very few case where optional inputs make sense:

- Address line 2: lets users enter an apartment number, c/o or the like.

And to cover these rare cases, adding an "(optional)" suffix to the label seems a better choice than adding an asterisk to every other field.

In other words:

> **Keep it short.** [...] Remove fields which collect information that can be (a) derived in some other way, (b) collected more conveniently at a later date, or (c) simply omitted. Every time you cut a field or question from a form, you increase its conversion rate — the business case for this guideline is that simple.
>
> [Web Forms Usability](https://www.nngroup.com/articles/web-form-design/), Norman Nielsen Group
