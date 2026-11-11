---
title: tRPC
description: Korzystanie z tRPC
layout: ../../../layouts/docs.astro
lang: pl
---

tRPC pozwala nam pisanie API będących w pełni typesafe bez żadnego generowania kodu czy też zaśmiecania runtime'u. Korzysta on ze świetnego type inference od Typecripta aby przekazywać definicje routerów oraz pozwala Ci na korzystanie z procedur API na frontendzie z pełnym tyepsafety i autouzupełnianiem. Jeśli korzystasz z tRPC, twój frontend i backend będą sprawiały wrażenie bycia bardziej połączonymi niż kiedykolwiek, pozwalając na niespotykany DX (developer experience).

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Zbudowałem tRPC aby umożliwić każdemu szybsze robienie postępów, usuwając przy tym potrzebę korzystania z tradycyjnej wartswy API oraz zachowując pewność, iż nasze aplikacje nie zepsują się nadążając za własnym rozwojem.<span aria-hidden="true">&quot;</span>
      <br />
      <span className="text-xs opacity-70"><span aria-hidden="true">&quot;</span>Oryginał: I built tRPC to allow people to move faster by removing the need of a traditional API-layer, while still having confidence that our apps won't break as we rapidly iterate.<span aria-hidden="true">&quot;</span></span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 mr-4 rounded-full bg-neutral-500"
      src="https://avatars.githubusercontent.com/u/459267?v=4"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Alex - twórca tRPC</span>
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

## Jak korzystać z tRPC?

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Making typesafe APIs easy with tRPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Kontrybutor tRPC [trashh_dev](https://twitter.com/trashh_dev) zrobił [znakomity występ na Next.js Conf](https://www.youtube.com/watch?v=2LYM8gf184U) właśnie o tRPC. Jeżeli jeszcze się z nim nie zapoznałeś, bardzo polecamy Ci to zrobić.

Z tRPC, piszesz funkcje w TypeScript'cie na backendzie a następnie wywołujesz je z frontendu. Prosta procedura tRPC wyglądać może tak:

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

Jest to procedura (odpowiednik handlera route'a w tradycyjnym API), która najpierw waliduje wejście/input korzystając z biblioteki Zod (jest to ta sama biblioteka, z której korzystamy podczas sprawdzania [zmiennych środowiskowych](./env-variables)) - w tym przypadku zapewnia ona, iż dane przesłane do API są w formie tekstu (stringa). Jeżeli jednak nie jest to prawda, API wyśle informatywny błąd.

Po sprawdzeniu wejścia, dołączamy funkcję, która może być albo [query](https://trpc.io/docs/v10/react-queries), albo [mutacją](https://trpc.io/docs/v10/react-mutations), albo [subscrypcją](https://trpc.io/docs/v10/subscriptions). W naszym przykładzie, funkcja ta (zwana "resolverem") wysyła zapytanie do bazy danych korzystając z naszego klienta [prisma](./prisma) i zwraca użytkownika z pasującym do wysłanego `id`.

Swoje procedury definiujesz w folderze `routers`, który reprezentuje kolekcję pasujących procedur ze wspólnej przestrzeni. Możesz mieć router `users`, router `posts` i router `messages`. Routery te mogą zostać następnie połączone w jeden, scentralizowany `appRouter`:

```ts:server/api/root.ts
const appRouter = createTRPCRouter({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

Zwróć uwagę na to, iż musimy eksportować jedynie definicje typów tego routera - oznacza to, iż nigdy nie importujemy kodu serwera po stronie klienta.

Wywołajmy teraz procedurę na naszym frontendzie. tRPC dostarcza nam wrapper dla paczki `@tanstack/react-query`, który pozwala ci wykorzystać pełną moc hooków. Dodatkowo, zapytania API dostajesz w pełni "otypowane". Zapytanie do naszych procedur możemy wykonać w następujący sposób:

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

Natychmiast zauważysz, jak dobrze działa type-safety i autouzupełnianie. Jak tylko napiszesz `trpc.`, twoje routery automatycznie pojawią się w opcjach autopodpowiedzi a kiedy tylko wybierzesz router, również znajdą się tam jego procedury. Otrzymasz także błąd TypeScripta, jeżeli wejście (input) nie będzie zgadzać się z tym, podanym do systemu walidacji na backendzie.

## Korzystanie z błędów biblioteki Zod

Domyślnie `create-t3-app` konfiguruje [error formatter](https://trpc.io/docs/error-formatting), który pozwala pobierać błędy z biblioteki Zod, jeśli na backendzie wystąpią błędy walidacji.

Przykładowe użycie:

```tsx
function MyComponent() {
  const { mutate, error } = api.post.create.useMutation();

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      mutate({ title: formData.get('title') });
    }}>
      <input name="title" />
      {error?.data?.zodError?.fieldErrors.title && (
        {/** `mutate` returned with an error on the `title` */}
        <span className="mb-8 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </span>
      )}

      ...
    </form>
  );
}
```

## Pliki

tRPC wymaga dużo boilerplate'u, który `create-t3-app` przygotowuje za Ciebie. Przejdźmy więc po kolei po plikach, które są generowane:

### 📄 `pages/api/trpc/[trpc].ts`

Jest to właściwy punkt początkowy dla twojego API - to on ujawnia dla reszty aplikacji twój router od tRPC. Prawdopodobnie nie będziesz musiał edytować tego pliku, ale jeżeli zajdzie taka potrzeba (np. do włączenia CORSa), warto wiedzieć o tym, iż eksportowany `createNextApiHandler` to [Next.js API handler](https://nextjs.org/docs/api-routes/introduction), który pobiera obiekt [zapytania](https://developer.mozilla.org/en-US/docs/Web/API/Request) i [odpowiedzi](https://developer.mozilla.org/en-US/docs/Web/API/Response) serwera. Oznacza to, iż możesz zawrzeć `createNextApiHandler` w middleware, w jakim tylko chcesz. Poniżej znajdziesz [przykładowy kod](#aktywacja-cors), dzięki któremu dodasz CORS.

### 📄 `server/api/trpc.ts`

Plik ten podzielony jest na dwie części - tworzenie kontekstu oraz inicjalizacji tRPC:

1. Definiujemy kontekst przesyłany do procedur tRPC. Kontekst, to dane do których dostęp mają wszystkie twoje procedury tRPC. Jest to doskonałe miejsce do umieszczenia rzeczy, takich jak połączenia z bazą danych, informacje o uwierzytelnianiu, itp. W Create T3 App korzystamy z dwóch funkcji, aby umożliwić korzystanie z części kontekstu bez dostępu do obiektu zapytania.

- `createInnerTRPCContext`: Tutaj definiujesz kontekst, który nie zależy od obiektu zapytania, np. połączenie z bazą danych. Możesz wykorzystać tą funkcję do [testów integracji](#przykładowy-test-integracji) oraz [funkcji pomocniczych SSG](https://trpc.io/docs/v10/ssg-helpers), gdzie nie posiadasz obiektu zapytania.

- `createTRPCContext`: Tutaj definiujesz kontekst, który zależny jest od zapytania, np. sesja użytkownika. Otrzymujesz sesję korzystając z obiektu `opts.req`, a następnie posyłasz ją do funkcji `createInnerTRPCContext` w celu utworzenia finalnego kontekstu.

2. Inicjalizujemy tRPC i definiujemy [procedury](https://trpc.io/docs/v10/procedures) oraz [middleware](https://trpc.io/docs/v10/middlewares). Umownie, nie powinieneś eksportować całego obiektu `t` a jedynie poszczególne procedury i middleware.

Zwróć uwagę, iż korzystamy z paczki `superjson` jako [transformera danych](https://trpc.io/docs/v10/data-transformers). Umożliwia on na zachowanie typów danych, które otrzymuje klient - przykładowo, posyłając obiekt `Date`, klient również otrzyma obiekt `Date` - a nie tekst, w przeciwieństwie do wielu innych API.

### 📄 `server/api/routers/*.ts`

Tutaj definiujesz routery i procedury swojego API. Umownie, powinieneś tworzyć [osobne routery](https://trpc.io/docs/v10/router) dla odpowiadających im procedur.

### 📄 `server/api/root.ts`

Tutaj [łączymy](https://trpc.io/docs/v10/merging-routers) wszystkie "sub-routery" zdefiniowane w folderze `routers/**` w jeden router aplikacji.

### 📄 `utils/api.ts`

Jest to punkt startowy tRPC po stronie frontendu. To tutaj importować będziesz wszystkie **definicje typów** i tworzyć będziesz swój client tRPC razem z hookami od react-query. Ponieważ korzystamy z paczki `superjson` jako transformera danych na backendzie, musimy go uruchomić również na frontendzie. Dzieje się tak, ponieważ dane serializowane w API muszą być dekodowane właśnie na frontendzie.

Zdefiniujesz tu także [linki](https://trpc.io/docs/v10/links) tRPC, które decydują o całym flow zapytania - od klienta do serwera. My korzystamy z "domyślnego" linku [`httpBatchLink`](https://trpc.io/docs/v10/client/links/httpBatchLink), który umożliwia ["request batching"](https://cloud.google.com/compute/docs/api/how-tos/batch). Korzystamy też z linku [`loggerLink`](https://trpc.io/docs/v10/links/loggerLink), pozwalającego na wyświetlanie przydatnych podczas pisania aplikacji logów.

Na koniec eksportujemy [pomocniczy typ](https://trpc.io/docs/v10/infer-types#additional-dx-helper-type), którego użyć możesz do dziedziczenia typów na frontendzie.

## Jak wykonać zewnętrzne zapytania do mojego API?

Korzystając z regularnego API, zapytania takie możesz wykonać korzystając z klientów HTTP takich jak `curl`, `Postman`, `fetch`, czy tez bezpośrednio z przeglądarki. Z tRPC sprawa wygląda jednak inaczej. Jeżeli chcesz wykonać takie zapytania bez klienta tRPC, możesz skorzystać z jedngo z dwóch polecanych na to sposobów:

### Ujawnianie zewnętrznie pojedynczej procedury tRPC

Jeżeli chcesz ujawnić zewnętrznie pojedynczą procedurę, powinieneś skorzystać z [zapytań po stronie serwera](https://trpc.io/docs/v10/server-side-calls). Pozwoli Ci to na wykonanie standardowego endpointa Next.js, ale użyje części "resolvera" twojej procedury tRPC.

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter, createCaller } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  const ctx = await createTRPCContext({ req, res });
  const caller = createCaller(ctx);
  try {
    const { id } = req.query;
    const user = await caller.user.getById(id);
    res.status(200).json(user);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occurred
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // Another error occurred
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default userByIdHandler;
```

### Ujawnianie wszystkich procedur tRPC jako endpointów REST

Jeżeli chcesz ujawnić zewnętrznie wszystkie procedury tRPC, sprawdź rozszerzenie stworzone przez społeczność - [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master). Dostarczając dodatkowych metadanych do twoich procedur, wygenerować możesz REST API zgodne z OpenAPI ze swoich routerów tRPC.

### To tylko zapytania HTTP

tRPC komunikuje się za pomocą HTTP, więc masz także możliwość wykonywania zapytań do swoich procedur korzystając właśnie z "regularnych" zapytań HTTP. Składnia może wydawać się jednak nieporęczna z powodu wykorzystywanego przez tRPC [protokołu RPC](https://trpc.io/docs/v10/rpc). Jeżeli jesteś ciekawy jak on działa, możesz zobaczyć jak wyglądają zapytania tRPC w zakładce "sieć" w swojej przeglądarce - polecamy robić to jednak tylko w celach edukacyjnych i skorzystać z jednego z rozwiązań przedstawionych powyżej.

## Porównanie do endpointu API Next.js

Porównajmy endpoint API Next.js z procedurą tRPC. Powiedzmy, że chcemy pobrać ubiekt użytkownika z naszej bazy danych i zwrócić go na frontend. Endpoint API Next.js napisać moglibyśmy w następujący sposób>+:

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

Porównaj to do powyższego przykładu z tRPC - zobaczysz zalety korzystanie właśnie z tego sposobu:

- Zamiast precyzować url dla każdego route'a (co może stać się uciążliwe do debugowania, jeśli coś przeniesiesz), twój cały router jest obiektem z autouzupełnianiem.
- Nie musisz walidować użytej metody HTTP.
- Nie musisz walidować zawartości zapytania pod kątem pooprawności zawartych danych - zajmuje się tym Zod.
- Zamiast tworzyć obiekt "response", możesz wyrzucać błędy i zwracać wartości lub obiekty tak, jak robiłbyś to w zwykłej funkcji TypeScripta.
- Wywoływanie procedury na frontendzie dostarcza Ci autouzupełniania i type-safety.

## Przydatne fragmenty

Znajdziesz tutaj fragmenty kodu, które mogą Ci się przydać.

### Aktywacja CORS

Jeżeli chcesz korzystać z API z różnych domen, np. w monorepo zawierającym aplikację React Native, możesz chcieć włączyć CORS:

```ts:pages/api/trpc/[trpc].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import cors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Włącz cors
  await cors(req, res);

  // Stwórz i wywołaj handler tRPC
  return createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
  })(req, res);
};

export default handler;
```

### "Optimistic updates"

Aktualizacje danych zwane "Optimistic updates" zachodzą wtedy, kiedy aktualizujemy UI, zanim zapytanie API zostanie ukończone. Dostarcza to lepsze doświadczenie użytkownika, ponieważ nie musi on czekać na ukończenie zapytania API, aby zobaczyć odzwierciedlenie zmian w interfejsie aplikacji. Pamiętaj jednak, że aplikacje, które cenią sobie poprawność danych, powinny za wszelką cenę unikać aktualizacji "optimisic updates" - nie są one "poprawną" reprezentacją stanu backendu. Więcej na ich temat możesz poczytać w [dokumentacji React Query](https://tanstack.com/query/v4/docs/guides/optimistic-updates).

```tsx
const MyComponent = () => {
  const listPostQuery = api.post.list.useQuery();

  const utils = api.useContext();
  const postCreate = api.post.create.useMutation({
    async onMutate(newPost) {
      // Anuluj wychodzące zapytania (aby nie nadpisały one "optimistic update'u")
      await utils.post.list.cancel();

      // Otrzymaj dane z queryCache
      const prevData = utils.post.list.getData();

      // Zaktualizuj dane z naszego nowego postu
      utils.post.list.setData(undefined, (old) => [...old, newPost]);

      // Zwróć poprzednie dane, aby w razie błędu można było z nich przywrócić stan aplikacji
      return { prevData };
    },
    onError(err, newPost, ctx) {
      // Jeżeli mutacja wyrzuci błąd, skorzystaj z wartości kontekstu z onMutate
      utils.post.list.setData(undefined, ctx.prevData);
    },
    onSettled() {
      // Zsynchronizuj z serwerem po ukończonej mutacji
      utils.post.list.invalidate();
    },
  });
};
```

### Przykładowy Test Integracji

Tu znajdziesz przykładowy test integracji korzystający z paczki [Vitest](https://vitest.dev), aby sprawdzić, czy router tRPC działa poprawnie, czy parser danych wejściowych dziedziczy odpowiedni typ, oraz czy zwracane dane pasują do oczekiwanego outputu.

```ts
import { type inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest";

import { appRouter, type AppRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

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

Jeżeli twoja procedura jest chroniona, możesz przesłać stworzony obiekt `session` tworząc kontekst:

```ts
test("protected example router", async () => {
  const ctx = await createInnerTRPCContext({
    session: {
      user: { id: "123", name: "John Doe" },
      expires: "1",
    },
  });
  const caller = appRouter.createCaller(ctx);
  // ...
});
```

## Przydatne Zasoby

| Zasób                    | Link                                                    |
| ------------------------ | ------------------------------------------------------- |
| Dokumentacja tRPC        | https://www.trpc.io                                     |
| Parę przykładów z tRPC   | https://github.com/trpc/trpc/tree/next/examples         |
| Dokumentacja React Query | https://tanstack.com/query/v4/docs/adapters/react-query |
