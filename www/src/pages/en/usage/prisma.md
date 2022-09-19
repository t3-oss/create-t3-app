---
title: Prisma
description: Usage of Prisma
layout: ../../../layouts/docs.astro
---

Prisma is an ORM for Typescript, that allows you to define your database schema and models in a `schema.prisma` file, and then generate a type-safe client that can be used to interact with your database from your backend.

## Prisma Client

Located at `/server/db/client.ts`, the Prisma Client is instantiated as a global variable (as recommended as [best practice](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) by the team at Prisma) and exported to be used in your API routes.

## Schema

You will find the Prisma schema file at `/prisma/schema.prisma`. This file is where you define your database schema and models, and is used when generating the Prisma Client.

### With NextAuth.js

When you select NextAuth.js in combination with Prisma, the schema file is generated and set up for you with the recommended values for the `User`, `Session`, `Account` and `VerificationToken` models, as per the [NextAuth.js documentation](https://next-auth.js.org/adapters/prisma).

## Default Database

The default database is a SQLite database, which is great for development and quickly spinning up a proof-of-concept, but not recommended for production. You can change the database to use by changing the `provider` in the `datasource` block to either `postgresql` or `mysql`, and then updating the connection string within environment variables to point to your database.

## Useful Resources

| Resource                     | Link                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prisma Docs                  | https://www.prisma.io/docs/                                                                                                                       |
| Prisma Github                | https://github.com/prisma/prisma                                                                                                                  |
| NextAuth.JS Prisma Adapter   | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Planetscale Connection Guide | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
