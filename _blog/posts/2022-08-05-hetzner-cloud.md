---
slug: migrating-apps-with-litestream
title: Simple Migrations with Litestream and Trying out Hetzner Cloud
layout: blog-post
sitemap: false
draft: true
preview_text: Recently we have been using Litestream with SQLite for our demo applications. It impressed us with its elegant approach of providing a continuous backup of data to cost-effective and resilient storage services like AWS S3.
preview_img_url: /images/blog/typesense_logo.svg
author: Darren Reid
author_title: ServiceStack Developer
author_img: /images/blog/authors/darren.jpg
twitter_url: https://twitter.com/layoric/
linkedin_url: https://www.linkedin.com/in/layoric/
github_url: https://github.com/layoric/
---

Recently we have been using Litestream with SQLite for our demo applications. It impressed us with its elegant approach of providing a continuous backup of data to cost-effective and resilient storage services like AWS S3. 
We realized this combination of SQLite, Litestream and Cloud storage like S3 can provide extremely well priced solution to those use cases where SQLite providers more than enough performance.

We originally used a single DigitalOcean droplet to host these demo applications, giving us an aggregate cost of around $0.40 a month per application. 
This was serving us quite well, but with adding Litestream into the mix, we decided to do some load tests to see at what point we would hit issues with heavier traffic.
We setup a load test that ramped up to 300 concurrent users querying and creating Bookings in our sample booking application so we could set a baseline for comparing the same on AWS and Azure using their managed database solutions.

One of the main reasons to use a managed database offering is to take advantage of simple automated backups.
While managed database solutions are generally mature and well supported services, their cost at the low and middle end of instance sizes can greatly increase monthly costs unnecessarily.

If you just follow the wizards for Azure and AWS, the default database offering costs can come as a bit of a shock.

Take Azure for example, for my own account at least, when attempting to create a database it defaults to a "Gen5, 2 vCores, 32GB storage" database at $372.97/month, and you still need an application server, that's just the database.
AWS RDS with Postgres is less, but again, you still need an application server.

Litestream provides a compelling counter to this by using a variety of storage options and running on the same machine as your application to monitor your SQLite file for changes.
It then becomes a single command to continuously replicate or restore your database via its Command Line Interface (CLI).
AWS S3 and other cloud storage options are very competitive, and if your application is only a few gigabytes, it will likely only cost a few cents a month for your live backups.

## Load Test Results

Our load tests on DigitalOcean showed that we could achieve around 150 requests per second where 20% of requests wrote to the database.
The number of writes is important to note since SQLite can only write with one client at a time, but multiple can read.

This trade off suits those applications only expecting moderate usage, or heavy reads to low writes when users are interacting with their system.

We were using the $40/month Basic droplet with 4 vCPUs and 8GB of memory when DigitalOcean increased their prices to $48/month for the same instance.

Even at $48/month, this setup can be extremely cost efficient, but the price increase prompted us to look at what other providers might be offering.

## Hetzner Cloud

For a long time, we have known that Hetzner dedicated servers are very well priced, but the management of these servers is a lot less streamlined than what AWS Console and the Azure portal can offer.

Hetzner Cloud is a much more recent competitor in the space, and in November 2021 started providing cloud instances in a US region, rather than in Europe where they are based.

Their aggressive pricing from their dedicated server offerings has continued with their Cloud product. The same $48 a month droplet with 2 vCPUs and 8GB of memory can be had for around $12.50 USD, just shy of a 75% discount.


 