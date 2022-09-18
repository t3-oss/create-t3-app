---
title: NextJS
description: Usage of NextJS
layout: ../../../layouts/docs.astro
---

## What is NextJS?

NextJS is a backend framework for your React applications.

<a
href="https://www.youtube.com/watch?v=2cB5Fh46Vi4"
className="mx-auto"
target="\_blank"

>

  <p align="center">
    <img
      src="/images/nextjs_thumbnail.jpg"
      alt="NextJS is a backend framework"
      width="320"
    />
  </p>
</a>

<a
href="https://www.youtube.com/watch?v=2cB5Fh46Vi4"
className="mx-auto"
target="\_blank"

>

  <p align="center">Watch Theo's overview on Youtube here</p>
</a>

## Why should I use it?

We love React. It has made UI development accessible in ways we never imagined before. It also can lead developers down some rough paths. Next.js offers a lightly opinionated, heavily optimized approach to creating a website using React. From routing to API definitions to image rendering, we trust Next.js to lead developers towards good decisions.

Pairing NextJS with [Vercel](https://vercel.com/) makes developing and deploying websites possible in the simplest way possible. Their extremely generous free-tier and super intuitive interface provides a point and click solution to deploy your site (We ❤️ Vercel)

## Get Static/Server Props

One of NextJS prime features is its data fetching capabilities. We highly recommend reading through the [official documentation](https://nextjs.org/docs/basic-features/data-fetching) to understand how to use each method and how they differ. `getServerSideProps` is generally discouraged unless there is a good reason for it, due to the fact that it is a blocking call and will slow down your site. [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/incremental-static-regeneration) is a great alternative to `getServerSideProps` when the data is dynamic and can be fetched incrementally.

## Useful Resources

| Resource                       | Link                               |
| ------------------------------ | ---------------------------------- |
| Next.js Documentation          | https://nextjs.org/docs            |
| Next.js GitHub                 | https://github.com/vercel/next.js  |
| Next.js Blog                   | https://nextjs.org/blog            |
| Next.js Discord                | https://nextjs.org/discord         |
| Next.js Twitter                | https://twitter.com/nextjs         |
| Vercel/Next.js YouTube Channel | https://www.youtube.com/c/VercelHQ |
