---
title: Vercel
description: Развертование с помощью Vercel
layout: ../../../layouts/docs.astro
---

Мы рекомендуем развертывать ваше приложение на [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). Это очень упрощает развертывание Next.js приложения.

## Конфигурация проекта

Vercel скорее всего настроит вашу команду сборки и каталог публикации автоматически. Однако вы также можете указать эту информацию вместе с другой конфигурацией, создав файл [`vercel.json`](https://vercel.com/docs/project-configuration) и включив следующие команды:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Используя Vercel Dashboard

1. После того, как вы запушили код в репозиторий GitHub, зарегистрируйтесь на [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) с GitHub и нажмите **Add New Project**.

![New project on Vercel](/images/vercel-new-project.webp)

2. Импортируйте репозиторий GitHub с вашим проектом.

![Import repository](/images/vercel-import-project.webp)

3. Добавьте переменные окружения.

![Add environment variables](/images/vercel-env-vars.webp)

4. Нажмите **Deploy**. Теперь каждый раз, когда вы пушите изменения в репозиторий, Vercel автоматически развертывает ваш сайт!

## Используя Vercel CLI

Для того чтобы развернуть ваш сайт из командной строки, вам необходимо [установить Vercel CLI глобально](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

Run the [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) command to deploy your project.
Запустите команду [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) для развертывания вашего проекта.

```bash
vercel
```

Укажите `--env DATABASE_URL=YOUR_DATABASE_URL_HERE` для переменных окружения, таких как строка подключения к базе данных. Используйте `--yes`, если вы хотите пропустить вопросы развертывания и дать ответ по умолчанию для каждого.

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

После первого развертывания эта команда развернет изменения в ветку предпросмотра. Вам необходимо будет включить `--prod`, чтобы отправить изменения напрямую на живой сайт для будущих развертываний.

```bash
vercel --prod
```
