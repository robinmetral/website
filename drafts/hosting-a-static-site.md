---
title: "Hosting a static site"
categories:
  - name:
published_date: "2024-05-30"
template: page
---

- not cloudflare anymore (ref to old post)
- want something more barebones, not free, on a shared server
  - no vendor lock-in
  - chance to learn about web servers
  - no need for a CDN esp. when trying to reduce footprint
- for now, host images on host (one moving part fewer)
- Q: what about lambdas? these are useful for some things. Still Cloudflare?

## Registrar

Currently Gandi. Will move away from it (acquired)

- big list here: https://european-alternatives.eu/category/domain-name-registrar
- tiny list here: https://github.com/pluja/awesome-privacy?tab=readme-ov-file#domain-registrar (including because the rest of this Awesome list is interesting)
- CH: Infomaniak
- EU: look at netim (FR), lots of others
- https://www.mythic-beasts.com/, Cambridge Uni

## Hosting

- https://shockhosting.net/ with several EU locations. Shared hosting starting at 2.24$/mo with unlimited storage, bandwidth AND mail (?!)
  - would allow moving mail out of metral.ch and towards a full stack that I own (though that's not a goal in itself)
  - would prefer for everything (incl. mail) to be hosted in the EU, is that possible?
- https://www.stablehost.com/ with several EU locations. Shared hosting starting at 1.5$/mo (0.9$/mo for first year), 5GB storage
- https://www.netim.com/en FR. 1 website (10GB), 10 email addresses (20GB), 1DB. 2EUR/mo
- To do: look at https://njal.la/, I like the messaging
- https://bunny.net, 100GO storage for 1EUR/mo
- https://www.hetzner.com/webhosting/, 2EUR/mo including a domain, a mailbox, 1 DB and 10GB storage (for files and mail). Also check the cloud services, bit more barebones

## Object hosting

For images e.g. for Eau de poisson (not an issue for this small website)

- big list: https://european-alternatives.eu/category/object-storage-providers
  - **Nope** [Exoscale](https://www.exoscale.com/object-storage/) (CH). Dismissed because I don't like the complicated pricing with egress fees etc
  - [Scaleway](https://www.scaleway.com/en/object-storage/) (FR). Zones: Paris, Amsterdam, Warsaw. 1 zone = €0,0000165/GB/hour = ~€0,1188/mo for 10GB (tax excluded). Generous free tier for egress (75G/mo), then €0.01/Go (same as OVH). Total excluding tax = **€0.12/mo** (when egress < 75G/mo). Probably can host more objects.
  - **Nope** [Fuga](https://fuga.cloud/services/s3-objectstorage/) (NL). Zones: Amsterdam. €0,055/GB/mo = ~€0.55/mo for 10GB. Egress €0,055 per GB/mo, cost for ops... complicated pricing and more expensive than Scaleway, dismissed
  - **Nope** [Contabo](https://contabo.com/en/object-storage/) (DE). Zone: Worldwide. €2.49/month for 250 GB (tax excluded). Nice straightforward pricing, more expensive for smaller storage amounts, cheaper than Scaleway if nearing 250GB. Total excluding tax = **€2.49/mo**. Can host more objects. Dismissed, too expensive for now, maybe in the future when hosting more data (it should be easy to switch between S3-compliant providers!)
  - [OVH](https://www.ovhcloud.com/en/public-cloud/object-storage/) (FR). Zones? €0,007/month/GB = €0,07/mo for 10GB (tax excluded). Cheapest when no public egress. Warning: public egress €0,01/Go—we currently serve 7Go/mo through eaudepoisson, so this would add €0.07. Total excluding tax = **€0.14/mo**. Probably can host more objects.
  - [intercolo](https://intercolo.de/en/object-storage) (DE). Seems a bit MVPish. Anonymous access not allowed ([source](https://docs.intercolo.de/en/docs/object_storage/compatibility/#overview)), need to use intercolo's CDN service. **Emailed to ask questions about pricing**
  - [Tebi](https://tebi.io/) (CY). Only object storage. Seems very MVP (don't trust it). Who hosts the files, Hetzner? Free tier of 25 GB of storage and 250 GB of traffic (good to start? If the API is S3-compatible it's easy to switch). Made an account and emailed with question about ACL (access control for objects)
  - **Nope** [CleverCloud](https://www.clever-cloud.com/product/cellar-object-storage/) (FR). Zones: ?. €0,020/GB/mo = €0,2/mo. Expensive egress (€0,09/GB). Total excluding tax = **€0,83/mo**. Dismissed, more expensive and less reliable than competitors
  - **Nope** [Ionos](https://cloud.ionos.fr/stockage/object-storage) (DE). Zones: ?. €0,007/Go/mo = 0,014/mo for 10Go (tax excluded) (same as OVH). Egress €0,030/Go when under 10To. Total excluding tax = **€0,224/mo**. Dismissed, more expensive than competitors (high egress)
  - [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) (US). Zones: worldwide. Free tier for storage (10GB) and operations (many). Beyond the free tier: $0,015/GB/mo = $0.15/mo for 10 GB. Total excluding tax = **€0,15/mo**. Good: it's Cloudflare (very easy to use R2 with Workers, current FAAS provider). Less good: it's Cloudflare (vendor lock-in, will be tough to switch, and I do want to switch eventually). I don't like that it's necessary to add a credit card to start using the service

## FAAS (Lambda) hosting

- one item on the list here: https://european-alternatives.eu/category/faas-function-as-a-service-providers

## Code hosting

- free hosted Gitea
- Codeberg (uses Forgejo)
- Sourcehut https://sourcehut.org/ (Q: where is it hosted?)
