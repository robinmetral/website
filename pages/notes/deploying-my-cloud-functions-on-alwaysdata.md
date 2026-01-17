---
title: "Deploying my cloud functions to Alwaysdata"
description: "Or: replacing Cloudflare Workers by a dumb Node.js server"
categories:
  - name: dev
published_date: "2026-01-17"
template: page
---

I've been moving away from big tech for hosting personal projects ([exhibit A](/notes/bye-cloudflare-hello-deuxfleurs/), [exhibit B](/notes/migrating-from-github-to-codeberg/)).

One thing I regularly need hosted are cloud functions: basically small, isolated programs that need to run outside of the browser. You might know them as serverless functions[^1], workers or lambdas—[Robin](https://www.robinsloan.com/lab/cloud-study/) calls them "floating wisps of code".

Big tech Function-as-a-Service (FaaS) solutions[^2] typically run functions in isolation, handle scaling, and provide multiple runtimes and regions.

I don't really need any of this for functions that run maybe 5 times per day, so I decided to deploy them as endpoints of a small <span aria-label="sparkling text:">✨</span> Node.js server <span aria-hidden>✨</span>.[^3]

(Don't know if I can still call these cloud functions, but technically they're functions that run on a cloud so why not.)

## The Node.js server: look mum no framework

This is a tiny, uncomplicated project and I wanted to keep things as simple as possible. I initially looked at lightweight frameworks like [Polka](https://github.com/lukeed/polka) or [Hono](https://hono.dev/) but decided to go framework-free. I don't need middleware or support for other JS runtimes.

All I need is a router (one route = one cloud function), and with Node.js v23.8 adding support for the [URLPattern API](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API), it doesn't get much simpler than this:

```js
// Example route
const routes = [
  {
    pattern: new URLPattern({ pathname: "/book/:id" }),
    handler: (res, req, params) => {
      res.end(`Book id: ${params.id}`);
    },
  },
];

function router(req, res) {
  // Match the route using URLPattern.test()
  const route = routes.find((route) => route.pattern.test(req.url));
  if (!route) return; // 404!

  // Get route params using URLPattern.exec()
  const params = route.pattern.exec(url)?.pathname.groups || {};

  // Call the route handler
  route.handler(req, res, params);
}

// Start Node.js HTTP server
const server = http.createServer((req, res) => {
  router(req, res);
});
```

Reality is a bit more complicated, [but not much](https://codeberg.org/robinmetral/functions/src/commit/bfbecf5c31b418a63c6fa9ff42fae31e505daea6/src/router.js).

One nice perk of having no runtime dependencies is that bundling is basically optional. To start the HTTP server, I just run `node index.js`.

## Deploying a Node.js server to Alwaysdata

I have access to a web server hosted by [Alwaysdata](https://www.alwaysdata.com/en/) on [their own infrastructure](https://help.alwaysdata.com/en/architecture/) in the Paris area. This is a bit of an old school host, so Docker isn't really a thing and services aren't isolated (which is fine for this kind of projects).

First, I `rsync`-ed the code (a handful of JS files) to the remote server using [SSH](https://help.alwaysdata.com/en/remote-access/ssh/):

```bash
rsync -r --delete src/ <ssh-user>@ssh-<account>.alwaysdata.net:www/functions
```

Then I configured a new Site[^4]:

- Address: a subdomain of one of the domains I [manage](https://help.alwaysdata.com/en/domains/) on Alwaysdata
- Configuration:
  - Type: Node.js
  - Node.js version: 24
  - Command: `node index.js`
  - Working directory: `www/functions`
  - Environment: environment variables. _Note: Alwaysdata sets the `IP` and `PORT` variables that the server should listen on._
- SSL: force HTTPS (why not—Alwaysdata issues certificates for all addresses)

And it just works! The server is live and my cloud functions have a new home. [Source on Codeberg](https://codeberg.org/robinmetral/functions) for the curious.

[^1]: A misnomer: they're just running on someone else's server.

[^2]: The usual culprits: AWS Lambda, Cloudflare Workers, GCP Functions, Azure Functions, Vercel Functions etc.

[^3]: A note: if you don't want to host a server for your cloud functions, [Val.town](https://www.val.town/) looks like a pretty good alternative to the big cloud providers (though they probably use one of those under the hood).

[^4]: On Alwaysdata, any service is configured as a [Site](https://help.alwaysdata.com/en/sites/).
