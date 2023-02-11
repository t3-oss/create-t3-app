---
title: NextAuth.js
description: إستخدام  NextAuth.js
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---

عندما تُريد نِظام مُصادقة في تَطبيق Next.js ، فإن NextAuth.js يُعد حلاً ممتازًا دون الحاجة إلى إنشائة بنفسك. يأتي مزودًا بقائمة واسعة من الموفرين لإضافة مصادقة OAuth بسرعة ويوفر Adapters للعديد من قواعد البيانات و ORMs.

## Context Provider

في نقطة الدُخول إلي تطبيقك ، سترى أن تطبيقك في [SessionProvider](https://next-auth.js.org/getting-started/client#sessionprovider):

```tsx:pages/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

يسمح الـ context Provider لـ تطبيقك ان يصل إلى بيانات المستخدم دون الحاجة الى ادخال اي بيانات اضافيه

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

## تضمين `user.id` في الـ Session

يُستخدم `create-t3-app` الـ Session callback الموجودة في ملف تكوين NextAuth.js ليضيف الـ User ID الي Session Object.

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

بنفس الطريقة يمكن اضافة اي بيانات الى الـ Session Object

## Usage with tRPC

عند استخدام NextAuth.js مع tRPC، يمكنك إنشاء producers وحمايتها باستخدام [middleware](https://trpc.io/docs/v10/middlewares)، وهذا يسمح لك بإنشاء procedures لا يمكن الوصول لها إلا بواسطة أشخاص معينين

يُمكن فَعل هذا في خطوتين:

1. للحصول علي Object الـ Session يمكنك استخدام getServerSession،
   نفضل getServerSession عن getSession لانها تعمل علي الخام فلا يحدث invoke غير مرغوب فيه ، قد تحملت `create-t3-app` عناء إنشاء هذه المادة عنك :

```ts:server/common/get-server-auth-session.ts
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
```

باستخدام هذه الاداة يمكنك الحصول علي الـ Session وتمريرها إلى الـ tRPC Context

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

2. أنشئ tRPC Middleware وتأكد ما اذا كان هذا المستخدم يملك الصلاحيات اللازمة أم لا.

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

الـ Session Object صغير ويحتوي علي عدد قليل من الخانات، وعند استخدامك لـ `protectedProcedures`يمكنك الوصول الى هذة البيانات منها الـ UserId وعندها يمكنك عمل fetch لبيانات اخرى من قاعدة البيانات.

```ts:server/trpc/router/user.ts
const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
});
```

## الاستخدام مع Prisma

يتطلب إستخدام NextAuth.js للعمل مع Prisma الكثير من الإعداد الأولي. يتعامل تطبيق create-t3-app مع كل هذا من أجلك ، وإذا حددت كل من Prisma و NextAuth.js ، فستحصل على نظام مصادقة يعمل بكامل طاقته مع جميع النماذج المطلوبة التي تم تكوينها مسبقًا. نقوم بشحن تطبيقك الاولي مع مزود Discord OAuth المكون مسبقًا ، والذي اخترناه لأنه من أسهل البدء معة - ما عليك سوى توفير الرموز المميزة في .env وستكون جاهزًا للبدء. ومع ذلك ، يمكنك بسهولة إضافة المزيد من مقدمي الخدمة باتباع NextAuth.js Docs. لاحظ أن بعض مقدمي الخدمة يطلبون إضافة حقول إضافية إلى نماذج معينة. نوصيك بقراءة الـ Docs الخاصة بالموفر الذي ترغب في استخدامه للتأكد من أن لديك جميع الحقول المطلوبة.

### إضافة المزيد من الحقول إلى الـ models

عند الحاجة إلى إضافة حقول إضافية الي `User` أو `Account` أو `Session` -على اغلب الظن انك لن تحتاج الى تعديل شئ غير `User` اَ بق في بالك أن Prisma Adapter سينشئ هذا الحقل تلقائيا مع كل مستخدم جديد لذا عليك أن تضيف قيمة افتراضية Default Value.

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

## الاستخدام مع Next.js Middleware.

يتطلب استخدام NextAuth.js مع Middleware Next.js استخدام [JWT Session Strategy](https://next-auth.js.org/configuration/nextjs#caveats). هذا لأن الـ Middleware قادرة فقط على الوصول إلى ملف تعريف ارتباط JWT

بشكل افتراضي ، يتم تكوين التطبيق create-t3-app لاستخدام استراتيجية قاعدة البيانات Database Strategy ، بالاشتراك مع Prisma كـ Adapter لـ قاعدة البيانات.

## إعداد DiscordProvider

1. اتجه الى [the Applications section in the Discord Developer Portal](https://discord.com/developers/applications) واضغط على New Application.

2. في settings menu اضغط على OAuth2 ثم General

3. إنسخ الـ Client ID وضعة في `.env` كـ DISCORD_CLIENT_ID

4. تحت Client Secret اضغط على "Reset Secret" ونسخ النص الجديد وضعه في `.env` كـ `DISCORD_CLIENT_SECRET `.
   كن حذرًا لأنك لن تتمكن من رؤية هذا كلمة السر مرة أخرى ، ستؤدي إعادة تعيينها إلى انتهاء صلاحية كلمة السر الحالية
5. اضغط على Add Redirect واضف رابط إعادة التوجيه`http://localhost:3000/api/auth/callback/discord` كمثال
6. احفظ التعديلات

- It is possible, but not recommended, to use the same Discord Application for both development and production. You could also consider [Mocking the Provider](https://github.com/trpc/trpc/blob/next/examples/next-prisma-starter-websockets/src/pages/api/auth/%5B...nextauth%5D.ts) during development.

## مصادر مُفيدة

| المَصدر                           | الرابط                                  |
| --------------------------------- | --------------------------------------- |
| NextAuth.js Docs                  | https://next-auth.js.org/               |
| NextAuth.js GitHub                | https://github.com/nextauthjs/next-auth |
| tRPC Kitchen Sink - with NextAuth | https://kitchen-sink.trpc.io/next-auth  |
