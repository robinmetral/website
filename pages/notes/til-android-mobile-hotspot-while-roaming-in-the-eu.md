---
title: "TIL: Android mobile hotspot while roaming in the EU"
categories:
  - name: other
publishDate: "2024-01-22"
template: "/templates/page.html"
buildScript: "/scripts/processNote.js"
---

This is something I've run across a few times on the road: you're roaming (e.g. you're on a French plan but on the train in Germany) and thanks to the EU you can use your data as if you were back home, BUT somehow sharing data via the Android mobile hotspot doesn't work, so you can't connect to the internet from your laptop.

Some carriers, like mine back in France (Lebara), will tell people to set up their internet connection as follows[^1]:

> - In the Android network settings, add a new APN
> - Under "Name" enter `Lebara`
> - Under "APN" enter `fr.lebara.mobi`
> - Under "APN type", enter `default`
> - Save

The issue here, it seems, is the APN type. `default` will block mobile hotspot data sharing.

Instead, **an APN type that allows mobile hotspot data sharing is `default,supl,dun`** (credits to [this answer on the Android StackExchange](https://android.stackexchange.com/a/254352)).

My gut says that these carriers don't really want you to use too much data while roaming (contracts actually have clauses that mention things like "reasonable use" of data when roaming in the EU[^2]), and preventing data sharing reduces roaming data usage a bit.

Full disclosure: I don't know why this works. I tried to look into these different types but they seem completely unrelated to data sharing. Also I don't really understand what an APN does, and to be frank at this time I don't really care. All I know is that I could finally use my data on my laptop, and that I'm not the only one (re: Android StackExchange).

[^1]: lightly edited from the [Lebara website](https://www.lebara.fr/en/faq/appels-internet/installer-internet.html)
[^2]: I'm not actually sure how EU roaming works "behind the scenes". If my carrier is Lebara FR and I use data while roaming on Telekom DE, does Lebara pay Telekom for the data I used?
