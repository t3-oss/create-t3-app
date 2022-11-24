---
title: NextAuth.js
description: Usare NextAuth.js
layout: ../../../layouts/docs.astro
---

Quando desideri un sistema di autenticazione nella tua applicazione Next.js, NextAuth.js è un'ottima soluzione per introdurre la complessità della sicurezza senza il fastidio di doverla costruire tu stesso. Viene fornito con un ampio elenco di provider per aggiungere rapidamente l'autenticazione OAuth e fornisce adattatori per molti database e ORM.

## Fornitore di contesto

Nel punto di ingresso della tua app, vedrai che la tua applicazione è racchiusa in un [SessionProvider](https://next-auth.js.org/getting-started/client#sessionprovider):

```tsx:pagine/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

Questo provider di contesto consente alla tua applicazione di accedere ai dati della sessione da qualsiasi punto della tua applicazione, senza doverli trasmettere come oggetti di scena:

```tsx:pagine/utenti/[id].tsx
import { useSession } da "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (! session) {
    // Gestisce lo stato non autenticato, ad es. eseguire il rendering di un componente SignIn
    return <SignIn />;
  }

  return <p>Benvenuto {session.user.name}!</p>;
};
```

## Inclusione di `user.id` nella sessione

`create-t3-app` è configurato per utilizzare la [callback di sessione](https://next-auth.js.org/configuration/callbacks#session-callback) nella configurazione di NextAuth.js per includere l'ID dell'utente all'interno del oggetto `sessione`.

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

Questo è accoppiato con un file di dichiarazione del tipo per assicurarsi che `user.id` sia digitato quando si accede all'oggetto `session`. Maggiori informazioni su [`Module Augmentation`](https://next-auth.js.org/getting-started/typescript#module-augmentation) nella documentazione di NextAuth.js.

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

Lo stesso modello può essere utilizzato per aggiungere qualsiasi altro dato all'oggetto `sessione`, come un campo `role`, ma **non dovrebbe essere usato impropriamente per memorizzare dati sensibili** sul client.

## Utilizzo con tRPC

Quando utilizzi NextAuth.js con tRPC, puoi creare procedure riutilizzabili e protette utilizzando [middleware](https://trpc.io/docs/v10/middlewares). Ciò consente di creare procedure a cui possono accedere solo gli utenti autenticati. `create-t3-app` imposta tutto questo per te, permettendoti di accedere facilmente all'oggetto sessione all'interno di procedure autenticate.

Questo viene fatto in un processo in due fasi:

1. Prendi la sessione dalle intestazioni della richiesta utilizzando la funzione [`unstable_getServerSession`](https://next-auth.js.org/configuration/nextjs#unstable_getserversession). Non preoccuparti, questa funzione è sicura da usare: il nome include "unstable" solo perché l'implementazione dell'API potrebbe cambiare in futuro. Il vantaggio di utilizzare `unstable_getServerSession` invece del normale `getSession` è che è una funzione solo lato server e non attiva chiamate fetch non necessarie. `create-t3-app` crea una funzione di supporto che astrae questa peculiare API.

```ts:server/common/get-server-auth-session.ts
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
```

Usando questa funzione di supporto, possiamo prendere la sessione e passarla al contesto tRPC:

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

2. Creare un middleware tRPC che controlli se l'utente è autenticato. Quindi utilizziamo il middleware in una `protectedProcedure`. Qualsiasi chiamante a queste procedure deve essere autenticato, altrimenti verrà generato un errore che può essere opportunamente gestito dal client.

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

L'oggetto sessione è una rappresentazione leggera e minima dell'utente e contiene solo pochi campi. Quando si utilizza `protectedProcedures`, si ha accesso all'id dell'utente che può essere utilizzato per recuperare più dati dal database.

```ts:server/trpc/router/utente.ts
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

## Utilizzo con Prisma

Ottenere NextAuth.js sulavorare con Prisma richiede molte [configurazioni iniziali](https://next-auth.js.org/adapters/models/). `create-t3-app` gestisce tutto questo per te, e se selezioni sia Prisma che NextAuth.js, otterrai un sistema di autenticazione completamente funzionante con tutti i modelli richiesti preconfigurati. Distribuiamo la tua app con scaffoldata con un provider Discord OAuth preconfigurato, che abbiamo scelto perché è uno dei più facili con cui iniziare: fornisci semplicemente i tuoi token in ".env" e sei a posto. Tuttavia, puoi aggiungere facilmente altri provider seguendo la [documentazione NextAuth.js](https://next-auth.js.org/providers/). Tieni presente che alcuni provider richiedono l'aggiunta di campi aggiuntivi a determinati modelli. Ti consigliamo di leggere la documentazione del provider che desideri utilizzare per assicurarti di disporre di tutti i campi richiesti.

### Aggiunta di nuovi campi ai tuoi modelli

Quando aggiungi nuovi campi a uno qualsiasi dei modelli `User`, `Account`, `Session` o `VerificationToken` (molto probabilmente dovrai solo modificare il modello `User`), devi tenere presente che il [Adattatore Prisma](https://next-auth.js.org/adapters/prisma) crea automaticamente campi su questi modelli quando nuovi utenti si registrano e accedono. Pertanto, quando aggiungi nuovi campi a questi modelli, devi fornire valori predefiniti valori per loro, poiché l'adattatore non è a conoscenza di questi campi.

Se, ad esempio, desideri aggiungere un "ruolo" al modello "Utente", dovrai fornire un valore predefinito al campo "ruolo". Questo viene fatto aggiungendo un valore `@default` al campo `role` nel modello `User`:

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

## Utilizzo con il middleware Next.js

L'utilizzo di NextAuth.js con il middleware Next.js [richiede l'uso della strategia di sessione JWT](https://next-auth.js.org/configuration/nextjs#caveats) per l'autenticazione. Questo perché il middleware è in grado di accedere al cookie di sessione solo se si tratta di un JWT. Per impostazione predefinita, `create-t3-app` è configurato per utilizzare la strategia di database **predefinita**, in combinazione con Prisma come adattatore di database.

## Impostazione del DiscordProvider predefinito

1. Vai alla [sezione Applicazioni nel Portale per sviluppatori Discord](https://discord.com/developers/applications) e fai clic su "Nuova applicazione"
2. Nel menu delle impostazioni, vai su "OAuth2 => Generale"

- Copia l'ID client e incollalo in "DISCORD_CLIENT_ID" in ".env".
- In Client Secret, fai clic su "Reset Secret" e copia la stringa in `DISCORD_CLIENT_SECRET` in `.env`. Fai attenzione perché non sarai più in grado di vedere questo segreto e il ripristino farà scadere quello esistente.
- Fai clic su "Aggiungi reindirizzamento" e incolla in `<url app>/api/auth/callback/discord` (esempio per lo sviluppo locale: <code class="break-all">http://localhost:3000/api/auth /callback/discord</code>)
- Salva le modifiche
- È possibile, ma non consigliato, utilizzare la stessa applicazione Discord sia per lo sviluppo che per la produzione. Potresti anche prendere in considerazione [Deridere il provider](https://github.com/trpc/trpc/blob/next/examples/next-prisma-starter-websockets/src/pages/api/auth/%5B...nextauth %5D.ts) durante lo sviluppo.

## Risorse utili

| Risorsa | Collegamento |
| --------------------------------- | --------------------------------------- |
| NextAuth.js Documenti | https://next-auth.js.org/ |
| AvantiAuth.js GitHub | https://github.com/nextauthjs/next-auth |
| Lavello da cucina tRPC - con NextAuth | https://kitchen-sink.trpc.io/next-auth |