---
title: NextAuth.js
description: Usage of NextAuth.js
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---


عندما تريد نظام مصادقة في تطبيق Next.js الخاص بك ، فإن NextAuth.js يعد حلاً ممتازًا دون الحاجة إلى إنشاءه بنفسك. يأتي مزودًا بقائمة واسعة من الموفرين لإضافة مصادقة OAuth بسرعة ويوفر Adapters للعديد من قواعد البيانات و ORMs.


## Context Provider
في نقطة دخول تطبيقك ، سترى أن تطبيقك في SessionProvider:

```tsx:pages/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```
يسمح الـ context Provider لـ تطبيقك ان يصل الي بيانات المستخدم دون الحاجة الي ادخال اي بينات اضافة

```tsx:pages/users/[id].tsx
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (!session) {
    // Handle unauthenticated state, e.g. render a SignIn component
    return <SignIn />;
  }

  return <p>Welcome {session.user.name}!</p>;
};
```

## Inclusion of `user.id` on the Session

يستخدم `create-t3-app` الـ Session callback الموجودة في ملف تكوين NextAuth.js ليضيف الـ User ID الي Session Object.

```ts:pages/api/auth/[...nextauth].ts
callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
```

```ts:types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
```
بنفس الطريقة يمكن اضافة اي بيانات الي الـ Session Object

## Usage with tRPC
عند استخدام NextAuth.js مع tRPC، يمكنك إنشاء producers وحمايتها باستخدام Middleware، وهذا يسمح لك بإنشاء procedures لا يمكن الوصول لها الا بواسطه اشخاص معينين
This is done in a two step process:

1. للحصول علي Object الـ Session يمكنك استخدام unstable_getserversession، لا تقلق فهي امنه unstable تعني انها يمكن ان تتغير في المستقبل.
نفضل unstable_getserversession عن getSession لانها تعمل علي الخام فلا يحدث invoke غير مرغوب    فيه ، قد تحملت `create-t3-app` عناء انشاء هذة الادة عنك : 

```ts:server/common/get-server-auth-session.ts
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
```
باستخدام هذة الاداة يمكنك الحصول علي الـ Session وتمريرها الي الـ tRPC Contxt

```ts:server/trpc/context.ts
import { getServerAuthSession } from "../common/get-server-auth-session";

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({
    session,
  });
};
```
2. أنشئ tRPC Middleware وتأكد ما اذا كان هذا المستخدم يمتلك الصلاحيات اللازمة ام لا.

```ts:server/trpc/trpc.ts
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
```
الـ Session Object صغير يحتوي علي عدد قليل من الخانات، وعند استخدامك لـ `protectedProcedures`يمنك الوصول الي هذة البيانات منها الـ UserId وعندها يمكنك عمل fetch لبيانات اخري من قاعدة البيانات.

```ts:server/trpc/router/user.ts
const userRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
});
```

## Usage with Prisma
## الاستخدام مع Prisma
يتطلب إستخدام NextAuth.js للعمل مع Prisma الكثير من الإعداد الأولي. يتعامل تطبيق create-t3-app مع كل هذا من أجلك ، وإذا حددت كل من Prisma و NextAuth.js ، فستحصل على نظام مصادقة يعمل بكامل طاقته مع جميع النماذج المطلوبة التي تم تكوينها مسبقًا. نقوم بشحن تطبيقك الاولي مع مزود Discord OAuth المكون مسبقًا ، والذي اخترناه لأنه من أسهل البدء معة - ما عليك سوى توفير الرموز المميزة في .env وستكون جاهزًا للبدء. ومع ذلك ، يمكنك بسهولة إضافة المزيد من مقدمي الخدمة باتباع NextAuth.js Docs. لاحظ أن بعض مقدمي الخدمة يطلبون إضافة حقول إضافية إلى نماذج معينة. نوصيك بقراءة الـ Docs الخاصة بالموفر الذي ترغب في استخدامه للتأكد من أن لديك جميع الحقول المطلوبة.

### Adding new fields to your models
### إضافة المزيد من الحقول الي الـ models 
عند الحاجة الي إضافة حقول إضافية الي `User` أو `Account` أو `Session` -علي اغلب الظن انك لن تحتاج الي تعديل شئ غير `User` اَ بق في بالك أنPrisma Adapter سيشئ هذا الحقل تلقائيا مع كل مستخدم جديد لذ عليك أن ت ضيف قيمة افتراضية Default Value.

```diff:prisma/schema.prisma
+ enum Role {
+   USER
+   ADMIN
+ }

  model User {
    ...
+   role Role @default(USER)
  }
```

## Usage with Next.js middleware

Usage of NextAuth.js with Next.js middleware [requires the use of the JWT session strategy](https://next-auth.js.org/configuration/nextjs#caveats) for authentication. This is because the middleware is only able to access the session cookie if it is a JWT. By default, `create-t3-app` is configured to use the **default** database strategy, in combination with Prisma as the database adapter.

## Setting up the default DiscordProvider

1. Head to [the Applications section in the Discord Developer Portal](https://discord.com/developers/applications), and click on "New Application"
2. In the settings menu, go to "OAuth2 => General"

- Copy the Client ID and paste it in `DISCORD_CLIENT_ID` in `.env`.
- Under Client Secret, click "Reset Secret" and copy that string to `DISCORD_CLIENT_SECRET` in `.env`. Be careful as you won't be able to see this secret again, and resetting it will cause the existing one to expire.
- Click "Add Redirect" and paste in `<app url>/api/auth/callback/discord` (example for local development: <code class="break-all">http://localhost:3000/api/auth/callback/discord</code>)
- Save your changes
- It is possible, but not recommended, to use the same Discord Application for both development and production. You could also consider [Mocking the Provider](https://github.com/trpc/trpc/blob/next/examples/next-prisma-starter-websockets/src/pages/api/auth/%5B...nextauth%5D.ts) during development.

## Useful Resources

| Resource                          | Link                                    |
| --------------------------------- | --------------------------------------- |
| NextAuth.js Docs                  | https://next-auth.js.org/               |
| NextAuth.js GitHub                | https://github.com/nextauthjs/next-auth |
| tRPC Kitchen Sink - with NextAuth | https://kitchen-sink.trpc.io/next-auth  |
