<h1 align="center"> create-t3-app </h1>
<div align="center">

Interactive CLI to quickly set up a project using the [t3 stack](https://init.tips)

<img src="https://s6.imgcdn.dev/BJW4B.png" width="130" style="border-radius:40%"/>

</div>  
<div align="center">
<br/>

![PRs-Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)
![Version](https://img.shields.io/npm/v/create-t3-app?color=0b7285&logoColor=0b7285)
![Downloads](https://img.shields.io/npm/dm/create-t3-app?color=364fc7&logoColor=364fc7)

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
- [TailwindCSS](https://tailwindcss.com)
- [TypeScript](https://typescriptlang.org)
- [Prisma](https://prisma.io)
- [Next-Auth](https://next-auth.js.org)

If you're looking for more info about this stack (state management solutions, deployment recommendations, etc) - check out [init.tips](https://init.tips/other)

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

<a href="https://github.com/nexxeln/create-t3-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nexxeln/create-t3-app" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

<p align="center">
  <a rel="noopener noreferrer" target="_blank" href="https://vercel.com/?utm_source=t3-oss&utm_campaign=osss">
    <img height="34px" src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Powered by vercel">
  </a>
</p>
