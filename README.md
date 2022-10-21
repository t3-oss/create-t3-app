<p align="center">
  <img src="https://user-images.githubusercontent.com/95541290/184307358-ebf8be63-e434-49d9-8181-90269ad79599.png" width="130" alt="Logo for T3" />
</p>

<h1 align="center">
  create-t3-app
</h1>

<p align="center">
  Interactive CLI to quickly set up an opinionated, full-stack, typesafe Next.js project.
</p>

<p align="center">
  Get started with the <a rel="noopener noreferrer" target="_blank" href="https://init.tips">T3 Stack</a> by running <code>npx create-t3-app@latest</code>
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

- <a href="#about">What is the T3 Stack?</a>
- <a href="#getting-started">Getting Started</a>
- <a href="#community">Community</a>
- <a href="#axioms">T3 Axioms</a>
- <a href="#contributors">Contributors</a>

<h2 id="about">What is the T3 Stack?</h2>

The _"T3 Stack"_ is a web development stack made by [Theo](https://twitter.com/t3dotgg) focused on **simplicity**, **modularity**, and **full-stack typesafety**. It consists of:

- [Next.js](https://nextjs.org)
- [tRPC](https://trpc.io)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://typescriptlang.org)
- [Prisma](https://prisma.io)
- [NextAuth.js](https://next-auth.js.org)

### What is this? Some kinda template?

Kind of. We love all of the technologies that `create-t3-app` includes. Check out [init.tips](https://init.tips/others) for even more info on topics such as state management and deployment. But we do not believe these are needed on every project.

So we made `create-t3-app` to do one thing: **_Simplify complex boilerplate around the core T3 Stack tech without compromising the pieces modularity_**. This is NOT an all-inclusive template and we expect you to bring your own libraries as well.

We are selective about the packages we have included. We don't add libraries that are as simple as `npm install zustand`: **_If you cut an issue asking us to add your preferred libraries, we will make fun of you._**

<p align="center">
  <img src="https://media4.giphy.com/media/3orieLHXgpfkKO9Iju/200.gif" alt="Nelson from the Simpsons pointing and saying ha-ha in a mocking tone" />
</p>

<h2 id="getting-started">Getting Started</h2>

To get started with `create-t3-app`, run any of the following three commands and answer the command prompt questions:

### npm

```bash
npx create-t3-app@latest
```

### yarn

```bash
yarn create t3-app
```

### pnpm

```bash
pnpm dlx create-t3-app@latest
```

For more advanced usage, check out the [CLI docs](https://beta.create.t3.gg/en/installation).

<h2 id="community">Community</h2>

For help, discussion about best practices, or any other conversation that would benefit create-t3-app:

[Join the T3 Discord Server](https://t3.gg/discord)

<h2 id="axioms">T3 Axioms</h2>

We'll be frank - this is an _opinionated project_. We share a handful of core beliefs around building and we treat them as the basis for our decisions.

### 1. Solve Problems

It's easy to fall in the trap of "adding everything" - we explicitly _don't_ want to do that. Everything added to `create-t3-app` should solve a _specific_ problem that exists within the core technologies included. This means we **won't** add things like state libraries (`zustand`, `redux`) but we **will** add things like NextAuth.js and integrate Prisma and tRPC for you.

### 2. Bleed Responsibly

We love our bleeding edge tech. The amount of speed and, honestly, _fun_ that comes out of new shit is really cool. We think it's important to **bleed responsibly**, using riskier tech in the less risky parts. This means we **wouldn't** ⛔️ bet on risky new database tech (SQL is great!). But we **happily** ✅ bet on tRPC since it's just functions that are trivial to move off.

### 3. Typesafety Isn't Optional

Two of the three T's are typesafe (Typescript, tRPC). We take typesafety seriously in these parts. Any decision that compromises the full-stack, typesafe nature of `create-t3-app` is a decision that should be made in a different project. The stated goal of `create-t3-app` is to provide the quickest way to start a new fullstack, type safe web application.

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
