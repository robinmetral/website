---
title: "A cron web scraper with Telegram alerts"
categories:
  - name: dev
published_date: "2023-12-10"
template: page
buildScript: "/scripts/processNote.js"
highlightCode: true
---

We really want seats for [this play](https://theatredecarouge.ch/spectacle/lusage-du-monde/), but it's booked out. A number of seats occasionally free up, but there's no way to join a waiting list or anything.

I could reload the page a lot. Or I could get a computer to do it for me.

It was surprisingly easy—I just had to have:

- a Node.js script, hosted on GitHub (private repo), that scrapes a page using [Playwright](https://github.com/microsoft/playwright) and, if conditions are met, hits the [Telegram Bot API](https://core.telegram.org/bots/api)
- an active Telegram bot to send messages from
- a GitHub Action that runs the Node.js script on a cron schedule

## The script

A .mjs file with under 100 lines of code. When run, it:

1. spins up a headless browser using Playwright (so I had to `npm init` and `npm install playwright`), and loads the play's booking page
2. parses the page to determine whether there are free seats (based on DOM structure and element classnames). Not the cleanest because the page isn't the cleanest, e.g. it needs to [get into a frame](https://playwright.dev/docs/api/class-elementhandle#element-handle-content-frame) and [block failing requests](https://playwright.dev/docs/network#abort-requests). But it works
3. if step 2 finds seats, it messages my user on Telegram by hitting the Telegram Bot API's [sendMessage endpoint](https://core.telegram.org/bots/api#sendmessage) (this requires a Telegram bot token and a chat ID: see "The bot" below)

Built in [VSCodium](https://github.com/VSCodium/vscodium) with `@ts-check` to get types from the Playwright package, without having to set up a TypeScript build step. (I'm done with compiling TypeScript in small projects, `@ts-check`/[jsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) and [jsdoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) are more than enough.)

## The bot

A bot is the simplest way to programmatically send messages to someone on Telegram. There's no need to auth any user, messages will simply come from the bot. To get this set up, I:

1. messaged Telegram's `@BotFather` (ha ha), sent `/newbot` and followed the guide (naming the bot etc). Got a **bot API token** (a string that looks like `4839574812:AAFD39kkdpWt3ywyRZergyOLMaJhac60qc`)
2. started a chat with the new bot: from Telegram Web, search for the bot's name, click "start", and send "Hello World". This is important, otherwise the bot can't message the user (probably to prevent spam?)
3. got my user's **chat ID** from the response payload at `https://api.telegram.org/bot<token>/getUpdates`. If the response is `{"ok":true,"result":[]}` it's because you haven't sent the bot any message (see step 2)

The **bot API token** and the **chat ID** are used when calling the Bot API (see point 3 under "The script"):

- the token goes in the request path. For example the URL for the `sendMessage` endpoint would be `https://api.telegram.org/bot4839574812:AAFD39kkdpWt3ywyRZergyOLMaJhac60qc/sendMessage` (it's always `/bot<token>/<method_name>`)
- the chat ID goes in the request body as `chat_id`, along with the message text as `text` (if making a POST request)

## The cron job

Finally I uploaded the script to GitHub and added a GitHub Actions workflow to run it every 30 minutes:

```yml
# .github/workflows/cron.yml

on:
  schedule:
    - cron: "15,45 6-22 * * *" # every 30 min between 7h15 and 23h45 (UTC+1)
  workflow_dispatch: # manual trigger

jobs:
  cron:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: ".nvmrc" # running on 19
          cache: "npm"
      - run: npm ci
      - run: npx playwright install --with-deps chromium # playwright deps
      - name: Check seats
        run: node check-seats.mjs
```

Note: with the GitHub free plan there's a limit of 2000 GitHub Actions usage minutes per month, which can be tracked on GitHub under [Settings > Billing](https://github.com/settings/billing/summary#usage).

If the script executes in under a minute (and it should, and it does) then 1 usage minute is deducted. If the script ran for an entire month, 24/7, every 30 minutes, I'd use under 1500 minutes. Since I'm running it only for a couple of weeks and only between 7h and 23h, I'll have plenty of minutes left.

## Concl.

It was super fast/easy to spin this up and it works great. This note was mostly to document how the thing roughly works—I'll probably build more of these in the future.

Now I hope we get seats![^1]

[^1]: Update: [got seats](/notes/weeknote-38-setting-off/)!
