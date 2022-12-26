---
title: Netlify
description: Развертывание в Netlify
layout: ../../../layouts/docs.astro
---

Netlify это альтернативый провайдер развертывания, похожий на Vercel. Вот [`ajcwebdev/ct3a-netlify`](https://github.com/ajcwebdev/ct3a-netlify) пример репозитория на основе этой документации.

## Зачем развертывать на Netlify

Принято считать, что Vercel имеет лучшую поддержку Next.js потому что Vercel разрабатывает Next.js. Они заинтересованы в том, чтобы платформа была настроена для оптимальной производительности и DX с Next.js. В большинстве случаев это будет правдой и в отклонении от стандартного пути не будет смысла.

Также существует общее мнение о том, что многие функции Next.js поддерживаются только на Vercel. Хотя это правда, что новые функции Next.js будут тестироваться и поддерживаться на Vercel в момент выпуска по умолчанию, также следует учитывать, что другие провайдеры, такие как Netlify, [быстро реализуют и выпускают поддержку](https://www.netlify.com/blog/deploy-nextjs-13/) для [стабильных функций Next.js](https://docs.netlify.com/integrations/frameworks/next-js/overview/).

У всех провайдеров развертывания есть преимущества и недостатки, поскольку ни один хост не может иметь лучшую поддержку для всех случаев использования. Например, Netlify разработал свой собственный [пользовательский Next.js runtime](https://github.com/netlify/next-runtime) для Netlify Edge Functions (которые работают на Deno Deploy) и [поддерживают уникальные промежуточные программы для доступа и изменения HTTP-ответов](https://github.com/netlify/next-runtime#nextjs-middleware-on-netlify).

> _Обратите внимание: Для того, чтобы отслеживать статус нестабильных функций Next 13, см. [Использование каталога `app` Next 13 на Netlify](https://github.com/netlify/next-runtime/discussions/1724)._

## Конфигурация проекта

Существует несколько способов настройки инструкций сборки, включая прямое использование Netlify CLI или Netlify Dashboard. Хотя это не обязательно, рекомендуется создать и включить файл [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/). Это гарантирует, что форкнутые и клонированные версии проекта будут легче повторно развернуть.

```toml
[build]
  command = "next build"
  publish = ".next"
```

## Использование Netlify Dashboard

1. Запушьте свой код в репозиторий GitHub и зарегистрируйтесь на [Netlify](https://app.netlify.com/signup). После того, как вы создали аккаунт, нажмите **Add new site** и затем **Import an existing project**.

![Новый проект в Netlify](/images/netlify-01-new-project.webp)

2. Подключите свой Git-провайдер.

![Импортируйте репозиторий](/images/netlify-02-connect-to-git-provider.webp)

3. Выберите репозиторий вашего проекта.

![Выберите репозиторий вашего проекта](/images/netlify-03-pick-a-repository-from-github.webp)

4. Netlify обнаружит, если у вас есть файл `netlify.toml` и автоматически настроит команду сборки и каталог публикации.

![Настройки сборки Nextjs](/images/netlify-04-configure-build-settings.webp)

5. Нажмите **Show advanced** и затем **New variable**, чтобы добавить свои переменные среды.

![Добавьте переменные среды](/images/netlify-05-env-vars.webp)

6. Нажмите **Deploy site**, подождите, пока сборка завершится, и просмотрите свой новый сайт.

## Использование Netlify CLI

Для того, чтобы развернуть проект из командной строки, вы должны сначала запушить свой проект в репозиторий GitHub и [установить Netlify CLI](https://docs.netlify.com/cli/get-started/). Вы можете установить `netlify-cli` как зависимость проекта или установить его глобально на вашем компьютере с помощью следующей команды:

```bash
npm i -g netlify-cli
```

Для того, чтобы протестировать свой проект локально, запустите команду [`ntl dev`](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment) и откройте [`localhost:8888`](http://localhost:8888/) для просмотра вашего локально запущенного приложения Netlify:

```bash
ntl dev
```

Запустите команду [`ntl init`](https://docs.netlify.com/cli/get-started/#continuous-deployment), чтобы настроить ваш проект:

```bash
ntl init
```

Импортируйте переменные среды вашего проекта из вашего файла `.env` с помощью [`ntl env:import`](https://cli.netlify.com/commands/env#envimport):

```bash
ntl env:import .env
```

Разверните ваш проект с помошью [`ntl deploy`](https://docs.netlify.com/cli/get-started/#manual-deploys). Вам нужно будет передать флаг `--build`, чтобы запустить команду сборки перед развертыванием, и флаг `--prod`, чтобы развернуть на основном URL вашего сайта:

```bash
ntl deploy --prod --build
```

Для просмотра примера на Netlify, перейдите на [ct3a.netlify.app](https://ct3a.netlify.app/).
