---
slug: migrating-apps-with-litestream
title: Simple Migrations with Litestream and Trying out Hetzner Cloud
layout: blog-post
sitemap: false
draft: true
preview_text: Recently we have been using Litestream with SQLite for our demo applications. It impressed us with its elegant approach of providing a continuous backup of data to cost-effective and resilient storage services like AWS S3.
preview_img_url: /images/blog/litestream/litestream.svg
author: Darren Reid
author_title: ServiceStack Developer
author_img: /images/blog/authors/darren.jpg
twitter_url: https://twitter.com/layoric/
linkedin_url: https://www.linkedin.com/in/layoric/
github_url: https://github.com/layoric/
---

Recently we have been using Litestream with SQLite for our demo applications. It impressed us with its elegant approach of providing a continuous backup of data to cost-effective and resilient storage services like AWS S3. 
We realized this combination of SQLite, Litestream and Cloud storage like S3 can provide extremely well priced solution to those use cases where SQLite provides more than enough performance.

We originally used a single DigitalOcean droplet to host these demo applications, giving us an aggregate cost of around $0.40 a month per application. 
This was serving us quite well, but with adding Litestream into the mix, we decided to do some load tests to see at what point we would hit issues with heavier traffic.

<div class="mx-auto mt-4 mb-4 px-4">
    <div class="inline-flex justify-center w-full ">
      <img src="/images/blog/litestream/load-test-rps.png" alt="SQLite & Litestream load tested on DigitalOcean $48 droplet">
    </div>
<div class="text-gray-500 text-center">SQLite & Litestream load tested on DigitalOcean $48 droplet</div>
</div>

We setup a load test that ramped up active users at a rate of 5 to 15 per second, querying and creating Bookings in our sample booking application so we could set a baseline for comparing the same on AWS and Azure using their managed database solutions.
Concurrent users maxed out at ~300, and ~150 requests per second, and all platforms performed well, AWS and Azure had 2 vCPU app servers in addition to their default recommended managed database.

One of the main reasons to use a managed database offering is to take advantage of simple automated backups and disaster recovery.
While managed database solutions are generally mature and well supported services, their cost at the low and middle end of instance sizes can greatly increase monthly costs unnecessarily.

If you just follow the wizards for Azure and AWS, the default database offering costs can come as a bit of a shock.

Take Azure for example, for my own account at least, when attempting to create a database, it defaults to a "Gen5, 2 vCores, 32GB storage" database at $372.97/month, and you still need an application server.

<div class="mx-auto mt-4 mb-4">
    <div class="inline-flex justify-center w-full">
      <img src="/images/blog/litestream/azure-recommended-database.png" alt="">
    </div>
<div class="text-gray-500 text-center">Azure recommended database setup can easily blow out costs</div>
</div>

AWS RDS with Postgres is less, but again, you still need an application server, and the "Production" recommendation goes with a Mutli-AZ setup meaning you need to run and pay for two database instances.

While you can go for smaller managed database instances, both these offerings were not particularly large instance types. They both offered 2 vCPUs, and between 8-10.2GB of memory.
The server we were using on DigitalOcean was similar specs hosting both the database and our application. The managed offerings could likely handle a larger capacity of requests, but there are many use cases where this will be overkill for internal applications or business to business services with a relatively low number of users.

![](/images/blog/litestream/litestream.svg)

This is where Litestream and SQLite provides a compelling counter to this by using a variety of storage options and running on the same machine as your application to monitor your SQLite file for changes.
It then becomes a single command to continuously replicate or restore your database via its Command Line Interface (CLI).
AWS S3 and other cloud storage options are very competitive, and if your application is only a few gigabytes, it will likely only cost a few cents a month for your live backups.

## DigitalOcean Price Increase

Our load tests on DigitalOcean showed that we could achieve around 150 requests per second where 20% of requests wrote to the database.
The number of writes is important to note since SQLite can only write with one client at a time, but multiple can read.

This trade off suits those applications only expecting moderate usage, or heavy reads to low writes when users are interacting with their system.

We were using the $40/month Basic droplet with 2 vCPUs and 8GB of memory when DigitalOcean increased their prices to $48/month for the same instance.

Even at $48/month, this setup can be extremely cost efficient, but the price increase prompted us to look at what other providers might be offering.

<div class="mx-auto mt-4 mb-4 px-4">
    <div class="inline-flex justify-center w-full ">
      <img src="/images/blog/litestream/hetzner-vs-do-without-title.png" alt="Cost comparison with default recommendations from Azure and AWS shows nearly a 40x separation in running costs">
    </div>
<div class="text-gray-500 text-center">Comparison of offerings between DigitalOcean and Hetzner Cloud</div>
</div>

## Hetzner Cloud

For a long time, we have known that Hetzner dedicated servers are very well priced, but the management of these servers is a lot less streamlined than what AWS Console and the Azure portal can offer.

Hetzner Cloud is a much more recent competitor in the space, and in November 2021 started providing cloud instances in a US region, rather than in Europe where they are based.

Their aggressive pricing from their dedicated server offerings has continued with their Cloud product. The same $48 a month droplet with 2 vCPUs and 8GB of memory can be had for ~$12.50 USD, just shy of a 75% discount.

<div class="mx-auto mt-4 px-4">
    <div class="inline-flex justify-center w-full ">
      <img src="/images/blog/litestream/hetzner-pricing.png" alt="Cost comparison with default recommendations from Azure and AWS shows nearly a 40x separation in running costs">
    </div>
<div class="text-gray-500 text-center">Cost comparison with default recommendations from Azure and AWS shows nearly a 40x separation in running costs</div>
</div>

Re-performing the load tests, we pushed the DigitalOcean droplet to ~170rps before write latency started to become an issue. This shows that while our original load test only showed the Digital Ocean droplet at ~60% CPU utilization, SQLite's single writer limitation was holding the instance back from using much more.

On the Hetzner Cloud instance however, with the same specifications, we were able to get up to ~250rps and ~90% of CPU utilization.

<div class="mx-auto mt-4 mb-4 px-4">
    <div class="inline-flex justify-center w-full ">
      <img src="/images/blog/litestream/load-test-rps-hetzner.png" alt="SQLite & Litestream load tested on Hetzner Cloud CPX31">
</div>
<div class="text-gray-500 text-center">SQLite & Litestream load tested on Hetzner Cloud CPX31</div>
</div>

## Portability

Something else that Litestream improves is the portability of moving your applications between servers. For most of the ServiceStack templates we include a pattern to use with GitHub Actions to deploy the application to any Linux server via SSH that has Docker and Docker Compose installed. 

<div class="mx-auto mt-4 mb-4 px-4">
    <div class="inline-flex justify-center w-full ">
      <img src="/images/blog/litestream/linux-hosting-with-docker.png" alt="">
</div>
<div class="text-gray-500 text-center">Single server Linux host with Docker and Docker Compose</div>
</div>

This uses the Nginx reverse proxy and automated TLS certificate management using LetsEncrypt, and once these two containers are running, additional applications can be deployed just by adding some GitHub repository secrets to your templated application.

We also added the ability to `mix` in Litestream support for a few of our templates, and this means that if you ever need to move to another hosting provider, your database will be restored to your new server automatically when it is deployed for the first time.

<div class="mx-auto mt-4 mb-4 px-4">
    <div class="inline-flex justify-center w-full ">
      <img src="/images/blog/litestream/github-actions-deployment.png" alt="">
</div>
<div class="text-gray-500 text-center">Overview of the ServiceStack templates built in deployment process</div>
</div>

This still involves a short bit of down time, but Litestream ensures your application is completely up to date when you change your DNS, and restores quickly up until the latest change to the SQLite file.

## Not for everyone, but worth considering

While there are many situations where people will prefer to use managed and serverless offerings from the major providers, if you're an Indie developer or from parts of the world where spending hundreds of dollars a month on a single database server is completely infeasible, SQLite with Litestream is worth considering as it provides automated backup and disaster recovery without the cloud price tag.

You can always migrate to Postgres, MS SQL or MySQL at a later date by using something like OrmLite when you start development. 
This will let you take advantage of the savings during early development, and migrate when or if it ever makes financial sense to do so.
