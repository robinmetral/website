---
title: "Migrating from GitHub to Codeberg"
categories:
  - name: meta
  - name: dev
published_date: "2025-12-07"
template: page
---

In the spirit of my recent [migration away from Cloudflare](/notes/bye-cloudflare-hello-deuxfleurs/) for static website hosting, I decided that the source code for this website doesn't need to be hosted on GitHub.

Unlike GitHub, [Codeberg](https://codeberg.org/about) is a non-profit git hosting platform[^1]. It doesn't train LLMs on code it hosts and doesn't try to push "AI" "features" down users' throats. Code is hosted in the EU, primarily on Codeberg's own hardware in Berlin[^2].

What follows is mostly a record of the migration (for future reference).

## Migrating the repository, issues and pull requests

Codeberg makes it really easy to [migrate repositories](https://docs.codeberg.org/advanced/migrating-repos/) from GitHub (and other git hosting platforms).

Not only will using the migration tool clone a git repo from GitHub, it will also migrate a choice of repository "metadata" : issues, pull requests, labels, milestones, releases[^3] and wikis.

Codeberg expects a GitHub access token to migrate metadata. I simply generated what GitHub calls a ["classic" access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) (with `repo` scope) and deleted it after migrating.

Migration worked reasonably well: Codeberg has to work with GitHub's adverserial API and I had to retry once (possibly because I hit rate limiting on GitHub's side).

## Updating the remote in a local clone

To set the new remote URL in a local repo clone:

```sh
git remote -v # Check that the remote name is "origin"
git remote set-url origin ssh://git@codeberg.org/<user>/<repo>.git
```

This assumes that a public key is added to Codeberg for SSH authentication.

[Codeberg's SSH documentation](https://docs.codeberg.org/security/ssh-key/) describes how to add and verify a key, as well as how to configure git to sign commits (optional but recommended).

## Configuring automatic deployments with Woodpecker

My favorite thing about GitHub is probably Actions. The CI runner is well-integrated into the platform and makes it easy to set up all kinds of automation, from running tests to triaging issues.

This website doesn't have tests (shocking I know) but I did want to set up automatic deployments for any commits to `main`.

At time of writing, the CI situation on Codeberg is a bit confusing. I'll spare you the details, but I chose to set this up using Codeberg's [Woodpecker](https://woodpecker-ci.org/) instance.

<details>
<summary>I want the details give me the details</summary>

Codeberg offers two CI solutions: Woodpecker CI and Forgejo Actions.

- [Woodpecker](https://woodpecker-ci.org/) is a dedicated, open-source CI engine. Codeberg hosts an instance at [ci.codeberg.org](https://ci.codeberg.org/). Woodpecker watches repos for workflow triggers and reports back on status to Codeberg after a run.
- [Forgejo Actions](https://forgejo.org/docs/latest/user/actions/overview/) are directly integrated into Forgejo—more similar to GitHub Actions. Hosted Forgejo Actions are [currently](https://codeberg.org/actions/meta/src/commit/3bd37d10fb01727ca1694f421422a3f103aa0af1) in open beta at Codeberg.

I decided to use Woodpecker and plan to migrate to Forgejo Actions once Codeberg announces that they're stable.

</details>

Since CI is expensive to run, Codeberg doesn't enable Woodpecker CI by default for all accounts. Users can [request access](https://codeberg.org/Codeberg-e.V./requests/src/commit/c301b63e7652246bdfad6c250b0b36853af3b765#woodpecker-ci)—my request was quickly accepted (thank you!).

After enabling a repository on [ci.codeberg.org](https://ci.codeberg.org/), Woodpecker will run any yaml workflow in the `.woodpecker` folder that follows [Woodpecker's workflow syntax](https://woodpecker-ci.org/docs/usage/workflow-syntax).

Here's my workflow to build and deploy this website:

```yaml
# .woodpecker/ci.yaml
when:
  event:
    - push
    - manual
  branch:
    - main

steps:
  - name: build
    image: node:lts-alpine
    commands:
      - npm install
      - npm run build

  - name: deploy
    image: node:lts-alpine
    environment:
      # Secrets are added in repo config on Woodpecker
      AWS_ACCESS_KEY_ID:
        from_secret: key_id
      AWS_SECRET_ACCESS_KEY:
        from_secret: key_secret
    commands:
      # Deploy to Deuxfleurs
      - npx --yes dxfl deploy robinmetral.com ./dist --yes
```

For any push event to `main`, Woodpecker builds the website and pushes the build result to [Deuxfleurs](/notes/bye-cloudflare-hello-deuxfleurs/). A run takes around a minute.

## Setting up a push mirror to GitHub

Migration done!

...but for now, I still want to keep a mirror of the repo back on GitHub. Codeberg, once again, makes this super easy to set up.

In the Codeberg repo settings, I configured a [push mirror](https://forgejo.org/docs/latest/user/repo-mirror/#setting-up-a-push-mirror-from-forgejo-to-github). For pushing to GitHub, Codeberg needs a username and another GitHub "classic" access token (with `repo` scope) as the password.

Over on GitHub, I made the repo look as read-only as I could: I disabled issues, releases, actions, and even [deleted deployments](https://munishsethi.com/github-clean-deployments/).

The repository will continue receiving updates from Codeberg (for now), but its description now reads:

> ⚠️ Mirrored from Codeberg 👇  
> [codeberg.org/robinmetral/website](https://codeberg.org/robinmetral/website)

[^1]: Codeberg is an instance of [Forgejo](https://forgejo.org/) (which Codeberg actually maintains). There are a number of [public Forgejo instances](https://codeberg.org/forgejo-contrib/delightful-forgejo#public-instances)—I picked Codeberg because it has a larger community[^4] and an integrated CI solution (more on this later).
[^2]:
    From [Codeberg's FAQ](https://docs.codeberg.org/getting-started/faq/#where-is-codeberg-hosted%3F):

    > Most of our services run on our own hardware in a rented facility in Berlin, Germany. [...] Certain tasks are offloaded to other locations and providers"

[^3]: Releases are hidden by default on Codeberg. They can be enabled in repository settings under "Units".
[^4]: Until Forgejo finishes to implement federation, this increases the chances that someone wanting to contribute already has an account.
