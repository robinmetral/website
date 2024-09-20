---
title: "photos-workflow"
categories:
  - name: dev
published_date: "2024-05-26"
template: page
---

Just notes here

Two kinds of photos:

1. sorted photos for archiving
2. optimized photos for serving on the web

## 1. sorted photos for archiving

- high quality but not too high
  - (should phone pics be slightly optimized before archiving?)
- easily accessible. Different levels:
  - best (but most expensive in terms of $ and consumption): anywhere would require cloud storage
  - better: on home network with some kid of NAS
  - **good: on hard drive, with a photo viewing app** (incl thumbnails, albums, etc) to avoid having to go through a FS. WITH BACKUPS
    - no access on phone. Fine for archives
    - I like this one. Which photo viewing app and how to use it on multiple devices seamlessly? (two laptops)
  - bad: on a hard drive without a backup
  - bad: on Google Photos

### 1b: on-the-road storage (when the hard drive is at home)

- Nextcloud (easy upload, already using)
  - optimize photos app with thumbnails?
    - only worth it on very long trips, otherwise the viewing happens back home on local system
  - improve viewing exp with memories app? (https://github.com/pulsejet/memories)
    - only worth it on very long trips, otherwise the viewing happens back home on local system
  - remote storage to avoid taking too much space on Alwaysdata?
    - S3-compatible storage with no egress fees:
      - reliable, cheap if using under 1TO: Digital Ocean Spaces, 5$/mo for 250 Go, https://www.digitalocean.com/products/spaces
      - cheapest: iDrive e2, 30$/TO/year, https://www.idrive.com/s3-storage-e2/
      - cheap, reliable: BackBlaze, 6$/TO/mo, https://www.backblaze.com/cloud-storage/pricing
      - Wasabi, 7$/TO/mo, https://wasabi.com/cloud-storage-pricing
      - Impossible Cloud, 8$/TO/month, https://www.impossiblecloud.com/pricing
    - Note: don't want to use these long-term (only while on the road) because
      - commercial: pricing will change, there will be bad surprises
      - cloud: not great with low/no connection
    - To do:
      - check small print of Digital Ocean, BackBlaze and iDrive to see what the real monthly cost would be for storing ~100Go as NextCloud remote storage with regular NextCloud usage (viewing photos etc.)
      - find answer to this question: is remote storage really better for NextCloud storage? https://help.nextcloud.com/t/how-does-external-storage-work-local-caching-trash-storage-space/146456
      - is it better to have a single service for on-the-road hosting and web hosting?

## 2. optimized web media storage

Rough thoughts:

- does it need to be in multiple locations?
  - ideally yes. Truly, I don't think so (more resources, usually $ but also storage. Would rather have a single file server in use than many), better focus on optimizing aggressively
- store multiple photo sizes/formats
  - ideally yes
- storage: look into costs for a few GB (currently 500MB with a single size and format) and 100GB (eventually)
- can the photos and the website be served from the same server?
  - this would be ideal, moving away from Cloudflare and doing things more "manually". Need to look into hosts!
- what workflow for transforming and optimizing and uploading images?
- ...
