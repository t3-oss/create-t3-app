---
title: NextAuth.js
description: Usage of NextAuth
layout: ../../../layouts/docs.astro
---

## What is NextAuth.js?

For when you want an authentication system in your NextJS application, NextAuth.js is a perfect solution to bring in the complexity of security without the hassle of having to build it yourself. It comes with an extensive list of providers to quickly add OAuth authentication, as well as a database adapter system to allow you to use your own database of choice.

## Usage with tRPC

When using NextAuth in combination with tRPC when scaffolding with `create-t3-app`, the context provider is already set up for you. This allows tRPC to access the NextAuth session data to be able to use it in your API routes.

### Context Provider

Located at `server/router/context.ts`, the context provider is setup to recieve the `req` and `res` object from NextJS, to query if a current session exists and provide it to the tRPC context. This allows you to use the `session` object in your API routes to check if a user is authenticated in middleware.

### \_app.tsx

The entrypoint to your NextJS project, `_app.tsx` is where the context provider is imported to wrap the page being rendered:

```tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

### Session ID

`create-t3-app` is configured to utilise the `session` callback in the NextAuth config to include the user's ID within the `session` object.

```ts
callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
```

This is coupled with a types file located at `/types/next-auth.d.ts` to allow the `user.id` to be typed in the `session` object. Read more about [`Module Augmentation`](https://next-auth.js.org/getting-started/typescript#module-augmentation) on NextAuth.js's docs.

```ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
```

## Usage with Prisma

TODO: what we setup, how to add more fields to user and acc tables.

## Middleware

**Important Note**

Usage of NextAuth.js with NextJS middleware [requires the use of the JWT session strategy](https://next-auth.js.org/configuration/nextjs#caveats) for authentication. This is because the middleware is only able to access the session cookie if it is a JWT. By default, `create-t3-app` is configured to use the **default** database strategy, in combination with Prisma as the database adapter.

## Useful Resources

| Resource                          | Link                                    |
| --------------------------------- | --------------------------------------- |
| NextAuth Docs                     | https://next-auth.js.org/               |
| NextAuth Github                   | https://github.com/nextauthjs/next-auth |
| tRPC Kitchen Sink - with NextAuth | https://kitchen-sink.trpc.io/next-auth  |
