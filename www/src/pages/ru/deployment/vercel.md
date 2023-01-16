---
title: Vercel
description: Развертывание на Vercel
layout: ../../../layouts/docs.astro
lang: ru
---

Мы рекомендуем развертывать ваше приложение на [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). Он позволяет очень легко развертывать Next.js приложения.

## Конфигурация проекта

Скорее всего Vercel настроит вашу команду сборки и каталог публикации автоматически. Однако вы также можете уточнить эту информацию вместе с другими конфигурациями, создав файл [`vercel.json`](https://vercel.com/docs/project-configuration) и включив в него следующие команды. **В большинстве проектов это делать необязательно.**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Использование Vercel Dashboard

1. После отправки вашего кода в репозиторий GitHub зарегистрируйтесь на [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) с GitHub и нажмите **Add New Project**.

![Новый проект на Vercel](/images/vercel-new-project.webp)

2. Импортируйте репозиторий GitHub с вашим проектом.

![Импортируйте репозитоpий](/images/vercel-import-project.webp)

3. Добавьте ваши переменные среды.

![Добавьте ваши переменные среды](/images/vercel-env-vars.webp)

4. Нажмите **Deploy**. Теперь каждый раз, когда вы отправляете изменение в ваш репозиторий, Vercel автоматически переразвернет ваше приложение!

## Использование Vercel CLI

Для того, чтобы развернуть приложение из командной строки, вам сначала нужно [установить Vercel CLI глобально](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

Запустите команду [`vercel`](https://vercel.com/docs/cli/deploying-from-cli), чтобы развернуть ваш проект.

```bash
vercel
```

Добавьте `--env DATABASE_URL=YOUR_DATABASE_URL_HERE` для переменных среды, таких как строка подключения к базе данных. Используйте `--yes`, если хотите пропустить вопросы развертывания и дать ответ по умолчанию для каждого.

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

После первого развертывания эта команда развернет изменения в ветку предварительного просмотра. Вам нужно будет включить `--prod`, чтобы отправить изменения напрямую на сайт в продакшене для будущих развертываний.

```bash
vercel --prod
```
