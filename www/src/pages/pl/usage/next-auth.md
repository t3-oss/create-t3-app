---
title: NextAuth.js
description: Korzystanie z NextAuth.js
layout: ../../../layouts/docs.astro
lang: pl
---

Kiedy chcesz dodać system kont do swojej aplikacji Next.js, NextAuth.js to znakomite rozwiązanie. Pozwala ono wdrożyć złożone systemy bezpieczeństwa nie zmuszając Cię przy tym do pisania ich własnoręcznie. NextAuth.js zawiera rozległą listę providerów, które zapewnią Ci szybki sposób na dodanie OAutha. Paczka ta posiada również wiele adapterów dla baz danych i ORMów.

## Context Provider

W pliku `pages/_app.tsx` zobaczyć możesz, iż twoja aplikacja znajduje się w [SessionProviderze](https://next-auth.js.org/getting-started/client#sessionprovider):

```tsx:pages/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

Ten oto provider kontekstu pozwala twojej aplikacji na dostęp do danych sesji z każdego miejsca, bez potrzeby przesyłania ich po "propsach":

```tsx:pages/users/[id].tsx
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (!session) {
    // Obsłuż status nie bycia zalogowanym, np. wyświetl komponent `SignIn`
    return <SignIn />;
  }

  return <p>Welcome {session.user.name}!</p>;
};
```

## Otrzymywanie sesji po stronie serwera

Czasem możesz chcieć otrzymać sesję na serwerze. Aby to zrobić, pobierz sesję korzystając z funkcji pomocniczej `getServerAuthSession` dostarczanej przez Create T3 App a następnie prześlij ją do klienta korzystając z `getServerSideProps`:

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
  // UWAGA: obiekt `session` nie będzie miał stanu ładowania, ponieważ jest już pobrany na serwerze
  ...
}
```

## Dołączanie `user.id` do sesji

Create T3 App jest skonfigurowany tak, aby wykorzystać [callback `session`](https://next-auth.js.org/configuration/callbacks#session-callback) w konfiguracji NextAuth.js do dodania ID użytkownika do obiektu `session`.

```ts:server/auth.ts
callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
```

Łączy się to z plikiem deklaracji typów, aby zapewnić odpowiednie typy obiektu `session` - musi on zawierać powyższe pole `user.id`. Więcej o zmianie typów poczytać możesz w rozdziale [`Module Augmentation`](https://next-auth.js.org/getting-started/typescript#module-augmentation) dokumentacji NextAuth.js.

```ts:server/auth.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
```

Ten sam sposób wykorzystany może zostać do dodania większej ilości danych na obiekcie `session`, takich jak pole `role` (rola). **Nie powinien być on jednak wykorzystany do zapisywania wrażliwych danych** dla klienta.

## Korzystanie wraz z tRPC

Jeżeli używasz NextAuth.js oraz tRPC, stworzyć można zabezpieczone procedury (z możliwością wielokrotnego użycia) korzystając z [middleware'ów](https://trpc.io/docs/v10/middlewares). Pozwala to na umieszczenie procedur, które zainicjowane być mogą jedynie przez autoryzowanych użytkowników. `create-t3-app` wszystko to dla Ciebie konfiguruje, dając ci możliwość łatwego dostępu do obiektu sesji wśród autoryzowanych procedur.

Konfiguracja ta zachodzi w dwóch krokach:

1. Pobierz sesję z headerów zapytania korzystając z funkcji [`getServerSession`](https://next-auth.js.org/configuration/nextjs#getServerSession). Zaletą korzystania z `getServerSession` zamiast `getSession` jest fakt, iż jest to funkcja wywoływana jedynie po stronie serwera i nie inicjuje ona żadnych niepotrzebnych zapytań. `create-t3-app` tworzy funkcję pomocniczą, która ułatwia korzystanie z `getServerSession` - nie musisz więc importować zarówno opcji NextAuth.js jak i funkcji `getServerSession` za każdym razem, kiedy chcesz otrzymać sesję.

```ts:server/auth.ts
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
```

Korzystając z tej funkcji pomocniczej, możemy otrzymać sesję i przesłać ją do kontekstu tRPC:

```ts:server/api/trpc.ts
import { getServerAuthSession } from "../common/get-server-auth-session";

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({
    session,
  });
};
```

2. Stwórz middleware tRPC, który sprawdza, czy użytkownik jest autoryzowany. Wykorzystamy następnie stworzony middleware w `protectedProcedure` - specjalnej, zabezpieczonej procedurze. Każda osoba wywołująca ją będzie musiała spełniać warunki autoryzacji - w przeciwnym razie wystąpi błąd, który w odpowiedni sposób będzie mógł zostać obsłużony po stronie klienta.

```ts:server/api/trpc.ts
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // inferer `session` som ikke-nullbar
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
}));
```

Obiekt `session` to minimalna i lekka reprezentacja użytkownika zawierająca jedynie parę pól. Jeśli korzystasz z procedur `protectedProcedure`, masz dostęp do ID użytkownika, które może zostać wykorzystane do pobrania większej ilości danych z bazy.

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

## Korzystanie wraz z Prismą

Przygotowanie NextAuth.js do pracy z Prismą wymaga wiele [wstępnej konfiguracji](https://authjs.dev/reference/adapter/prisma/). `create-t3-app` zajmuje się nią za Ciebie, a jeśli wybierzesz zarówno Prismę i NextAuth.js, otrzymasz w pełni działający system uwierzytelniania, wraz z wszystkimi potrzebnymi modelami bazy danych. Szablon aplikacji, który dostarczamy, zawiera domyślnie provider OAuth Discorda, który wybraliśmy z powodu bycia jednym z łatwiejszych do obsługiwania - jedyne, co musiz zrobić, to podać tokeny w pliku `.env`... i gotowe! Jeżeli jednak chcesz skorzystać z czegoś innego, możesz w łatwy sposób dołączyć inne providery opierając się na [dokumentacji NextAuth.js](https://next-auth.js.org/providers/). Uwaga - niektóre z providerów wymagają większej ilości pól na modelach w bazie danych. Polecamy Ci przeczytać dokumentację providera, z którego chciałbyś skorzystać aby upewnić się, iż posiadasz wszystko, czego potrzebujesz.

### Dodawanie nowych pól do modeli

Kiedy dodajesz nowe pola do któregokolwiek z modeli - `User`, `Account`, `Session` lub `VerificationToken` (prawdopodobnie będziesz chciał zmieniać jedynie model `User`) - pamiętać musisz, iż [adapter dla Prismy](https://next-auth.js.org/adapters/prisma) automatycznie tworzy pola na powyższych modelach w przypadku rejestracji kont i logowania na nie. Z tego też powodu, dodając nowe pola do tychże modeli, zaopatrzyć musisz je w wartości domyślne - adapter nie jest ich świadomy.

Jeżeli przykładowo chcesz dodać pole `role` (roli) do modelu `User` (użytkownika), musisz pamiętać o dołączeniu wartości domyślnej tego pola. Zrobisz to za pomocą wartości `@default` w modelu `User`:

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

## Korzystanie wraz z middlewarem Next.js

Wykorzystanie middleware'a Next.js [wymaga od Ciebie skorzystania ze strategii JWT](https://next-auth.js.org/configuration/nextjs#caveats) do autoryzacji. Dzieje się tak, ponieważ middleware jest w stanie pobierać ciasteczko sesji jedynie, gdy jest ono JWT. Create T3 App jest skonfigurowany tak, by wykorzystać **domyślną** strategię bazy danych, wraz z Prismą jako jej adapterem.

## Konfigurowanie domyślnego providera Discord (`DiscordProvider`)

1. Przejdź do [sekcji Aplikacje w Panelu Discord Developer Portal](https://discord.com/developers/applications), a następnie kliknij na "New Application"
2. W menu ustawień, przejdź do "OAuth2 => General"

- Skopiuj Client ID i wklej go do pliku `.env` pod kluczem `DISCORD_CLIENT_ID`.
- Pod Client Secret, kliknij "Reset Secret" i skopiuj podany tekst do pliku `.env` pod kluczem `DISCORD_CLIENT_SECRET`. Uważaj - nie będziesz mógł ponownie zobaczyć tego klucza, a jego reset spowoduje wygaśnięcie aktualnego.
- Dodaj "Add Redirect" i wklej tam `<app url>/api/auth/callback/discord` (przykładowo dla lokalnej aplikacji: <code class="break-all">http://localhost:3000/api/auth/callback/discord</code>)
- Zapisz zmiany
- Jest możliwość (nie jest ona jednak polecana), aby wykorzystać tą samą aplikację Discorda dla zarówno aplikacji lokalnej i tej w wersji produkcyjnej. Możesz także wykorzystać [mockowanie providera](https://github.com/trpc/trpc/blob/next/examples/next-prisma-starter-websockets/src/pages/api/auth/%5B...nextauth%5D.ts) podczas rozwoju aplikacji.

## Przydatne Zasoby

| Zasób                               | Link                                    |
| ----------------------------------- | --------------------------------------- |
| Dokumentacja NextAuth.js            | https://next-auth.js.org/               |
| GitHub NextAuth.js                  | https://github.com/nextauthjs/next-auth |
| tRPC Kitchen Sink - wraz z NextAuth | https://kitchen-sink.trpc.io/next-auth  |
