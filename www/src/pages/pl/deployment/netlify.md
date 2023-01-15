---
title: Netlify
description: Deployment na platformie Netlify
layout: ../../../layouts/docs.astro
---

Netlify, to alternatywny provider do deploymentu z podobnym założeniem do Vercela. Po przykładowe repozytorium bazujące na tej stronie, zobacz [`ajcwebdev/ct3a-netlify`](https://github.com/ajcwebdev/ct3a-netlify).

## Dlaczego hostować na Netlify'u?

Racjonalizm podpowiadać może, iż Vercel ma znakomite wsparcie dla Next.js, ponieważ to właśnie on jest jego twórcą. Vercel ma duży biznes w zapewnianiu optymalnego doświadczenia i wydajności z Next.js na swojej platformie. W większości przypadków będzie to prawda i zmiana ścieżki z Vercelem nie będzie miała sensu.

Często powtarzane jest także to, iż wiele funkcji z Next.js ma wsparcie jedynie na Vercelu. Chociaż prawdą jest to, iż nowe funkcje Next.js testowane i wspierane będą na Vercelu od razu po wydaniu, warto pamiętać, iż inni dostawcy, tacy jak Netlify, [szybko implementują i wdrażają wsparcie](https://www.netlify.com/blog/deploy-nextjs-13/) dla [stabilnych funkcji Next.js](https://docs.netlify.com/integrations/frameworks/next-js/overview/).

Zależnie od tego, co dana aplikacja potrzebuje, każda strona od deploymentu posiada swoje wady i zalety - żadna strona nie jest w stanie rozwiązać wszystkich problemów. Przykładowo, Netlify zbudował swój własny [runtime Next.js](https://github.com/netlify/next-runtime) dla własnych Edge Functions (które działają na Deno Deploy) i [utrzymuje unikalny middleware pozwalający na dostęp i modyfikację odpowiedzi HTTP](https://github.com/netlify/next-runtime#nextjs-middleware-on-netlify).

> _UWAGA: Aby obserwować status niestabilnych funkcji Next.js, zobacz [Korzystanie z folderu `app` od Next 13 na Netlify](https://github.com/netlify/next-runtime/discussions/1724)._

## Konfiguracja Projektu

Jest wiele sposobów na konfigurację sposobu budowania aplikacji bezpośrednio poprzez narzędzie CLI od Netlify, czy też dashboard Netlify. Choć nie jest to wymagane, polecamy stworzyć i dołączyć plik [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/). Zapewnia to, iż system budowania sklonowanych i zforkowanych wersji twojego projektu będzie łatwiejszy w odwzorowaniu.

```toml
[build]
  command = "next build"
  publish = ".next"
```

## Korzystanie z Dashboardu Netlify

1. Wrzuć swój kod do repozytorium GitHuba i zarejestruj się na stronie [Netlify](https://app.netlify.com/signup). Po stworzeniu konta, kliknij na **Add new site** (dodaj nową stronę) a następnie na **Import an existing project** (zaimportuj istniejący projekt).

![Nowy projekt na Netlify](/images/netlify-01-new-project.webp)

2. Połącz swojego dostawcę Gita.

![Importowanie repozytorium](/images/netlify-02-connect-to-git-provider.webp)

3. Wybierz repozytorium swojego projektu.

![Wybierz repozytorium swojego projektu](/images/netlify-03-pick-a-repository-from-github.webp)

4. Netlify wykryje, czy posiadasz plik `netlify.toml` i automatycznie skonfiguruje polecenia budowania i publikowany folder.

![Ustawienia budowania Next.js](/images/netlify-04-configure-build-settings.webp)

5. Kliknij na **Show advanced** (pokaż zaawansowane) a następnie na **New variable** (nowa zmienna), aby dodać swoje zmienne środowiskowe.

![Dodaj zmienne środowiskowe](/images/netlify-05-env-vars.webp)

6. Kliknij na **Deploy site** (opublikuj stronę), poczekaj aż budowanie się zakończy i otwórz swoją nową stronę.

## Korzystanie z nadzędzia CLI Netlify

Aby wrzucić stronę z konsoli, musisz najpierw opublikować swój projekt do repozytorium na GitHubie i [zainstalować narzędzie CLI od Netlify](https://docs.netlify.com/cli/get-started/). Możesz zainstalować `netlify-cli` jako zależność projektu, lub globalnie na swoim urządzeniu korzystając z polecenia:

```bash
npm i -g netlify-cli
```

Aby przetestować lokalnie swój projekt, uruchom polecenie [`ntl dev`](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment) i otwórz [`localhost:8888`](http://localhost:8888/), aby zobaczyć lokalnie odpaloną aplikację Netlify.

```bash
ntl dev
```

Uruchom polecenie [`ntl init`](https://docs.netlify.com/cli/get-started/#continuous-deployment) aby skonfgurować swój projekt:

```bash
ntl init
```

Zaimportuj zmienne środowiskowe swojego projektu z pliku `.env` poleceniem [`ntl env:import`](https://cli.netlify.com/commands/env#envimport):

```bash
ntl env:import .env
```

Wrzuć do sieci swój projekt korzystając z polecenia [`ntl deploy`](https://docs.netlify.com/cli/get-started/#manual-deploys). Aby zbudować projekt przed jego publikacją, będziesz musiał dodać flagę `--build`. Aby wrzucić projekt pod główny URL aplikacji, dodaj flagę `--prod`:

```bash
ntl deploy --prod --build
```

Aby zobaczyć działający przykład na Netlify, odwiedź stronę[ct3a.netlify.app](https://ct3a.netlify.app/).
