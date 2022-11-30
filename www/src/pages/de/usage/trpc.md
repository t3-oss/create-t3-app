---
title: tRPC
description: Verwendung von tRPC
layout: ../../../layouts/docs.astro
lang: de
---

tRPC ermöglicht es uns, end-to-end typisierte APIs zu schreiben, komplett ohne Code-Generation oder Laufzeit-Bloat.
Es nutzt die großartige Inferenz von TypeScript, um die Typdefinitionen vom API-Routers zu inferieren und erlaubt es dir, deine API-Prozeduren aus dem Frontend heraus mit voller Typsicherheit und Autovervollständigung aufzurufen. Wenn du tRPC verwendest, fühlen sich Front- und Backend näher zusammen als je zuvor, was zu einer herausragenden Entwicklerzufriedenheit führt.

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>I built tRPC to allow people to move faster by removing the need of a traditional API-layer, while still having confidence that our apps won't break as we rapidly iterate.<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 mr-4 rounded-full bg-neutral-500"
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

## Dateien

tRPC benötigt eine Menge Boilerplate, die `create-t3-app` für dich einrichtet. Lass uns die Dateien durchgehen, die erstellt werden:

### 📄 `pages/api/trpc/[trpc].ts`

Dies ist der Einstiegspunkt für deine API und stellt den tRPC-Router zur Verfügung. Normalerweise wirst du dich in dieser Datei nicht sehr oft aufhalten.
Wenn du aber z. B. eine Middleware für CORS oder ähnliches benötigst, ist es hilfreich zu wissen, dass die exportierte `createNextApiHandler` ein [Next.js API-Handler](https://nextjs.org/docs/api-routes/introduction) ist, der ein [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) und [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response?retiredLocale=sv-SE) Objekt entgegennimmt. Dies bedeutet, dass du `createNextApiHandler` mit irgendeiner Middleware umschließen kannst. Siehe unten für ein [Beispiel](#enabling-cors) zum Hinzufügen von CORS.

### 📄 `server/trpc/context.ts`

In dieser Datei definierst du den Kontext, welcher an deine tRPC-Prozeduren übergeben wird. Der Kontext besteht aus Daten, auf die alle deine tRPC-Prozeduren Zugriff haben und ist ein guter Ort, um Dinge wie Datenbankverbindungen, Authentifizierungsdaten usw. zu speichern. In `create-t3-app` verwenden wir zwei Funktionen, um einen Teil des Kontexts zu verwenden, wenn wir keinen Zugriff auf das Request-Objekt haben.

- `createContextInner`: Hier definierst du den Kontext, der nicht von der Anfrage abhängt, z. B. deine Datenbankverbindung. Du kannst diese Funktion für [Integrationstests](#sample-integration-test) oder [ssg-helpers](https://trpc.io/docs/v10/ssg-helpers) verwenden, bei denen du kein "Request"-Objekt hast.

- `createContext`: Hier definierst du den Kontext, der von der Anfrage abhängt, z. B. die Sitzung des Benutzers. Du fragst die Sitzung mit dem `opts.req`-Objekt ab und gibst sie dann an die `createContextInner`-Funktion weiter, um den endgültigen Kontext zu erstellen.

### 📄 `server/trpc/trpc.ts`

Hier wird tRPC initialisiert und wieder verwendbare [Prozeduren](https://trpc.io/docs/v10/procedures) und [Middlewares](https://trpc.io/docs/v10/middlewares) definiert. Nach Konvention solltest du das gesamte `t`-Objekt nicht exportieren, sondern stattdessen wieder verwendbare Prozeduren und Middlewares erstellen und diese exportieren.

Du hast sicherlich bemerkt, dass wir `superjson` als [data transformer](https://trpc.io/docs/v10/data-transformers) verwenden. Dies sorgt dafür, dass deine Datentypen erhalten bleiben, wenn sie den Client erreichen, sodass z. B. ein `Date`-Objekt an den Client gesendet wird, der ein `Date` zurückgibt und nicht ein String, so wie es bei den meisten APIs der Fall ist.

### 📄 `server/trpc/router/*.ts`

Hier definierst du die Routen und Prozeduren deiner API. Nach Konvention erstellst du [separate Router](https://trpc.io/docs/v10/router) für zusammengehörige Prozeduren und dann [verbindest ("merge")](https://trpc.io/docs/v10/merging-routers) du alle in einen einzigen App-Router in `server/trpc/router/_app.ts`.

### 📄 `utils/trpc.ts`

Dies ist der Einstiegspunkt für tRPC auf der Clientseite. Hier importierst du die **Typdefinition** des Routers und erstellst deinen tRPC-Client zusammen mit den react-query-Hooks. Da wir `superjson` als unseren Daten-Transformer auf der Serverseite aktiviert haben, müssen wir ihn auch auf der Clientseite aktivieren. Dies liegt daran, dass die serialisierten Daten vom Server auf der Clientseite deserialisiert werden.

You'll define your tRPC [links](https://trpc.io/docs/v10/links) here, which determines the request flow from the client to the server. We use the "default" [`httpBatchLink`](https://trpc.io/docs/v10/links/httpBatchLink) which enables [request batching](https://cloud.google.com/compute/docs/api/how-tos/batch), as well as a [`loggerLink`](https://trpc.io/docs/v10/links/loggerLink) which outputs useful request logs during development.

Ebenfalls definierst du hier die tRPC [links](https://trpc.io/docs/v10/links) hier, die den Anfrageablauf ("Request flow") vom Client zum Server abbilden. Wir verwenden den "Standard" [`httpBatchLink`](https://trpc.io/docs/v10/links/httpBatchLink), welcher [request batching](https://cloud.google.com/compute/docs/api/how-tos/batch) ermöglicht, sowie einen [`loggerLink`](https://trpc.io/docs/v10/links/loggerLink), der nützliche Logs während der Entwicklung ausgibt.

Zuletzt exportieren wir einen [Hilfstyp](https://trpc.io/docs/v10/infer-types#additional-dx-helper-type), den du verwenden kannst, um deine Typen auf der Clientseite abzuleiten.

## Wie verwende ich tRPC?

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Making typesafe APIs easy with tRPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

tRPC Mitwirkender [trashh_dev](https://twitter.com/trashh_dev) hat [einen tollen Vortrag auf der Next.js Conf](https://www.youtube.com/watch?v=2LYM8gf184U) über tRPC gehalten. Wir empfehlen dir, ihn anzusehen, wenn du ihn noch nicht gesehen hast.

With tRPC, you write TypeScript functions on your backend, and then call them from your frontend. A simple tRPC procedure could look like this:

Mit tRPC schreibst du TypeScript-Funktionen in deinem Backend und rufst sie dann von deinem Frontend aus auf. Eine einfache tRPC-Prozedur könnte so aussehen:

```ts:server/trpc/router/user.ts
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

Dies ist tRPC-Prozedur (Äquivalent zu einem Routen-Handler in einem traditionellen Backend), die zuerst den Input mittels Zod validiert (welches die gleiche Validierungs-Bibliothek ist, die wir für [Environment-Variables](./env-variables) verwenden) - in diesem Fall wird sichergestellt, dass der Input ein String ist. Wenn der Input kein String ist, wird ein detailierter Fehler zurückgesendet.

Nach dem Inputaufruf folgt eine Resolver-Funktion, die entweder eine [query](https://trpc.io/docs/v10/react-queries), [mutation](https://trpc.io/docs/v10/react-mutations) oder eine [subscription](https://trpc.io/docs/v10/subscriptions) sein kann. In unserem Beispiel ruft die Resolver-Funktion unsere Datenbank mit unserem [prisma](./prisma)-Client auf und gibt den Benutzer zurück, dessen `id` mit der übereinstimmt, die wir übergeben haben.

Du definierst deine Prozeduren in `routers` welche eine Sammlung von zusammengehörigen Prozeduren innerhalb eines gemeinsamen Namespaces darstellen. Du könntest einen Router für `users`, einen für `posts` und einen für `messages` haben. Diese Router können dann in einen einzigen, zentralen `appRouter` zusammengeführt werden:

```ts:server/trpc/router/_app.ts
const appRouter = t.router({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

Beachte dass wir nur unsere Router-Typdefinitionen exportieren müssen, was bedeutet, dass wir nie Server-Code in unserem Client importieren.

Lass uns nun die Prozedur auf unserem Frontend aufrufen. tRPC stellt einen Wrapper für `@tanstack/react-query` bereit, der es dir ermöglicht, die volle Stärke dieser Hooks zu nutzen, aber mit dem zusätzlichen Vorteil, dass deine API-Aufrufe typisiert sind. Wir können unsere Prozeduren von unserem Frontend aus wie folgt aufrufen:

```tsx:pages/users/[id].tsx
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

Du wirst sofort bemerken, wie gut die Autovervollständigung und die Typsicherheit ist. Sobald du `trpc.` schreibst werden deine Router in der Autovervollständigung angezeigt.
Wenn du nun einen Router auswählst, werden auch seine Prozeduren angezeigt. Wenn dein Input nicht mit dem Validator übereinstimmt, den du im Backend definiert hast, erhältst du einen TypeScript-Fehler.

## Wie rufe ich meine API von extern auf?

Mit regulären APIs kannst du deine Endpunkte mit jedem HTTP-Client wie `curl`, `Postman`, `fetch` oder direkt aus deinem Browser aufrufen. Mit tRPC ist es ein bisschen anders. Wenn du deine Prozeduren ohne den tRPC-Client aufrufen möchtest, gibt es zwei empfohlene Möglichkeiten:

### Eine einzelne Prozedur extern verfügbar machen

Wenn du eine einzelne Prozedur extern verfügbar machen möchtest, bist du auf [serverseitige Aufrufe](https://trpc.io/docs/v10/server-side-calls) angewiesen. Das würde es dir ermöglichen, einen normalen Next.js-API-Endpunkt zu erstellen, aber die Resolver-Teil deiner tRPC-Prozedur wiederverwenden.

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

### Alle Prozeduren als REST-Endpunkt verfügbar machen

Wenn du jede einzelne Prozedur extern verfügbar machen möchtest, schau dir das von der Community erstellte Plugin [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master) an. Hiermit kannst du aus deinem tRPC-Router eine OpenAPI-konforme REST-API generieren, indem du zusätzliche Metadaten zu deinen Prozeduren hinzufügst.

### Es sind lediglich HTTP-Anfragen

tRPC kommuniziert über HTTP, so dass es auch möglich ist, deine tRPC-Prozeduren mit "normalen" HTTP-Anfragen aufzurufen. Die Syntax kann jedoch aufgrund des [RPC-Protokolls](https://trpc.io/docs/v10/rpc), das tRPC verwendet, umständlich sein. Wenn du neugierig bist, dann schau im Netzwerktab vom deinem Browser wie die tRPC Anfragen und Antworten aussehen. Wir empfehlen dies jedoch nur zum Lernzweck und würden dir raten, in der Regel eine der oben genannten Lösungen zu verwenden.

## Vergleich zu einem Next.js API-Endpunkt

Let's compare a Next.js API endpoint to a tRPC procedure. Let's say we want to fetch a user object from our database and return it to the frontend. We could write a Next.js API endpoint like this:

Lass uns nun einen Next.js-API-Endpunkt mit einer tRPC-Prozedur vergleichen. Gehen wir davon aus, dass wir ein Benutzerobjekt aus unserer Datenbank abrufen möchten und es dann an das Frontend zurückgeben. Wir könnten einen Next.js-API-Endpunkt wie folgt schreiben:

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

Wenn wir das nun mit dem tRPC Beispiel von davor vergleichen, lassen sich folgende Vorteile von tRPC erkennen:

- Anstatt für jede Route eine URL anzugeben, was bei Änderungen an der Struktur des Projekts zu Fehlern führen kann, ist dein gesamter Router ein Objekt mit Autovervollständigung.
- Du musst nicht validieren, welche HTTP-Methode verwendet wurde.
- You don’t need to validate that the request query or body contains the correct data in the procedure, because Zod takes care of this.
- Du musst nicht validieren, ob die "request query" der "request body" die richtigen Daten enthält, da Zod sich darum kümmert.
- Anstatt eine Antwort zu erstellen, kannst du Fehler werfen und einen Wert oder ein Objekt zurückgeben, wie du es in jeder anderen TypeScript-Funktion tun würdest.
- Das Aufrufen der Prozedur auf dem Frontend bietet Autovervollständigung und Typsicherheit.

## Nützliche Snippets

Hier sind einige Snippets, die vielleicht nützlich sein könnten.

### CORS aktivieren

Wenn du deine API von einer anderen Domain konsumieren musst, zum Beispiel in einem Monorepo, das eine React Native App enthält, musst du möglicherweise CORS aktivieren:

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

### Optimistische Updates

Optimitische Updates sind Updates, die wir vornehmen, bevor die API-Anfrage abgeschlossen ist. Dies bietet dem Benutzer eine bessere Erfahrung, da er nicht darauf warten muss, dass die API-Anfrage abgeschlossen ist, bevor die Benutzeroberfläche das Ergebnis seiner Aktion widerspiegelt. Apps, die die Richtigkeit der Daten sehr schätzen, sollten jedoch Optimistische Updates vermeiden, da sie nicht die "wahren" Daten des Backends widerspiegeln. Du kannst mehr darüber in der [React Query Dokumentation](https://tanstack.com/query/v4/docs/guides/optimistic-updates) lesen.

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

### Beispiel Integrationstest

Hier ist ein Beispiel für einen Integrationstest, der [Vitest](https://vitest.dev) verwendet, um zu überprüfen, ob dein tRPC-Router wie erwartet funktioniert, der Eingabe-Parser den richtigen Typ ableitet und die zurückgegebenen Daten mit dem erwarteten Ergebnis übereinstimmen.

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

## Nützliche Ressourcen

| Resource              | Link                                                    |
| --------------------- | ------------------------------------------------------- |
| tRPC Docs             | https://www.trpc.io                                     |
| Einige tRPC Beispiele | https://github.com/trpc/trpc/tree/next/examples         |
| React Query Docs      | https://tanstack.com/query/v4/docs/adapters/react-query |
