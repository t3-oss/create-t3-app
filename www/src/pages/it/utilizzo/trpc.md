---
title: tRPC
description: Usage of tRPC
layout: ../../../layouts/docs.astro
---

tRPC ci consente di scrivere API sicuri in end-to-end senza alcuna generazione di codice o sovraccarico di runtime. Utilizza la grande inferenza di TypeScript per dedurre le definizioni del tipo del tuo router API e ti consente di chiamare le tue procedure API dal tuo front-end con piena sicurezza dei tipi e completamento automatico. Quando si utilizza tRPC, il front-end e il back-end si sentono più vicini che mai, consentendo un'esperienza di sviluppo eccezionale.

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 arrotondato-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Ho creato tRPC per consentire alle persone di muoversi più velocemente eliminando la necessità di un livello API tradizionale, pur avendo la certezza che le nostre app non si romperanno man mano che rapidamente creiamo.<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar di @alexdotjs"
      className="w-12 mr-4 arrotondato-pieno bg-neutro-500"
      src="https://avatars.githubusercontent.com/u/459267?v=4"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Alex - creatore di tRPC</span>
      <a
        href="https://twitter.com/alexdotjs"
        destinazione="_blank"
        rel="noopener noreferrer"
        className="testo-sm"
      >
        @alexdotjs
      </a>
    </div>
  </cite>
</blockquote>

## File

tRPC richiede un bel po' di boilerplate che `create-t3-app` crea per te. Esaminiamo i file che vengono generati:

### 📄 `pages/api/trpc/[trpc].ts`

Questo è il punto di ingresso per la tua API ed espone il router tRPC. Normalmente, non toccherai molto questo file, ma se devi, ad esempio, abilitare il middleware CORS o simili, è utile sapere che `createNextApiHandler` esportato è un [gestore API Next.js](https://nextjs.org/docs/api-routes/introduction) che accetta una [richiesta](https://developer.mozilla.org/en-US/docs/Web/API/Request) e una [risposta](https://developer.mozilla.org/en-US/docs/Web/API/Response?retiredLocale=sv-SE). Ciò significa che puoi racchiudere `createNextApiHandler` in qualsiasi middleware desideri. Vedi sotto per un [frammento di esempio](#enabling-cors) dell'aggiunta di CORS.

### 📄 `server/trpc/context.ts`

Questo file è dove definisci il contesto che viene passato alle tue procedure tRPC. Il contesto è dato a cui avranno accesso tutte le tue procedure tRPC ed è un ottimo posto per inserire cose come connessioni al database, informazioni di autenticazione, ecc. In create-t3-app usiamo due funzioni, per abilitare l'utilizzo di un sottoinsieme del contesto quando non abbiamo accesso all'oggetto della richiesta.

- `createContextInner`: qui è dove definisci il contesto che non dipende dalla richiesta, ad es. la tua connessione al database. Puoi utilizzare questa funzione per [test di integrazione](#sample-integration-test) o [ssg-helpers](https://trpc.io/docs/v10/ssg-helpers) dove non hai un oggetto richiesta .

- `createContext`: qui è dove definisci il contesto che dipende dalla richiesta, ad es. la sessione dell'utente. Richiedi la sessione utilizzando l'oggetto `opts.req`, quindi passa la sessione alla funzione `createContextInner` per creare il contesto finale.

### 📄 `server/trpc/trpc.ts`

Qui è dove inizializzi tRPC e definisci [procedure](https://trpc.io/docs/v10/procedures) e [middleware](https://trpc.io/docs/v10/middlewares) riutilizzabili. Per convenzione, non dovresti esportare l'intero oggetto `t` ma, invece, creare procedure e middleware riutilizzabili ed esportarli.

Noterai che utilizziamo `superjson` come [trasformatore di dati](https://trpc.io/docs/v10/data-transformers). Questo fa in modo che i tuoi tipi di dati vengano preservati quando raggiungono il client, quindi se ad esempio invii un oggetto `Date`, il client restituirà una `Date` e non una stringa come accade per la maggior parte delle API.

### 📄 `server/trpc/router/*.ts`

Qui è dove definisci i percorsi e le procedure della tua API. Per convenzione, [crea router separati](https://trpc.io/docs/v10/router) per le procedure correlate, quindi [unisci](https://trpc.io/docs/v10/merging-routers) tutti di loro in un singolo router di app in `server/trpc/router/_app.ts`.

### 📄 `utils/trpc.ts`

Questo è il punto di ingresso frontend per tRPC. Qui è dove importerai la **definizione del tipo** del router e creerai il tuo client tRPC insieme agli hook react-query. Poiché abbiamo abilitato `superjson` come nostro trasformatore di dati sul backend, dobbiamo abilitarlo anche sul frontend. Questo perché i dati serializzati dal back-end vengono deserializzati sul front-end.

Qui definirai i [link](https://trpc.io/docs/v10/links) tRPC, che determinano il flusso della richiesta dal client al server. Utilizziamo il [`httpBatchLink`](https://trpc.io/docs/v10/links/httpBatchLink) "predefinito" che abilita [il raggruppamento delle richieste](https://cloud.google.com/compute/docs/api/how-to/batch),così come un [`loggerLink`](https://trpc.io/docs/v10/links/loggerLink) che genera utili log delle richieste durante lo sviluppo.

Infine, esportiamo un [tipo di helper](https://trpc.io/docs/v10/infer-types#additional-dx-helper-type) che puoi utilizzare per dedurre i tuoi tipi sul frontend.

## Come si usa tRPC?

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Semplificare le API typesafe con tRPC" frameborder="0" allow="accelerometro; riproduzione automatica ; scrittura negli appunti; supporto crittografato; giroscopio; picture-in-picture" allowfullscreen></iframe>
</div>

Il collaboratore di tRPC [trashh_dev](https://twitter.com/trashh_dev) ha fatto [un discorso eccezionale alla Next.js Conf](https://www.youtube.com/watch?v=2LYM8gf184U) su tRPC. Ti consigliamo vivamente di guardarlo se non l'hai già fatto.

Con tRPC, scrivi funzioni TypeScript sul tuo backend e poi le chiami dal tuo frontend. Una semplice procedura tRPC potrebbe essere simile a questa:

```ts:server/trpc/router/utente.ts
const userRouter = t.router({
  getById: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
```

Questa è una procedura tRPC (equivalente a un gestore di route in un backend tradizionale) che prima convalida l'input utilizzando Zod (che è la stessa libreria di convalida che usiamo per [variabili d'ambiente](./env-variables)) - in questo caso , si sta assicurando che l'input sia una stringa. Se l'input non è una stringa, invierà invece un errore informativo.

Dopo l'input, concatenamo una funzione di risoluzione che può essere una [query](https://trpc.io/docs/v10/react-queries), una [mutazione](https://trpc.io/docs/v10/react-mutations) o un [abbonamento](https://trpc.io/docs/v10/subscriptions). Nel nostro esempio, il resolver chiama il nostro database usando il nostro client [prisma](./prisma) e restituisce l'utente il cui `id` corrisponde a quello che abbiamo passato.

Definisci le tue procedure in `router` che rappresentano una raccolta di procedure correlate con uno spazio dei nomi condiviso. Potresti avere un router per gli "utenti", uno per i "post" e un altro per i "messaggi". Questi router possono quindi essere uniti in un unico `appRouter` centralizzato:

```ts:server/trpc/router/_app.ts
const appRouter = t.router({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

Si noti che abbiamo solo bisogno di esportare le definizioni del tipo del nostro router, il che significa che non stiamo mai importando alcun codice server sul nostro client.

Ora chiamiamo la procedura sul nostro frontend. tRPC fornisce un wrapper per `@tanstack/react-query` che ti consente di utilizzare tutta la potenza degli hook che forniscono, ma con l'ulteriore vantaggio di avere le tue chiamate API digitate e dedotte. Possiamo chiamare le nostre procedure dal nostro frontend in questo modo:

```tsx:pagine/utenti/[id].tsx
import { useRouter } from "next/router";

const UserPage = () => {
  const { query } = useRouter();
  const userQuery = trpc.user.getById.useQuery(query.id);

  return (
    <div>
      <h1>{userQuery.data?.name}</h1>
    </div>
  );
};
```

Noterai immediatamente quanto è buono il completamento automatico e la sicurezza dei tipi. Non appena scrivi `trpc.`, i tuoi router verranno visualizzati in completamento automatico e quando selezioni un router, verranno visualizzate anche le sue procedure. Riceverai anche un errore TypeScript se il tuo input non corrisponde al validatore che hai definito sul back-end.

## Come posso chiamare la mia API esternamente?

Con le normali API, puoi chiamare i tuoi endpoint utilizzando qualsiasi client HTTP come `curl`, `Postman`, `fetch` o direttamente dal tuo browser. Con tRPC, è un po' diverso. Se vuoi chiamare le tue procedure senza il client tRPC, ci sono due modi consigliati per farlo:

### Esporre una singola procedura esternamente

Se vuoi esporre una singola procedura esternamente, stai cercando [chiamate lato server](https://trpc.io/docs/v10/server-side-calls). Ciò ti consentirebbe di creare un normale endpoint API Next.js, ma riutilizzare la parte resolver della tua procedura tRPC.

```ts:pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { appRouter } from "../../../server/trpc/router/_app";
import { createContext } from "../../../server/trpc/context";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  const ctx = await createContext({ req, res });
  const caller = appRouter.createCaller(ctx);
  try {
    const { id } = req.query;
    const user = await caller.user.getById(id);
    res.status(200).json(user);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occured
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // Another error occured
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default userByIdHandler;
```

### Esponendo ogni procedura come endpoint REST

Se vuoi esporre ogni singolo procedure esternamente, verifica il plug-in creato dalla community [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master). Fornendo alcuni metadati extra alle tue procedure, puoi generare un'API REST compatibile con OpenAPI dal tuo router tRPC.

### Sono solo richieste HTTP

tRPC comunica su HTTP, quindi è anche possibile chiamare le procedure tRPC utilizzando richieste HTTP "regolari". Tuttavia, la sintassi può essere complicata a causa del [protocollo RPC](https://trpc.io/docs/v10/rpc) utilizzato da tRPC. Se sei curioso, puoi controllare come appaiono le richieste e le risposte tRPC nella scheda di rete del tuo browser, ma ti suggeriamo di farlo solo come esercizio didattico e di attenerti a una delle soluzioni descritte sopra.

## Confronto con un endpoint API Next.js

Confrontiamo un endpoint API Next.js con una procedura tRPC. Diciamo che vogliamo recuperare un oggetto utente dal nostro database e restituirlo al frontend. Potremmo scrivere un endpoint API Next.js come questo:

```ts:pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  const examples = await prisma.example.findFirst({
    where: {
      id,
    },
  });

  res.status(200).json(examples);
};

export default userByIdHandler;
```

```ts:pages/users/[id].tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);
};
```

Confronta questo con l'esempio tRPC sopra e puoi vedere alcuni dei vantaggi di tRPC:

- Invece di specificare un URL per ogni percorso, che può diventare fastidioso per il debug se sposti qualcosa, l'intero router è un oggetto con completamento automatico.
- Non è necessario convalidare quale metodo HTTP è stato utilizzato.
- Non è necessario convalidare che la query o il corpo della richiesta contenga i dati corretti nella procedura, perché Zod si occupa di questo.
- Invece di creare una risposta, puoi lanciare errori e restituire un valore o un oggetto come faresti in qualsiasi altra funzione TypeScript.
- Chiamare la procedura sul frontend fornisce il completamento automatico e l'indipendenza dai tipi.

## Frammenti utili

Ecco alcuni frammenti che potrebbero tornare utili.

### Abilitazione di CORS

Se devi utilizzare la tua API da un dominio diverso, ad esempio in un monorepo che include un'app React Native, potresti dover abilitare CORS:

```ts:pages/api/trpc/[trpc].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "~/server/trpc/router/_app";
import { createContext } from "~/server/trpc/context";
import cors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Enable cors
  await cors(req, res);

  // Create and call the tRPC handler
  return createNextApiHandler({
    router: appRouter,
    createContext,
  })(req, res);
};

export default handler;
```

### Aggiornamenti ottimistici

Gli aggiornamenti ottimistici si verificano quando aggiorniamo l'interfaccia utente prima che la chiamata API sia terminata. Ciò offre all'utente un'esperienza migliore perché non deve attendere il completamento della chiamata API prima che l'interfaccia utente rifletta il risultato della sua azione. Tuttavia, le app che apprezzano molto la correttezza dei dati dovrebbero evitare aggiornamenti ottimistici in quanto non sono una rappresentazione "vera" dello stato del back-end. Puoi leggere ulteriori informazioni sui [documentazione di React Query](https://tanstack.com/query/v4/docs/guides/optimistic-updates).

```tsx
const MyComponent = () => {
  const listPostQuery = trpc.post.list.useQuery();

  const utils = trpc.useContext();
  const postCreate = trpc.post.create.useMutation({
    async onMutate(newPost) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.post.list.cancel();

      // Get the data from the queryCache
      const prevData = utils.post.list.getData();

      // Optimistically update the data with our new post
      utils.post.list.setData(undefined, (old) => [...old, newPost]);

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.post.list.setData(undefined, ctx.prevData);
    },
    onSettled() {
      // Sync with server once mutation has settled
      utils.post.list.invalidate();
    },
  });
};
```

### Esempio di Test di integrazione

Ecco un test di integrazione di esempio che utilizza [Vitest](https://vitest.dev) per verificare che il router tRPC funzioni come previsto, l'input parser deduce il tipo corretto e che i dati restituiti corrispondano all'output previsto.

```ts
import { type inferProcedureInput } from "@trpc/server";
import { createContextInner } from "~/server/router/context";
import { appRouter, type AppRouter } from "~/server/router/_app";
import { expect, test } from "vitest";

test("example router", async () => {
  const ctx = await createContextInner({ session: null });
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;
  const input: Input = {
    text: "test",
  };

  const example = await caller.example.hello(input);

  expect(example).toMatchObject({ greeting: "Hello test" });
});
```

## Risorse utili

| Risorsa | Collegamento |
| ---------------------- | -------------------------------------------------- ----- |
| Documentazione tRPC | https://www.trpc.io |
| Mazzo di esempi tRPC | https://github.com/trpc/trpc/tree/next/examples |
| React Query Documentazione | https://tanstack.com/query/v4/docs/adapters/react-query |