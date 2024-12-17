---
title: NextAuth.js
description: Использование NextAuth.js
layout: ../../../layouts/docs.astro
lang: ru
---

Когда вы хотите иметь систему аутентификации в вашем приложении Next.js, NextAuth.js - отличное решение, чтобы не заморачиваться с реализацией сложной безопасности самостоятельно. Он имеет обширный список провайдеров для быстрого добавления аутентификации OAuth и предоставляет адаптеры для многих баз данных и ORM.

## Провайдер контекста

В точке входа вашего приложения вы увидите, что ваше приложение обернуто в [SessionProvider](https://next-auth.js.org/getting-started/client#sessionprovider):

```tsx:pages/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

Этот провайдер контекста позволяет вашему приложению получить доступ к данным сессии из любого места вашего приложения, не передавая их как пропсы:

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

## Получение сессии на сервере

Иногда вам может понадобиться запросить сессию на сервере. Чтобы сделать это, предварительно получите сессию с помощью функции-помощника `getServerAuthSession`, которую предоставляет `create-t3-app`, и передайте ее на клиент с помощью `getServerSideProps`:

```tsx:pages/users/[id].tsx
import { getServerAuthSession } from "../server/auth";
import { type GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

const User = () => {
  const { data: session } = useSession();
  // NOTE: `session` wont have a loading state since it's already prefetched on the server

  ...
}
```

## Включение `user.id` в сессию

`create-t3-app` настроен для использования [session callback](https://next-auth.js.org/configuration/callbacks#session-callback) в конфигурации NextAuth.js для включения ID пользователя в объект `session`.

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

Это связано с файлом объявления типов, чтобы убедиться, что `user.id` типизирован при доступе к объекту `session`. Подробнее о [`Module Augmentation`](https://next-auth.js.org/getting-started/typescript#module-augmentation) в документации NextAuth.js.

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

Такой же шаблон может быть использован для добавления любых других данных в объект `session`, например, поля `role`, но **не следует злоупотреблять для хранения конфиденциальных данных** на клиенте.

## Использование с tRPC

При использовании NextAuth.js с tRPC вы можете создавать повторно используемые, защищенные процедуры с помощью [middleware](https://trpc.io/docs/v10/middlewares). Это позволяет вам создавать процедуры, которые могут быть доступны только аутентифицированным пользователям. `create-t3-app` настраивает все это для вас, позволяя вам легко получать доступ к объекту сессии в аутентифицированных процедурах.

Это делается в два шага:

1. Возьмите сессию из заголовков запроса с помощью функции [`getServerSession`](https://next-auth.js.org/configuration/nextjs#getServerSession). Преимущество использования `getServerSession` вместо обычного `getSession` заключается в том, что это server-side функция и она не вызывает ненужных вызовов fetch. `create-t3-app` создает вспомогательную функцию, которая абстрагирует этот особый API.

```ts:server/auth.ts
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await getServerSession(ctx.req, ctx.res, authOptions);
};
```

Используя эту вспомогательную функцию, мы можем получить сессию и передать ее в контекст tRPC:

```ts:server/api/trpc.ts
import { getServerAuthSession } from "../auth";

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({
    session,
  });
};
```

2. Создайте tRPC middleware, которое проверяет, аутентифицирован ли пользователь. Затем мы используем middleware в `protectedProcedure`. Любой вызывающий эти процедуры должен быть аутентифицирован, иначе будет сгенерирована ошибка, которую можно правильно обработать на стороне клиента.

```ts:server/api/trpc.ts
export const protectedProcedure = t.procedure.use(({ ctx, next }) =>  {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
})
```

Обект сессии - это легкое, минимальное представление пользователя и содержит только несколько полей. При использовании `protectedProcedures` у вас есть доступ к идентификатору пользователя, который можно использовать для получения большего количества данных из базы данных.

```ts:server/api/routers/user.ts
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

## Использование с Prisma

Чтобы заставить NextAuth.js и Prisma работать вместе, необходимо большое количество [начальной настройки](https://authjs.dev/reference/adapter/prisma/). `create-t3-app` выполняет все это для вас, и если вы выберете одновременно и Prisma, и NextAuth.js, вы получите полностью работающую систему аутентификации со всеми предварительно настроенными, необходимыми моделями. Мы предоставляем вашему сгенерированому приложению предварительно настроеный провайдер Discord OAuth, который мы выбрали потому, с ним легче всего начать - просто укажите свои токены в `.env` и вы готовы к работе. Однако вы можете легко добавить больше провайдеров, следуя [докуменетации NextAuth.js](https://next-auth.js.org/providers/). Обратите внимание, что некоторые провайдеры требуют дополнительных полей для добавления в определенные модели. Мы рекомендуем вам прочитать документацию для провайдера, который вы хотите использовать, чтобы убедиться, что у вас есть все необходимые поля.

### Добавление новых полей в ваши модели

Когда вы добавляете новые поля в любую из моделей `User`, `Account`, `Session` или `VerificationToken` (в большинстве случаев вам потребуется только изменить модель `User`), вам нужно иметь в виду, что [адаптер Prisma](https://next-auth.js.org/adapters/prisma) автоматически создает поля в этих моделях при регистрации новых пользователей и входе в систему. Поэтому, добавляя новые поля в эти модели, вы должны предоставить значения по умолчанию для них, поскольку адаптер не знает о них.

Если например, вы хотите добавить `role` в модель `User`, вам нужно будет предоставить значение по умолчанию для поля `role`. Это делается путем добавления значения `@default` к полю `role` в модели `User`:

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

## Использование с Next.js middleware

Использование NextAuth.js с Next.js middleware [требует использования стратегии сеанса JWT](https://next-auth.js.org/configuration/nextjs#caveats) для аутентификации. Это связано с тем, что middleware может получить доступ к сессионной cookie только в том случае, если это JWT. По умолчанию, `create-t3-app` настроен на использование **default** стратегии базы данных, в сочетании с Prisma в качестве адаптера базы данных.

## Настраиваем DiscordProvider по умолчанию

1. Перейдите в [раздел Applications в Discord Developer Portal](https://discord.com/developers/applications), и нажмите на "New Application"
2. В меню настроек перейдите к "OAuth2 => General"

- Скопируйте Client ID и вставьте его в `AUTH_DISCORD_ID` в `.env`.
- Возле Client Secret нажмите "Reset Secret" и скопируйте эту строку в `AUTH_DISCORD_SECRET` в `.env`. Будьте осторожны, поскольку вы больше не сможете увидеть этот секрет, и сброс его приведет к тому, что существующий истечет.
- Нажмите "Add Redirect" и вставьте `<app url>/api/auth/callback/discord` (пример для локальной разработки: <code class="break-all">http://localhost:3000/api/auth/callback/discord</code>)
- Сохраните изменения
- Возможно, но не рекомендуется, использовать одно и то же приложение Discord для разработки и продакшена. Вы также можете рассмотреть [Mocking the Provider](https://github.com/trpc/trpc/blob/next/examples/next-prisma-starter-websockets/src/pages/api/auth/%5B...nextauth%5D.ts) во время разработки.

## Полезные ресурсы

| Ресурс                            | Ссылка                                  |
| --------------------------------- | --------------------------------------- |
| Документация NextAuth.js          | https://next-auth.js.org/               |
| NextAuth.js GitHub                | https://github.com/nextauthjs/next-auth |
| tRPC Kitchen Sink - with NextAuth | https://kitchen-sink.trpc.io/next-auth  |
