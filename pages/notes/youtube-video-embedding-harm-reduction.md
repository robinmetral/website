---
title: "YouTube video embedding harm reduction"
categories:
  - name: dev
publishDate: "2024-05-17"
template: page
buildScript: "/scripts/processNote.js"
highlightCode: true
---

Wanted to start embedding YouTube videos on [Eau de poisson](https://eaudepoisson.com) instead of just linking over (in rare, specific cases where a video is central to the content).

On the other hand, letting Google track users through your site is not very nice (and the reason why we haven't been embedding until now).

There might be a way out: Julien over at [Artificial truth](https://dustri.org/) wrote about [YouTube video embedding harm reduction](https://dustri.org/b/youtube-video-embedding-harm-reduction.html) — ways to embed a video while leaking as little data as possible to Google.

Here's the golden snippet:

```html
<!-- source: https://dustri.org/b/youtube-video-embedding-harm-reduction.html -->

<iframe
  credentialless
  allowfullscreen
  referrerpolicy="no-referrer"
  sandbox="allow-scripts allow-same-origin"
  allow="accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; battery 'none'; bluetooth 'none'; browsing-topics 'none'; camera 'none'; ch-ua 'none'; display-capture 'none'; domain-agent 'none'; document-domain 'none'; encrypted-media 'none'; execution-while-not-rendered 'none'; execution-while-out-of-viewport 'none'; gamepad 'none'; geolocation 'none'; gyroscope 'none'; hid 'none'; identity-credentials-get 'none'; idle-detection 'none'; keyboard-map 'none'; local-fonts 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; navigation-override 'none'; otp-credentials 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-create 'none'; publickey-credentials-get 'none'; screen-wake-lock 'none'; serial 'none'; speaker-selection 'none'; sync-xhr 'none'; usb 'none'; web-share 'none'; window-management 'none'; xr-spatial-tracking 'none'"
  csp="sandbox allow-scripts allow-same-origin;"
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk"
  title="lofi hip hop radio 📚 - beats to relax/study to"
  frameborder="0"
  loading="lazy"
></iframe>
```

The [original post](https://dustri.org/b/youtube-video-embedding-harm-reduction.html) details each of the attributes — read it.

One thing I've changed in my own implementation[^1] was adding a couple of query params from the [YouTube IFrame Player API](https://developers.google.com/youtube/player_parameters)[^2] to the source URL:

- **rel=0**: this [used to](https://developers.google.com/youtube/player_parameters#release_notes_08_23_2018) remove the annoying "related videos" that YouTube pushes down its users' throats and which, frankly, have no place on embedded videos. Now, it only ensures that all "related videos" are from the same channel as the embedded video. Better than nothing, I guess.
- **hl=fr**: sets the player language to a [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes), `fr` in my case. It's a good idea to match the document's `lang` here.

Result: `https://www.youtube-nocookie.com/embed/<video-id>?rel=0&hl=<lang>`

Another possible improvement could be to nest the `<frame>` inside `<details>`. Since the frame is lazy loaded, requests would only go out to Google servers when users expand the details. The `<summary>` can then be used as a form of disclaimer/warning: "Open video in the YouTube player". But for most users, this only means an extra click — we decided against it.

[^1]: besides ditching `width` and `height` and making the frame responsive using [an old trick](https://alistapart.com/article/creating-intrinsic-ratios-for-video/) ([updated](https://gomakethings.com/responsive-iframes-with-the-css-aspect-ratio-property/))
[^2]: a fancy name for query params
