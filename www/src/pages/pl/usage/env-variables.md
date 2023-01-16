---
title: Zmienne Środowiskowe
description: Jak zacząć z Create T3 App
layout: ../../../layouts/docs.astro
lang: pl
---

Create T3 App korzysta z paczki [Zod](https://github.com/colinhacks/zod) w celu walidacji twoich zmiennych środowiskowych podczas runtime'u _oraz_ budowania aplikacji. Dołączane są z tego powodu dodatkowe pliki w folderze `env`:

📁 src/env

┣ 📄 client.mjs

┣ 📄 schema.mjs

┣ 📄 server.mjs

Ich zawartość może na początku wyglądać strasznie, ale nie martw się. Nie jest to tak skomplikowane, jak może Ci się wydawać. Przyjrzyjmy się każdemu z nich po kolei i przejdźmy przez proces dodawania nowej zmiennej środowiskowej.

_TLDR; Jeżeli chcesz dodać nową zmienną środowiskową, musisz dodać ją zarówno do pliku `.env` jak i zdefiniować walidator w pliku `env/schema.mjs`._

## schema.mjs

Jest to plik, który faktycznie będziesz edytować. Zawiera dwa schematy, jeden dla zmiennych środ. po stronie serwera, a drugi dla tych po stronie klienta (obiekt `clientEnv`).

```ts:env/schema.mjs
export const serverSchema = z.object({
  // DATABASE_URL: z.string().url(),
});

export const clientSchema = z.object({
  // NEXT_PUBLIC_WS_KEY: z.string(),
});
```

### Schemat Dla Serwera

Zdefiniuj tutaj zmienne środowiskowe dla serwera.

Koniecznie **nie** prefixuj tutejszych kluczy `NEXT_PUBLIC_`. Jeżeli to zrobisz, walidacja nie zadziała, pomagając ci w wykryciu niewłaściwej konfiguracji.

### Schemat Dla Klienta

Zdefiniuj tutaj zmienne środowiskowe dla klienta.

Aby ujawnić zmienne dla klienta dodaj prefix `NEXT_PUBLIC`. Jeżeli tego nie zrobisz, walidacja nie zadziała, pomagając ci w wykryciu niewłaściwej konfiguracji.

```ts
// ❌ To nie zadziała, musimy ręcznie "rozbić" `process.env`
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const validated = schema.parse(process.env);
```

## server.mjs & client.mjs

To tutaj zachodzi walidacja i eksport poprawnych obiektów. Nie powinna zajść potrzeba ich edycji.

## Korzystanie Ze Zmiennych Środowiskowych

Jeżeli chcesz skorzystać ze swoich zmiennych środowiskowych, możesz zaimportować je z pliku `env/client.mjs` lub `env/server.mjs`, w zależności od tego, gdzie chcesz używać tych zmiennych:

```ts:pages/api/hello.ts
import { env } from "../../env/server.mjs";

// `env` jest w pełni typesafe i pozwala na autouzupełnianie
const dbUrl = env.DATABASE_URL;
```

## .env.example

Ponieważ plik `.env` nie jest wrzucany na system kontroli wersji, dołączamy także plik `.env.example`, w którym - jesli chcesz - możesz zawrzeć kopię pliku `.env` z usuniętymi secretami. Nie jest to wymagane, jednak polecamy trzymać aktualną kopię przykładowego pliku, aby ułatwić potencjalnym kontrybutorom rozpoczęcie pracy w ich środowisku.

Niektóre frameworki i narzędzia do budowania, takie jak Next.js, zalecają przechowywanie sekretnych wartości w pliku `.env.local` i commitowanie plików `.env` do projektu. Nie jest to przez nas jednak rekomendowane, ponieważ może to łatwo prowadzić do przypadkowego ujawnienia tych wartości. Polecamy natomiast przechowywanie sekretnych wartości w pliku `.env`, trzymanie pliku tego w `.gitignore` i commitowanie jedynie plików `.env.example`.

## Dodawanie Zmiennych Środowiskowych

Aby upewnić się, że twój projekt nie zbuduje się bez wymaganych zmiennych środ., będziesz musiał dodać nową zmienną w **dwóch** miejscach:

📄 `.env`: Wprowadź swoją zmienną środ. tak, jak to zwykle robisz (np. `KLUCZ=WARTOŚĆ`)

📄 `schema.mjs`: Dodaj odpowiadającą jej logikę walidacji definiując schemat Zod, np. `KLUCZ: z.string()`

Opcjonalnie możesz zaktualizować plik `.env.example`:

📄 `.env.example`: Wprowadź swoją zmienną środ., upewnij się jednak że nie nie posiada ona wartości, która jest sekretna, np. `KLUCZ=WARTOŚĆ` lub `KLUCZ=`

### Przykład

_Chcę dodać mój token do API Twittera jako zmienną środowiskową po stronie serwera_

1. Dodaj zmienną środ. do pliku `.env`:

```
TWITTER_API_TOKEN=1234567890
```

2. Dodaj zmienną środowiskową do pliku `schema.mjs`:

```ts
export const serverSchema = z.object({
  // ...
  TWITTER_API_TOKEN: z.string(),
});
```

_**UWAGA:** Pusty string to dalej string, więc `z.string()` zaakceptuje każdy pusty tekst jako poprawną wartość. Jeżeli chcesz, by wartość była wymagana (i nie pusta!), możesz użyć `z.string().min(1)`._

1. opcjonalnie: Dodaj zmienną środowiskową do `.env.example`. Usuń jednak token.

```
TWITTER_API_TOKEN=
```
