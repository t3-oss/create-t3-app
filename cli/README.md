<p align="center">
  <picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/t3-oss/create-t3-app/99286f37324330ecdf75132fae1f246440a88035/www/public/images/t3-light.svg">
  <img src="https://raw.githubusercontent.com/t3-oss/create-t3-app/99286f37324330ecdf75132fae1f246440a88035/www/public/images/t3-dark.svg" width="130" alt="Logo for T3">
</picture>
</p>

<h1 align="center">
  create-t3-app
</h1>

<p align="center">
  Interactive CLI to start a full-stack, typesafe Next.js app.
</p>

<p align="center">
  Get started with the <a rel="noopener noreferrer" target="_blank" href="https://init.tips">T3 Stack</a> by running <code>npm create t3-app@latest</code>
</p>

<div align="center">

[![PRs-Welcome][contribute-image]][contribute-url] [![Discord](https://img.shields.io/discord/966627436387266600?color=%235865F2&label=Discord&logo=discord&logoColor=%23fff)](https://t3.gg/discord) [![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

</div>

<a href="http://www.youtube.com/watch?v=PbjHxIuHduU" target="_blank">
  <p align="center">
    <img src="https://t3.gg/random/T3%20Stack%20V4.png" alt="Video thumbnail of Theo with an indecipherable expression on his face" width="320" />
  </p>
</a>

<a href="http://www.youtube.com/watch?v=PbjHxIuHduU" target="_blank">
  <p align="center">Watch Theo's overview on Youtube here</p>
</a>

## Table of contents

- <a href="#about">The T3 Stack</a>
- <a href="#axioms">T3 Axioms</a>
- <a href="#getting-started">Getting Started</a>
- <a href="#community">Community</a>
- <a href="#contributors">Contributors</a>

<h2 id="about">The T3 Stack</h2>

The _"T3 Stack"_ is a web development stack made by [Theo](https://twitter.com/t3dotgg) focused on **simplicity**, **modularity**, and **full-stack typesafety**. It consists of:

- [Next.js](https://nextjs.org)
- [tRPC](https://trpc.io)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://typescriptlang.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [NextAuth.js](https://next-auth.js.org)

### So... what is `create-t3-app`? A template?

Kind of? `create-t3-app` is a CLI built by seasoned T3 Stack devs to streamline the setup of a modular T3 Stack app. This means each piece is optional, and the "template" is generated based on your specific needs.

After countless projects and many years on this tech, we have lots of opinions and insights. We’ve done our best to encode them into this CLI.

This is **NOT** an all-inclusive template. We **expect** you to bring your own libraries that solve the needs of **YOUR** application. While we don’t want to prescribe solutions to more specific problems like state management and deployment, we [do have some recommendations listed here](https://create.t3.gg/en/other-recs).

<h2 id="axioms">T3 Axioms</h2>

We'll be frank - this is an _opinionated project_. We share a handful of core beliefs around building and we treat them as the basis for our decisions.

### 1. Solve Problems

It's easy to fall into the trap of "adding everything" - we explicitly _don't_ want to do that. Everything added to `create-t3-app` should solve a _specific_ problem that exists within the core technologies included. This means we **won't** add things like state libraries (`zustand`, `redux`) but we **will** add things like NextAuth.js and integrate Prisma and tRPC for you.

### 2. Bleed Responsibly

We love our bleeding edge tech. The amount of speed and, honestly, _fun_ that comes out of new shit is really cool. We think it's important to **bleed responsibly**, using riskier tech in the less risky parts. This means we **wouldn't** ⛔️ bet on risky new database tech (SQL is great!). But we **happily** ✅ bet on tRPC since it's just functions that are trivial to move off.

### 3. Typesafety Isn't Optional

The stated goal of `create-t3-app` is to provide the quickest way to start a new full-stack, typesafe web application. We take typesafety seriously in these parts as it improves our productivity and helps us ship fewer bugs. Any decision that compromises the typesafe nature of `create-t3-app` is a decision that should be made in a different project.

<h2 id="getting-started">Getting Started</h2>

To scaffold an app using `create-t3-app`, run any of the following four commands and answer the command prompt questions:

### npm

```bash
npm create t3-app@latest
```

### yarn

```bash
yarn create t3-app
```

### pnpm

```bash
pnpm create t3-app@latest
```

### bun

```bash
bun create t3-app@latest
```

For more advanced usage, check out the [CLI docs](https://create.t3.gg/en/installation).

<h2 id="community">Community</h2>

For help, discussion about best practices, or any other conversation that would benefit create-t3-app:

[Join the T3 Discord Server](https://t3.gg/discord)

<h2 id="contributors">Contributors</h2>

We 💖 contributors! Feel free to contribute to this project but **please read the [Contributing Guidelines](CONTRIBUTING.md) before opening an issue or PR** so you understand the branching strategy and local development environment. We also welcome you to join our [Discord](https://discord.gg/tEAQjDseSX) community for either support or contributing guidance.

<a href="https://github.com/t3-oss/create-t3-app/graphs/contributors">
  <p align="center">
    <img width="720" src="https://contrib.rocks/image?repo=t3-oss/create-t3-app" alt="A table of avatars from the project's contributors" />
  </p>
</a>

<p align="center">
  Made with <a rel="noopener noreferrer" target="_blank" href="https://contrib.rocks">contrib.rocks</a>
</p>

<p align="center">
  <a rel="noopener noreferrer" target="_blank" href="https://vercel.com/?utm_source=t3-oss&utm_campaign=oss">
    <img height="34px" src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Powered by vercel">
  </a>
</p>

[downloads-image]: https://img.shields.io/npm/dm/create-t3-app?color=364fc7&logoColor=364fc7
[npm-url]: https://www.npmjs.com/package/create-t3-app
[npm-image]: https://img.shields.io/npm/v/create-t3-app?color=0b7285&logoColor=0b7285
[contribute-url]: https://github.com/t3-oss/create-t3-app/blob/main/CONTRIBUTING.md
[contribute-image]: https://img.shields.io/badge/PRs-welcome-blue.svg
