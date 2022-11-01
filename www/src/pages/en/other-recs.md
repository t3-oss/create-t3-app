---
title: Other Recommendations
description: Libraries and Services that we recommend for many projects
layout: ../../layouts/docs.astro
---

We recognize that the libraries included in `create-t3-app` don't solve every problem. While we encourage you to begin your project with the things that we provide, there will come a time when you need to bring in other packages. Only you can know what your project needs, but here are some things that we find ourselves recommending frequently.

## State Management

_**Editor's Note**_: State management libraries can be great, but often aren't necessary. tRPC's React Query hooks should be able to take care of your server state. For client state, start with React's `useState`, and reach for one of these options when you need more.

### Zustand - for never using Redux again

The "modern, simple Redux" you didn't know you needed. [Poimandres](https://github.com/pmndrs) can always be trusted. You can build everything from video call apps to games to servers with this little library.

- [Zustand Homepage](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Jotai - for never using Context again

For a more atomic approach, Jotai is hard to beat. Also by [Poimandres](https://github.com/pmndrs), Jotai lets you define singletons that feel like global useState. Great option for stateful behaviors that don't need a state machine just yet.

- [Jotai Homepage](https://jotai.org/)
- [Jotai GitHub](https://github.com/pmndrs/jotai)

## UI and Design

### clsx - for conditionally adding Tailwind or CSS classes

We love `clsx` because it provides an easy to read syntax for conditionally applying Tailwind or CSS classes, and doesn't try to do anything else.

- [clsx GitHub](https://github.com/lukeed/clsx)

### Class Variance Authority - for building UI Libraries

Declaratively build a UI Library with different color, size, etc. variants. When your project reaches a scale where you want a standardized set of UI components with multiple variants, CVA is a great tool.

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

### AutoAnimate - for animations with a single line of code

Most animation libraries try to satisfy every possible use case, and become clunky as a result. AutoAnimate is a zero-configuration tool that will give you a significant improvement in UX with no additional developer effort.

- [AutoAnimate Homepage](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)

### Radix UI - for unstyled, accessible UI components

Most apps need the same handful of components - toggle buttons, dropdown menus, modals, and so on. Radix UI gives you a powerful set of convenient and accessible primitives that you can style yourself using Tailwind or CSS.

- [Radix UI Homepage](https://www.radix-ui.com/)
- [Radix UI GitHub](https://github.com/radix-ui/primitives)

### Component Libraries - for when you just want your app to look OK

Sometimes you're building a project where you just want the UI to look decent out of the box. For Admin Dashboards and other similar projects, any of these component libraries will get the job done.

- [Chakra UI](https://chakra-ui.com/)
- [Mantine UI](https://ui.mantine.dev/)
- [MUI](https://mui.com/)

## Deployments, Infrastructure, Databases and CI

### Vercel - for hosting your website

Vercel took the hell of web deployments and made it a set-and-forget GitHub integration. We've scaled to hundreds of thousands of users without issue. AWS-powered, just a way better interface :)

- [Vercel Homepage](https://vercel.com/)

### PlanetScale - for databases without the worry

PlanetScale is the best "serverless database platform" we've used by far. Insane scale, great developer experience, fantastic pricing. If you're using SQL (and hopefully Prisma), this is hard to beat.

- [PlanetScale Homepage](https://planetscale.com/)

### Railway - for hosting your infra

"Modern Heroku". Easiest way to get a real server up and running. If Vercel and PlanetScale aren't enough, Railway probably is. Point it at a GitHub repo and go.

- [Railway Homepage](https://railway.app/)

### Upstash - for serverless Redis

We love Prisma and PlanetScale, but some projects require a more performant solution. Upstash allows you to get the in-memory performance of Redis in your serverless project, without having to manage the infrastructure and scaling yourself.

- [Upstash Homepage](https://upstash.com/)

### Pusher - for serverless WebSockets

If WebSockets are the primary focus of your project, you may want to consider a more traditional backend such as [Fastify](https://www.fastify.io/) (which [also works with tRPC!](https://trpc.io/docs/v10/fastify)). But for quickly adding WebSockets to a T3 App, Pusher is an excellent choice.

- [Pusher Homepage](https://pusher.com/)

## Analytics

### Plausible - for user data

Need analytics? Plausible is one of the quickest ways to get them. Super minimal. It even has a [simple plugin for Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Plausible Homepage](https://plausible.io/)
