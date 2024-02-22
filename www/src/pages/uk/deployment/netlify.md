---
title: Netlify
description: Деплоймент в Netlify
layout: ../../../layouts/docs.astro
---

Netlify - це альтернативний провайдер деплою, схожий на Vercel. Ось [`ajcwebdev/ct3a-netlify`](https://github.com/ajcwebdev/ct3a-netlify) приклад репозиторію на основі цієї документації.

## Навіщо деплоїти на Netlify

Вважають, що Vercel має кращу підтримку Next.js тому що Vercel розробляє Next.js. Вони зацікавлені в тому, щоб платформа була налаштована для оптимальної продуктивності та DX з Next.js. Найчастіше це так і у відхиленні від стандартного шляху не буде сенсу.

Також існує спільна думка про те, що багато функцій Next.js підтримуються тільки на Vercel. Хоча це правда, що нові функції Next.js будуть тестуватись і підтримуватись на Vercel в момент випуску за замовчуванням, також слід враховувати, що інші провайдери, такі як Netlify, [швидко реалізують та випускають підтримку](https://www.netlify.com/blog/deploy-nextjs-13/) для [стабільних функцій Next.js](https://docs.netlify.com/integrations/frameworks/next-js/overview/).

Всі провайдери деплойменту мають переваги і недоліки, оскільки жоден хост не може мати кращу підтримку для всіх випадків використання. Наприклад, Netlify розробив свій власний [користувальницький Next.js runtime](https://github.com/netlify/next-runtime) для Netlify Edge Functions (які працюють на Deno Deploy) та [підтримують унікальні проміжні програми для доступу та зміни HTTP-відповідей](https://github.com/netlify/next-runtime#nextjs-middleware-on-netlify).

> _Зверніть увагу: Щоб відстежувати статус нестабільних функцій Next 13, див. [Використання каталогу `app` Next 13 на Netlify](https://github.com/netlify/next-runtime/discussions/1724)._

## Конфігурація проекту

Існує кілька способів налаштування інструкцій білда, включаючи пряме використання Netlify CLI або Netlify Dashboard. Хоча це не обов'язково, рекомендується створити та включити файл [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/). Це гарантує, що форкнуті та клоновані версії проекту будуть легше повторно задеплоєні.

```toml
[build]
  command = "next build"
  publish = ".next"
```

## Використання Netlify Dashboard

1. Запуште свій код до репозиторію GitHub і зареєструйтесь на [Netlify](https://app.netlify.com/signup). Після того, як ви створили обліковий запис, натисніть **Add new site** і потім **Import an existing project**.

![Новий проект у Netlify](/images/netlify-01-new-project.webp)

2. Підключіть свій провайдер Git.

![Імпортуйте репозиторій](/images/netlify-02-connect-to-git-provider.webp)

3. Виберіть репозиторій вашого проекту.

![Виберіть репозиторій вашого проекту](/images/netlify-03-pick-a-repository-from-github.webp)

4. Netlify виявить, якщо у вас є файл `netlify.toml` і автоматично налаштує команду білда та директорію публікацій.

![Налаштування збірки Nextjs](/images/netlify-04-configure-build-settings.webp)

5. Натисніть **Show advanced**, а потім **New variable**, щоб додати свої змінні середовища.

![Додати змінні середовища](/images/netlify-05-env-vars.webp)

6. Натисніть **Deploy site**, зачекайте, поки білд завершиться, і перегляньте свій новий сайт.

## Використання Netlify CLI

Для того, щоб задеплоїти проект із командного рядка, ви повинні спочатку запушити свій проект до репозиторію GitHub і [встановити Netlify CLI](https://docs.netlify.com/cli/get-started/). Ви можете встановити `netlify-cli` як залежність проекту або встановити його глобально на вашому комп'ютері за допомогою наступної команди:

```bash
npm i -g netlify-cli
```

Для того, щоб протестувати свій проект локально, запустіть команду [`ntl dev`](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment) та відкрийте [`localhost :8888`](http://localhost:8888/) для перегляду вашої локально запущеної програми Netlify:

```bash
ntl dev
```

Запустіть команду [`ntl init`](https://docs.netlify.com/cli/get-started/#continuous-deployment), щоб налаштувати ваш проект:

```bash
ntl init
```

Імпортуйте змінні середовища вашого проекту з вашого файлу `.env` за допомогою [`ntl env:import`](https://cli.netlify.com/commands/env#envimport):

```bash
ntl env:import .env
```

Задеплойте ваш проект за допомогою [`ntl deploy`](https://docs.netlify.com/cli/get-started/#manual-deploys). Вам потрібно буде передати прапор `--build`, щоб запустити команду білда перед деплойментом, та прапор `--prod`, щоб задеплоїти на основному URL вашого сайту:

```bash
ntl deploy --prod --build
```

Щоб переглянути приклад на Netlify, перейдіть на [ct3a.netlify.app](https://ct3a.netlify.app/).
