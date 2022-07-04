<h1 align="center"> create-t3-app </h1>
<div align="center">

Interactive CLI to quickly set up a project using the [T3 Stack](https://init.tips)

<img src="https://s6.imgcdn.dev/BJW4B.png" width="130" style="border-radius:40%"/>

</div>  
<div align="center">
<br/>

[![PRs-Welcome][contribute-image]][contribute-url] [![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]


</div>


<div id="usage">

# Usage

**npm**
```bash
npx create-t3-app@latest
```

**yarn**
```bash
yarn create t3-app
```


**pnpm**
```bash
pnpm dlx create-t3-app@latest
```
</div>


</div>

## Table of contents
 
* <a href="#about">About</a> 
* <a href="#axioms">T3 Axioms</a>
* <a href="#dev">Dev/Contributor Setup</a>
* <a href="#contributors">Contributors</a>


<div id="about">

# What is this? Some kinda template?

Kind of. We love all of the technologies that create-t3-app includes, but we do NOT believe every project needs all of them.

We made `create-t3-app` to do **one thing** - simplify the complex boilerplate around the core T3 Stack tech without compromising the modularity of the pieces.

This is **NOT** an all-inclusive template. We don't add things that are as simple as an `npm install zustand`. _If you cut an issue asking us to add your preferred libraries, we will make fun of you._

## What is the T3 Stack?

The _"T3 Stack"_ is a web development stack made by [Theo](https://twitter.com/t3dotgg), focused on **simplicity**, **modularity**, and **full-stack typesafety**.

<p align="center">
  <a href="http://www.youtube.com/watch?v=PbjHxIuHduU" target="_blank">
    <img src="https://t3.gg/random/T3%20Stack%20V4.png" alt="Watch the video" width="320" />
  </a>
</p>
<p align="center">
  <a href="http://www.youtube.com/watch?v=PbjHxIuHduU" target="_blank">
    Watch Theo's overview on Youtube here
  </a>
</p>

It consists of

- [Next.js](https://nextjs.org)
- [tRPC](https://trpc.io)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://typescriptlang.org)
- [Prisma](https://prisma.io)
- [NextAuth.js](https://next-auth.js.org)

If you're looking for more info about this stack (state management solutions, deployment recommendations, etc) - check out [init.tips](https://init.tips/other)

</div>

<div id="axioms">

# T3 Axioms

I'll be frank - this is an _opinionated project_. We share a handful of core beliefs around building, and we treat them as the basis for our decisions.

## 1. Solve Problems

It's easy to fall in the trap of "adding everything" - we explicitly _don't_ want to do that. Everything added to `create-t3-app` should solve a _specific_ problem that exists within the core technologies included.

This means we **won't** add things like state libraries (zustand, redux), but we **will** add things like NextAuth.js and integrate it with Prisma and tRPC for you

## 2. Bleed Responsibly

We love our bleeding edge tech. The amount of speed and, honestly, _fun_ that comes out of new shit is really cool. We think it's important to **bleed responsibly**, using riskier tech in the less risky parts.

This means we **wouldn't** bet on risky new database tech (SQL is great!) - but we **happily** bet on tRPC (it's just functions, moving off it is trivial).

## 3. Typesafety Isn't Optional

Two of the three T's are typesafe (Typescript, tRPC). We take typesafety seriously in these parts. Any decision that compromises the full-stack typesafe nature of `create-t3-app` is a decision that should be made in a different project.

</div>

<div id="dev">

# Dev/Contributor Setup

Read the [Contributing guidelines](CONTRIBUTING.md)

To install dependencies

```bash
# Install pnpm
npm install -g pnpm
# Install dependencies
pnpm install
# Initial build
pnpm run build
# Start the package locally
pnpm start
```

</div>

# Contributors

We 💖 contributors! Feel free to contribute to this project

<a href="https://github.com/t3-oss/create-t3-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=t3-oss/create-t3-app" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

<p align="center">
  <a rel="noopener noreferrer" target="_blank" href="https://vercel.com/?utm_source=t3-oss&utm_campaign=osss">
    <img height="34px" src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Powered by vercel">
  </a>
</p>

[downloads-image]: https://img.shields.io/npm/dm/create-t3-app?color=364fc7&logoColor=364fc7

[npm-url]: https://www.npmjs.com/package/create-t3-app
[npm-image]: https://img.shields.io/npm/v/create-t3-app?color=0b7285&logoColor=0b7285

[contribute-url]: https://github.com/t3-oss/create-t3-app/blob/main/CONTRIBUTING.md
[contribute-image]: https://img.shields.io/badge/PRs-welcome-blue.svg

