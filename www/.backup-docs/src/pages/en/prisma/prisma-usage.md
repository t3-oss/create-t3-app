---
title: Prisma Usage
description: Getting started with create-t3-app
layout: ../../../layouts/MainLayout.astro
---

Prisma is an [open source](https://github.com/prisma/prisma) next-generation ORM. It consists of the following parts:

- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client): Auto-generated and type-safe query builder for Node.js & TypeScript
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate): Migration tool to easily evolve your database schema from prototyping to production
- [Prisma Studio](https://www.prisma.io/docs/concepts/components/prisma-studio): GUI to view and edit data in your database

## Getting Started

`create-t3-app` includes a few defaults to get your app up and running as quick as possible, one of those being a database.

When Prisma is selected during installation, by default, it will be configured to connect to a local sqlite database. This is configured in the `schema.prisma` file under, along with the `db.sqlite` file. The `DATABASE_URL` is configured in the `.env` file at the root of the project, and used in the `datasource db {...}` object. While this _works_, and is great for demo purposes, you will likely need a more persistent, capable database for your app to connect to.

## With NextAuth.js

When NextAuth.js is selected in addition to Prisma during installation, the `schema.prisma` file is setup with the necessary models required to use Prisma as an adaptor for NextAuth.js.

You can find more information about these models [here](https://next-auth.js.org/adapters/prisma).
