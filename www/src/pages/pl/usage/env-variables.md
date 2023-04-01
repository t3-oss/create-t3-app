---
title: Zmienne Środowiskowe
description: Jak zacząć z Create T3 App
layout: ../../../layouts/docs.astro
lang: pl
---

Create T3 App korzysta z paczki [Zod](https://github.com/colinhacks/zod) w celu walidacji twoich zmiennych środowiskowych podczas runtime'u _oraz_ budowania aplikacji. Dołączane są z tego powodu dodatkowe narzędzia w pliku `src/env.mjs`.

## env.mjs

_TLDR; Jeżeli chcesz dodać nową zmienną środowiskową, musisz dodać ją zarówno do pliku `.env`, jak i zdefiniować jej walidator w pliku `src/env.mjs`._

Plik ten podzielony jest na dwie części - schemat zmiennych i wykorzystywanie obiektu `process.env`, jak i logika walidacji. Logika ta nie powinna być zmieniana.

```ts:env.mjs
const server = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
});

const client = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};
```

### Schemat Dla Serwera

Zdefiniuj tutaj zmienne środowiskowe dla serwera.

Koniecznie **nie** prefixuj tutejszych kluczy `NEXT_PUBLIC_`, aby nie "zleakować" ich przypadkowo do klienta.

### Schemat Dla Klienta

Zdefiniuj tutaj zmienne środowiskowe dla klienta.

Aby ujawnić zmienne dla klienta dodaj prefix `NEXT_PUBLIC`. Jeżeli tego nie zrobisz, walidacja nie zadziała, pomagając ci w wykryciu niewłaściwej konfiguracji.

### Obiekt `processEnv`

Wykorzystaj ("destructuj") tutaj obiekt `process.env`.

Potrzebny jest nam obiekt, który parse'ować możemy z naszymi schematami Zoda, a z powodu sposobu w jaki Next.js przetwarza zmienne środowiskowe, nie możesz destructować obiektu `process.env` tak jak zwykłego obiektu - trzeba to zrobić manualnie.

TypeScript zapewni poprawność destrukcji obiektu i zapobiegnie sytuacji, w której zapomnisz o jakimś kluczu.

```ts
// ❌ To nie zadziała, musimy ręcznie "rozbić" `process.env`
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const validated = schema.parse(process.env);
```

### Logika Walidacji

_Dla zainteresowanego czytelnika:_

<details>
<summary>Zaawansowane: Logika walidacji</summary>

W zależności od środowiska (seerwer lub klient) walidujemy albo oba schematy, albo tylko schemat klienta. Oznacza to, iż nawet jeśli zmienne środowiskowe serwera nie będą zdefiniowane, nie zostanie wyrzucony błąd walidacji - możemy więc mieć jeden punkt odniesienia do naszych zmiennych.

```ts:env.mjs
const isServer = typeof window === "undefined";

const merged = server.merge(client);
const parsed = isServer
  ? merged.safeParse(processEnv)  // <-- na serwerze, sprawdź oba schematy
  : client.safeParse(processEnv); // <-- na kliencie, sprawdź tylko zmienne klienta

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(parsed.error.format()),
  );
  throw new Error("Invalid environment variables");
}
```

Następnie korzystamy z obiektu proxy, aby wyrzucać błędy, jeśli chcesz skorzystać z serwerowych zmiennych środowiskowych na kliencie.

```ts:env.mjs
// proxy pozwala na zmianę gettera
export const env = new Proxy(parsed.data, {
  get(target, prop) {
    if (typeof prop !== "string") return undefined;
    // na kliencie pozwalamy jedynie na zmienne NEXT_PUBLIC_
    if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
      throw new Error(
        "❌ Attempted to access serverside environment variable on the client",
      );
    return target[prop]; // <-- w przeciwnym razie, zwróć wartość
  },
});
```

## Korzystanie Ze Zmiennych Środowiskowych

Jeżeli chcesz skorzystać ze swoich zmiennych środowiskowych, możesz zaimportować je z pliku `env.mjs` i skorzystać z nich tak, jak normalnie byłoby to możliwe. Jeżeli zaimportujesz obiekt ten na kliencie i spróbujesz skorzystać ze zmiennych serwera, wystąpi błąd runtime.

```ts:pages/api/hello.ts
import { env } from "../../env.mjs";

// `env` jest w pełni typesafe i zapewnia autouzupełnianie
const dbUrl = env.DATABASE_URL;
```

```ts:pages/index.tsx
import { env } from "../env.mjs";

// ❌ Wyrzuci to błąd runtime
const dbUrl = env.DATABASE_URL;

// ✅ To jest ok
const wsKey = env.NEXT_PUBLIC_WS_KEY;
```

## .env.example

Ponieważ plik `.env` nie jest wrzucany na system kontroli wersji, dołączamy także plik `.env.example`, w którym - jesli chcesz - możesz zawrzeć kopię pliku `.env` z usuniętymi secretami. Nie jest to wymagane, jednak polecamy trzymać aktualną kopię przykładowego pliku, aby ułatwić potencjalnym kontrybutorom rozpoczęcie pracy w ich środowisku.

Niektóre frameworki i narzędzia do budowania, takie jak Next.js, zalecają przechowywanie sekretnych wartości w pliku `.env.local` i commitowanie plików `.env` do projektu. Nie jest to przez nas jednak rekomendowane, ponieważ może to łatwo prowadzić do przypadkowego ujawnienia tych wartości. Polecamy natomiast przechowywanie sekretnych wartości w pliku `.env`, trzymanie pliku tego w `.gitignore` i commitowanie jedynie plików `.env.example`.

## Dodawanie Zmiennych Środowiskowych

Aby upewnić się, że twój projekt nie zbuduje się bez wymaganych zmiennych środowiskowych, będziesz musiał dodać nową zmienną w **dwóch** miejscach:

📄 `.env`: Wprowadź swoją zmienną środ. tak, jak to zwykle robisz (np. `KLUCZ=WARTOŚĆ`)

📄 `env.mjs`: Dodaj odpowiadającą jej logikę walidacji definiując schemat Zod, np. `KLUCZ: z.string()`. Następnie wykorzystaj obiekt `process.env` w `processEnv`, np. `KEY: process.env.KEY`.

Opcjonalnie możesz zaktualizować plik `.env.example`:

📄 `.env.example`: Wprowadź swoją zmienną środowiskową, upewnij się jednak że nie nie posiada ona wartości, która jest sekretna, np. `KLUCZ=WARTOŚĆ` lub `KLUCZ=`

### Przykład

_Chcę dodać mój token do API Twittera jako zmienną środowiskową po stronie serwera_

1. Dodaj zmienną środ. do pliku `.env`:

```
TWITTER_API_TOKEN=1234567890
```

2. Dodaj zmienną środowiskową do pliku `env.mjs`:

```ts
export const server = z.object({
  // ...
  TWITTER_API_TOKEN: z.string(),
});

export const processEnv = {
  // ...
  TWITTER_API_TOKEN: process.env.TWITTER_API_TOKEN,
};
```

_**UWAGA:** Pusty string to dalej string, więc `z.string()` zaakceptuje każdy pusty tekst jako poprawną wartość. Jeżeli chcesz, by wartość była wymagana (i nie pusta!), możesz użyć `z.string().min(1)`._

3. opcjonalnie: Dodaj zmienną środowiskową do `.env.example`. Usuń jednak token.

```
TWITTER_API_TOKEN=
```
