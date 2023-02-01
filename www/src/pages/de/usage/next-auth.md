---
title: NextAuth.js
description: Verwendung von NextAuth.js
layout: ../../../layouts/docs.astro
lang: de
---

Wenn du ein Authentifizierungssystem in deiner Next.js-Anwendung haben möchtest, ist NextAuth.js eine ausgezeichnete Lösung, um die Komplexität zu vermeiden, es selbst zu bauen. Es kommt mit einer umfangreichen Liste von Providern, um OAuth-Authentifizierung schnell hinzuzufügen und bietet Adapter für viele Datenbanken und ORMs.

## Context Provider

In dem Einstiegspunkt deiner Anwendung, wirst du sehen, dass deine Anwendung von einem [SessionProvider](https://next-auth.js.org/getting-started/client#sessionprovider) umschlossen wird.

```tsx:pages/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

Dieser Context-Provider ermöglicht es deiner Anwendung, auf die Daten der Session von überall in deiner Anwendung zuzugreifen, ohne sie als Props weitergeben zu müssen:

```tsx:pages/users/[id].tsx
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (!session) {
    // Behandlung des nicht authentifizierten Zustands, z. B. Rendern eines SignIn-Komponenten
    return <SignIn />;
  }

  return <p>Welcome {session.user.name}!</p>;
};
```

## Einfügen von `user.id` in die Session

`create-t3-app` ist so konfiguriert, dass es den [session callback](https://next-auth.js.org/configuration/callbacks#session-callback) in der NextAuth.js-Konfiguration verwendet, um die ID des Benutzers im `session`-Objekt einzufügen.

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

Dies ist mit einer Typdeklarationsdatei gekoppelt, um sicherzustellen, dass die `user.id` beim Zugriff auf das `session`-Objekt richtig getyped wird. Erfahre mehr über [`"Module Augmentation"`](https://next-auth.js.org/getting-started/typescript#module-augmentation) in den Dokumentationen von NextAuth.js.

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

Das gleiche Muster kann verwendet werden, um weitere Daten zum `session`-Objekt hinzuzufügen, wie z. B. ein `role`-Feld, aber dies **sollte nicht missbraucht werden, um sensible Daten auf dem Client zu speichern**.

## Verwendung mit tRPC

Wenn du NextAuth.js mit tRPC verwendest, kannst du wiederverwendbare, geschützte Prozeduren mit [Middlewares](https://trpc.io/docs/v10/middlewares) erstellen. Dies ermöglicht es dir, Prozeduren zu erstellen, die nur von authentifizierten Benutzern zugänglich sind. `create-t3-app` stellt dir dies bereits zur Verfügung, so dass du problemlos auf das Session-Objekt innerhalb von authentifizierten Prozeduren zugreifen kannst.

Dies geschieht in zwei Schritten:

1. Greife auf die Session aus den Request-Headern zu, indem du die [`unstable_getServerSession`](https://next-auth.js.org/configuration/nextjs#unstable_getserversession)-Funktion verwendest. Mach dir keine Sorgen, diese Funktion lässt sich problemlos verwenden - der Name enthält nur `unstable`, weil die API-Implementierung in Zukunft möglicherweise geändert werden kann. Der Vorteil von `unstable_getServerSession` im Vergleich zu `getSession` ist, dass es eine serverseitige Funktion ist und unnötige Fetch-Aufrufe nicht ausgelöst werden. `create-t3-app` erstellt eine Hilfsfunktion, die diese eigenartige API abstrahiert.

```ts:server/common/get-server-auth-session.ts
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
```

Mit dieser Hilfsfunktion können wir die Session abgreifen und sie an den tRPC-Kontext übergeben:

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

2. Erstelle eine tRPC-Middleware, die überprüft, ob der Benutzer authentifiziert ist. Wir verwenden dann die Middleware in einer `protectedProcedure`. Jeder Aufrufer dieser Prozeduren muss authentifiziert sein, ansonsten wird eine Fehlermeldung geworfen, die vom Client entsprechend behandelt werden kann.

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

Das `session`-Objekt ist eine minimale Darstellung des Benutzers und enthält nur wenige Felder. Wenn du die `protectedProcedures` verwendest, hast du Zugriff auf die ID des Benutzers, die verwendet werden kann, um weitere Daten aus der Datenbank abzurufen.

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

## Verwendung mit Prisma

Um NextAuth.js mit Prisma zu verwenden, ist eine Menge an [initialer Einrichtung](https://next-auth.js.org/adapters/models/) erforderlich. `create-t3-app` übernimmt dies für dich, und wenn du sowohl Prisma als auch NextAuth.js auswählst, erhältst du ein voll funktionsfähiges Authentifizierungssystem mit allen erforderlichen Modellen, die vorkonfiguriert sind. Wir liefern deine App mit einem vorkonfigurierten Discord OAuth-Provider aus, den wir ausgewählt haben, da es einer der einfachsten Provider zum starten ist - du musst nur deine Tokens in die `.env`-Datei eingeben und du kannst loslegen. Du kannst jedoch problemlos weitere Provider hinzufügen, indem du die [NextAuth.js-Dokumentation](https://next-auth.js.org/providers/) befolgst. Beachte, dass bestimmte Provider zusätzliche Felder zu bestimmten Modellen hinzufügen müssen. Wir empfehlen dir, die Dokumentation für den Provider zu lesen, den du verwenden möchtest, um sicherzustellen, dass alle erforderlichen Felder vorhanden sind.

### Hinzufügen neuer Felder zu deinen Modellen

Wenn du neue Felder zu einem der `User`, `Account`, `Session` oder `VerificationToken`-Modelle hinzufügst (du wirst wahrscheinlich nur das `User`-Modell anpassen müssen), musst du bedenken, dass der [Prisma-Adapter](https://next-auth.js.org/adapters/prisma) automatisch Felder zu diesen Modellen hinzufügt, wenn sich neue Benutzer anmelden und einloggen. Wenn du also neue Felder zu diesen Modellen hinzufügst, musst du Standardwerte für sie bereitstellen, da der Adapter diese Felder nicht kennt.

Wenn du zum Beispiel ein `role`-Feld zum `User`-Modell hinzufügen möchtest, musst du einen Standardwert für das Feld bereitstellen. Dies wird durch Hinzufügen eines `@default`-Werts zum `role`-Feld im `User`-Modell erreicht:

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

## Verwendung mit Next.js-Middleware

Die Verwendung von NextAuth.js mit Next.js-Middleware [erfordert die Verwendung der "JWT session strategy"](https://next-auth.js.org/configuration/nextjs#caveats) für die Authentifizierung. Dies liegt daran, dass die Middleware nur auf die Sessioncookies zugreifen kann, wenn es sich um ein JWT handelt. Standardmäßig ist `create-t3-app` so konfiguriert, dass die **default**-Datenbankstrategie verwendet wird, in Kombination mit Prisma als Datenbank-Adapter.

## Einrichten des DiscordProviders (Standard)

1. Navigiere zum [Abschnitt "Applications" im Discord Developer Portal](https://discord.com/developers/applications) und klicke auf "New Application"

2. Im Einstellungsmenü wechsel zu "OAuth2 => General"

- Kopier die Client-ID und füge sie in `DISCORD_CLIENT_ID` in `.env` ein.
- Unter Client Secret klickst du auf "Reset Secret" und kopierst diesen String in `DISCORD_CLIENT_SECRET` in `.env`. Sei vorsichtig, da du dieses Geheimnis nicht mehr sehen kannst und das Zurücksetzen dazu führt, dass das Bestehende abläuft.
- Klick auf "Add Redirect" und füge `<app url>/api/auth/callback/discord` ein (Beispiel für die lokale Entwicklung: <code class="break-all">http://localhost:3000/api/auth/callback/discord</code>)
- Speicher deine Änderungen
- Es ist möglich, aber wird nicht empfohlen, dass du die gleiche Discord-Anwendung für die Entwicklung und die Produktion verwendest. Du könntest auch in Betracht ziehen [den Provider zu mocken](https://github.com/trpc/trpc/blob/main/examples/next-prisma-websockets-starter/src/pages/api/auth/%5B...nextauth%5D.ts) während der Entwicklung.

## Nützliche Ressourcen

| Resource                         | Link                                    |
| -------------------------------- | --------------------------------------- |
| NextAuth.js Docs                 | https://next-auth.js.org/               |
| NextAuth.js GitHub               | https://github.com/nextauthjs/next-auth |
| tRPC Kitchen Sink - mit NextAuth | https://kitchen-sink.trpc.io/next-auth  |
