---
title: Vercel
description: Deployment na platformie Vercel
layout: ../../../layouts/docs.astro
lang: pl
---

Polecamy wykonywać deployment twojej aplikacji na platformę [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). Pozwala ona w bardzo prosty sposób wrzucać do sieci aplikacje Next.js.

## Konfiguracja Projektu

Vercel prawdopodobnie automatycznie skonfiguruje za Ciebie komendy budowania i folder publikacji aplikacji. Jeśli jednak chcesz, możesz skonfigurować projekt tworząc plik [`vercel.json`](https://vercel.com/docs/project-configuration) zawierający poniższą treść. **Nie jest to wymagane przy większości projektów.**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Korzystanie z Dashboardu Vercela

1. Po wrzuceniu kodu do repozytorium GitHuba, zarejestruj się na stronie [Vercela](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) z tym kontem GitHub i kliknij na **Dodaj Nowy Projekt**.

![Nowy projekt na stronie Vercel](/images/vercel-new-project.webp)

2. Importuj repozytorium z GitHuba z projektem.

![Importuj repozytorium](/images/vercel-import-project.webp)

3. Dodaj zmienne środowiskowe.

![Dodaj zmienne środowiskowe](/images/vercel-env-vars.webp)

4. Kliknij **Deploy**. Od teraz, kiedykolwiek wrzucisz zmianę w kodzie w repozytorium, Vercel automatycznie opublikuje twoją aplikację!

## Korzystanie z Vercel CLI

Aby wykonać deploy z konsoli, musisz najpierw [zainstalować Vercel CLI globalnie](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

Uruchom komendę [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) aby opublikować swój projekt.

```bash
vercel
```

Dołącz `--env DATABASE_URL=YOUR_DATABASE_URL_HERE` aby dodać zmienne środowiskowe, jakie jak link do bazy danych. Użyj `--yes`, jeżeli chcesz pominąć pytania podczas publikowania projektu i pozostawić ustawienia domyślne dla każdego z nich.

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

Po pierwszym opublikowaniu, komenta ta publikować będzie do gałęzi poglądowej. Będziesz musiał dołączyć `--prod`, aby wrzucić zmiany bezpośrednio do aktywnej strony.

```bash
vercel --prod
```
