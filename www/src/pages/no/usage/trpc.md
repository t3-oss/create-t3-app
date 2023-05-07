---
title: tRPC
description: Bruk av tRPC
layout: ../../../layouts/docs.astro
lang: no
---

tRPC lar oss skrive ende-til-ende typesikre APIer, helt uten kodegenerering eller runtime-bloat.
tRPC bruker TypeScripts _inferens_ for å automatisk utlede API-ruterens typedefinisjoner og lar deg kalle API-prosedyrene dine fra frontend med full typesikkerhet og autofullføring. Når du bruker tRPC, føles frontend og backend nærmere enn noen gang, noe som resulterer i en enestående utvikleropplevelse.

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>"Jeg bygde tRPC for å forbedre hastigheten på utviklingen av applikasjoner ved å fjerne behovet for et tradisjonelt API-lag. Samtidig kan vi fortsatt stole på at de vil være stabile når man itererer raskt.<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="https://avatars.githubusercontent.com/u/459267?v=4"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Alex - creator of tRPC</span>
      <a
        href="https://twitter.com/alexdotjs"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @alexdotjs
      </a>
    </div>
  </cite>
</blockquote>

## Hvordan bruker jeg tRPC?

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Making typesafe APIs easy with tRPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

tRPC-bidragsyter [trashh_dev](https://twitter.com/trashh_dev) holdt [en flott tale på Next.js Conf](https://www.youtube.com/watch?v=2LYM8gf184U) om tRPC. Vi anbefaler deg å se den hvis du ikke allerede har gjort det.

Med tRPC skriver du TypeScript-funksjoner i backend, og kaller dem deretter fra frontend. En enkel tRPC-prosedyre kan se slik ut:

```ts:server/api/routers/user.ts
const userRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
```

Dette er tRPC-prosedyre (tilsvarer en rutebehandler i en tradisjonell backend) som først validerer inndataene ved å bruke Zod (som er det samme valideringsbiblioteket vi bruker for [miljøvariablene](./env-variables)) - i dette tilfellet forsikres det at _input_ er en streng. Hvis input ikke er en streng, returneres en detaljert feil.

Etter input følger en resolver-funksjon som enten utfører en [query](https://trpc.io/docs/v10/react-queries), [mutasjon](https://trpc.io/docs/v10/react-mutations) eller en [subscription](https://trpc.io/docs/v10/subscriptions). I vårt eksempel kaller resolver-funksjonen vår database med vår [prisma](./prisma)-klient og returnerer brukeren hvis `id` samsvarer med den vi sendte inn.

Du definerer prosedyrene dine i `rutere` som er en samling av relaterte prosedyrer innenfor et felles _namespace_. Du kan ha en ruter for `users`, en for `posts` og en for `messages`. Disse ruterne kan deretter slås sammen til en enkelt, sentral `appRouter`:

```ts:server/api/root.ts
const appRouter = createTRPCRouter({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

Merk at vi bare trenger å eksportere vår ruters typedefinisjoner, noe som betyr at vi aldri importerer noen serverkode i klienten vår.

La oss nå påkalle prosedyren i frontenden vår. tRPC tilbyr en _wrapper_ for `@tanstack/react-query` hvor det er definert noen hooks som gjør at du kan påkalle ditt API med definerte typer som er "inferred", det vil at TypeScript-kompilatoren automatisk har utledet hvilken type API-kallene dine har. Vi kan kalle prosedyrene våre fra vår frontend slik:

```tsx:pages/users/[id].tsx
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const UserPage = () => {
  const { query } = useRouter();
  const userQuery = api.users.getById.useQuery(query.id);

  return (
    <div>
      <h1>{userQuery.data?.name}</h1>
    </div>
  );
};
```

Du vil umiddelbart legge merke til hvor god autofullføringen og typesikkerheten er. Så snart du skriver inn `api.` vil ruterne dine automatisk bli foreslått. Hvis du nå velger en ruter, vil prosedyrene også vises. Hvis inndataene dine ikke samsvarer med validatoren du definerte i backend, får du en TypeScript-feil.

## Filer

tRPC krever mye _boilerplate_, som `create-t3-app` setter opp for deg. La oss gå gjennom filene som vil bli opprettet:

### 📄 `pages/api/trpc/[trpc].ts`

Dette er inngangspunktet for API-et ditt og eksponerer tRPC-ruteren. Normalt vil du ikke være borti denne filen så ofte. Men hvis du f.eks. trenger en _middleware_ for CORS eller lignende, er det nyttig å vite at den eksporterte funksjonen `createNextApiHandler` er en [Next.js API-Handler](https://nextjs.org/docs/api-routes/introduction) som mottar et [request-](https://developer.mozilla.org/en-US/docs/Web/API/Request) og et [response](https://developer.mozilla.org/en-US/docs/Web/API/Response)-objekt. Dette betyr at du kan _wrappe_ `createNextApiHandler` med hvilken som helst middleware. Se under for et [eksempel](#aktivering-av-cors) for å legge til CORS.

### 📄 `server/api/trpc.ts`

Denne filen er delt opp i to deler, kontekstoppretting og tRPC-initialisering:

1. Vi definerer konteksten som videresendes til tRPC-prosedyrene dine. Kontekst er data som alle dine tRPC-prosedyrer vil ha tilgang til, og er et flott sted å plassere ting som databaseforbindelser, autentiseringsinformasjon, osv. I create-t3-app bruker vi to funksjoner, for å muliggjøre bruk av en undergruppe av konteksten når vi ikke har tilgang til forespørselsobjektet.

- `createInnerTRPCContext`: Det er her du definerer konteksten som ikke avhenger av forespørselen, f.eks. databasetilkoblingen din. Du kan bruke denne funksjonen til [integrasjonstesting](#sample-integration-test) eller [ssg-hjelpere](https://trpc.io/docs/v10/ssg-helpers) der du ikke har et forespørselsobjekt.

- `createTRPCContext`: Det er her du definerer konteksten som avhenger av forespørselen, f.eks. brukerens økt. Du ber om økten ved å bruke `opts.req`-objektet, og sender deretter økten ned til `createInnerTRPCContext`-funksjonen for å lage den endelige konteksten.

2. Vi initialiserer tRPC og definerer gjenbrukbare [prosedyrer](https://trpc.io/docs/v10/procedures) og [middlewares](https://trpc.io/docs/v10/middlewares). Av konvensjon bør du ikke eksponere hele `t`-objektet, men i stedet lage gjenbrukbare prosedyrer og middleware og eksportere de.

Du har sikkert lagt merke til at vi bruker `superjson` som [datatransformator](https://trpc.io/docs/v10/data-transformers). Dette sikrer at datatypene dine blir bevart når de når klienten, så hvis du for eksempel sender et `Date`-objekt til klienten så returneres et `Date`-objekt og ikke en streng slik de fleste API gjør.

### 📄 `server/api/routers/*.ts`

Det er her du definerer ruterne og prosedyrene for API-et din. Konvensjon tilsier at du bør [opprette separate rutere](https://trpc.io/docs/v10/router) for relaterte prosedyrer.

### 📄 `server/api/root.ts`

Her slår vi sammen alle underruterne definert i `routers/**` [merge](https://trpc.io/docs/v10/merging-routers) til et enkelt app-ruter.

### 📄 `utils/api.ts`

Dette er inngangspunktet for tRPC på klientsiden. Her importerer du ruterens **typedefinisjonen** og oppretter tRPC-klienten, samt hooks for react-query. Ettersom vi har aktivert `superjson` som vår datatransformator på serversiden, må vi aktivere den på klientsiden også. Dette er fordi serialisert data fra _backend_ blir deserialisert på _frontend_.

Du definerer tRPC [lenker](https://trpc.io/docs/v10/links) her, som kartlegger request-flyten fra klienten til serveren. Vi bruker "standard" [`httpBatchLink`](https://trpc.io/docs/v10/links/httpBatchLink) som muliggjør [request batching](https://cloud.google.com/compute/docs/api/how-tos/batch), samt en [`loggerLink`](https://trpc.io/docs/v10/links/loggerLink) som gir ut request-logger som kan være nyttige under utviklingsprosessen.

Til slutt eksporterer vi en [hjelpertype](https://trpc.io/docs/v10/infer-types#additional-dx-helper-type) som du kan bruke til å utlede typene dine på klientsiden.

## Hvordan påkaller jeg API-et mitt eksternt?

Med vanlige API-er kan du bruke hvilken som helst HTTP-klient som `curl`, `Postman`, `fetch` eller bare nettleseren din. Med tRPC er det litt annerledes. Hvis du vil kalle opp prosedyrene dine uten tRPC-klienten, er det to anbefalte måter:

### Gjør en enkelt prosedyre tilgjengelig eksternt

Hvis du ønsker å eksponere en enkel prosedyre eksternt, er du avhengig av [server-side-kall](https://trpc.io/docs/v10/server-side-calls). Dette vil tillate deg å opprette et normalt Next.js API-endepunkt, men gjenbruke resolver-delen av tRPC-prosedyren.

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Lag kontekst og caller
  const ctx = await createTRPCContext({ req, res });
  const caller = appRouter.createCaller(ctx);
  try {
    const { id } = req.query;
    const user = await caller.user.getById(id);
    res.status(200).json(user);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // Det oppstod en feil fra tRPC
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // En annen feil oppstod
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};
```

### Vis alle prosedyrer som et REST-endepunkt

Hvis du vil gjøre hver enkelt prosedyre tilgjengelig eksternt, sjekk ut den community-skapte plugin-modulen [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master). Den lar deg generere et OpenAPI-kompatibelt REST API fra tRPC-ruteren din, ved å legge til ytterligere metadata i prosedyrene dine.

### Dette er kun HTTP-requests

tRPC kommuniserer via HTTP, så det er også mulig å starte tRPC-prosedyrene dine med "normale" HTTP-requests. Syntaksen kan imidlertid være vanskelig på grunn av [RPC-protokollen](https://trpc.io/docs/v10/rpc) som tRPC bruker. Hvis du er nysgjerrig, sjekk nettleserens nettverksfane for å se hvordan tRPC-requestene og -responsene ser ut. Vi anbefaler imidlertid dette kun for pedagogiske formål og vil råde deg til generelt å bruke en av løsningene ovenfor.

## Sammenligning med et Next.js API-endepunkt

La oss sammenligne et Next.js API-endepunkt med en tRPC-prosedyre. Anta at vi ønsker å hente et brukerobjekt fra databasen vår og returnere det til frontend. Vi kan skrive et Next.js API-endepunkt slik:

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";

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

Hvis vi nå sammenligner dette med tRPC-eksemplet fra lenger opp i dokumentasjonen, kan følgende fordeler med tRPC sees:

- I stedet for å spesifisere en URL for hver rute, som kan forårsake feil ved endring av prosjektets struktur, er hele ruteren et objekt med autofullføring.
- Du trenger ikke å validere hvilken HTTP-metode som ble brukt.
- Du trenger ikke å validere at request eller _body_ inneholder riktige data i prosedyren, fordi Zod tar seg av dette.
- I stedet for å opprette en response, kan du kaste en error og returnere en verdi eller et objekt som du ville gjort i en hvilken som helst annen TypeScript-funksjon.
- Å kalle prosedyren på frontend gir autofullføring og typesikkerhet.

## Nyttige Kodeutdrag

Her er noen kodesnutter som kan hjelpe deg.

### Aktivering av CORS

Hvis du trenger å konsumere API-et ditt fra et annet domene, for eksempel i en monorepo som inneholder en React Native-app, må du antageligvis aktivere CORS:

```ts:pages/api/trpc/[trpc].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import cors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Aktiver cors
  await cors(req, res);

  // Oprett og påkall tRPC-handler
  return createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
  })(req, res);
};

export default handler;
```

### Optimistiske oppdateringer

Optimistiske oppdateringer er oppdateringer vi gjør før API-forespørselen fullføres. Dette gir en bedre opplevelse for brukeren siden de ikke trenger å vente på at API-forespørselen skal fullføres før brukergrensesnittet reflekterer resultatet av handlingen deres. Imidlertid bør applikasjoner som verdsetter riktigheten av dataen unngå optimistiske oppdateringer, da de ikke gjenspeiler de "sanne" dataene til backend. Du kan lese mer om det i [React Query-dokumentasjonen](https://tanstack.com/query/v4/docs/guides/optimistic-updates).

```tsx
const MyComponent = () => {
   const listPostQuery = api.post.list.useQuery();

   const utils = api.useContext();
   const postCreate = api.post.create.useMutation({
     async onMutate(newPost) {
       // Avbryt utgående henting (slik at de ikke overskriver vår optimistiske oppdatering)
       vent utils.post.list.cancel();

       // Få dataene fra queryCache
       const prevData = utils.post.list.getData();

       // Oppdater dataene optimistisk med vårt nye innlegg
       utils.post.list.setData(udefinert, (gammel) => [...gammel, nyinnlegg]);

       // Returner forrige data slik at vi kan gå tilbake hvis noe går galt
       return { prevData };
     },
     onError(err, newPost, ctx) {
       // Hvis mutasjonen mislykkes, bruk kontekstverdien fra onMutate
       utils.post.list.setData(udefinert, ctx.prevData);
     },
     onSettled() {
       // Synkroniser med server når mutasjonen er fullført
       utils.post.list.invalidate();
     },
   });
};
```

### Eksempel på Integrasjonstest

Her er et eksempel på en integrasjonstest som bruker [Vitest](https://vitest.dev) for å bekrefte at tRPC-ruteren din fungerer som forventet, at input-parseren _inferrer_ riktig type, og at returnert data samsvarer med forventet output.

```ts
import { type inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { appRouter, type AppRouter } from "~/server/api/root";
import { expect, test } from "vitest";

test("example router", async () => {
  const ctx = await createInnerTRPCContext({ session: null });
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;
  const input: Input = {
    text: "test",
  };

  const example = await caller.example.hello(input);

  expect(example).toMatchObject({ greeting: "Hello test" });
});
```

## Nyttige Ressurser

| Ressurser                 | Link                                                    |
| ------------------------- | ------------------------------------------------------- |
| tRPC Dokumentasjon        | https://www.trpc.io                                     |
| Noen tRPC-eksempler       | https://github.com/trpc/trpc/tree/next/examples         |
| React Query Dokumentasjon | https://tanstack.com/query/v4/docs/adapters/react-query |
