---
title: Environment Variables
description: Getting started with create-t3-app
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---

إن `Create-T3-App` تستخدم [Zod](https://github.com/colinhacks/zod) للتأكد من صلاحية الـ environment variablesأثناء الـ runtime عن طريق توفير بعض الملفات الاضافة

📁 src/env

┣ 📄 client.mjs

┣ 📄 schema.mjs

┣ 📄 server.mjs


قد يبدو محتوى هذه الملفات مخيفًا للوهلة الأولى ، لكن لا تقلق ، فهو ليس معقدًا كما يبدو. دعنا نلقي نظرة عليها واحدة تلو الأخرى ، ونسير خلال عملية إضافة environment variables إضافية.

إذا كنت تريد إضافةenvironment variable جديد ، فيجب عليك إضافته إلى كل من ".env" وكذلك في `env / schema.mjs`.\_

## ملف schema.mjs

هذا هو الملف الذي سوف تلمسه بالفعل. يحتوي على مُخططين ، أحدهماenvironment variables من جانب الخادم والآخر من جانب العميل بالإضافة إلى Object الـ "clientEnv".

```ts:env/schema.mjs
export const serverSchema = z.object({
  // DATABASE_URL: z.string().url(),
});

export const clientSchema = z.object({
  // NEXT_PUBLIC_WS_KEY: z.string(),
});

export const clientEnv = {
  // NEXT_PUBLIC_WS_KEY: process.env.NEXT_PUBLIC_WS_KEY,
};
```

### الـ Server Schema

حدد environment variables schema من جانب الخادم هنا.
تأكد أن لا تضيف `NEXT_PUBLIC` قبل إسم المتتغير، الـ Validation سيفشل أذا ما فعلت هذا.


### الـ Client Schema
حدد الـ client-side environment variables هنا، حتي تجعلهم متاحيت للـ client أضف `NEXT_PUBLIC` قبل الاسم.


### الـ clientEnv Object

Destruct the `process.env` here.

We need a JavaScript object that we can parse our Zod-schemas with and due to the way Next.js handles environment variables, you can't destruct `process.env` like a regular object, so we need to do it manually.

TypeScript will help you make sure that you have entered the keys in both `clientEnv` as well as `clientSchema`.

```ts
// ❌ This doesn't work, we need to destruct it manually
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const validated = schema.parse(process.env);
```

## server.mjs & client.mjs

This is where the validation happens and exports the validated objects. You shouldn't need to modify these files.

## Using Environment Variables

When you want to use your environment variables, you can import them from `env/client.mjs` or `env/server.mjs` depending on where you want to use them:

```ts:pages/api/hello.ts
import { env } from "../../env/server.mjs";

// `env` is fully typesafe and provides autocompletion
const dbUrl = env.DATABASE_URL;
```

## .env.example

Since the default `.env` file is not committed to version control, we have also included a `.env.example` file, in which you can optionally keep a copy of your `.env` file with any secrets removed. This is not required, but we recommend keeping the example up to date to make it as easy as possible for contributors to get started with their environment.

## Adding Environment Variables

To ensure your build never completes without the environment variables the project needs, you will need to add new environment variables in **two** locations:

📄 `.env`: Enter your environment variable like you would normally do in a `.env` file, i.e. `KEY=VALUE`

📄 `schema.mjs`: Add the appropriate validation logic for the environment variable by defining a Zod schema, e.g. `KEY: z.string()`

Optionally, you can also keep `.env.example` updated:

📄 `.env.example`: Enter your environment variable, but be sure to not include the value if it is secret, i.e. `KEY=VALUE` or `KEY=`

### Example

_I want to add my Twitter API Token as a server-side environment variable_

1. Add the environment variable to `.env`:

```
TWITTER_API_TOKEN=1234567890
```

2. Add the environment variable to `schema.mjs`:

```ts
export const serverSchema = z.object({
  // ...
  TWITTER_API_TOKEN: z.string(),
});
```

_**NOTE:** An empty string is still a string, so `z.string()` will accept an empty string as a valid value. If you want to make sure that the environment variable is not empty, you can use `z.string().min(1)`._

3. optional: Add the environment variable to `.env.example`, but don't include the token

```
TWITTER_API_TOKEN=
```
