---
title: Vercel
description: Деплоймент на Vercel
layout: ../../../layouts/docs.astro
lang: uk
---

Ми рекомендуємо деплоїти вашу програму на [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). Він дозволяє дуже легко деплоїти Next.js програми.

## Конфігурація проекту

Швидше за все Vercel налаштує вашу команду збірки та каталог публікації автоматично. Однак ви також можете уточнити цю інформацію разом з іншими конфігураціями, створивши файл [vercel.json](https://vercel.com/docs/project-configuration) і включивши в нього наступні команди. **У більшості проектів це робити необов'язково.**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Використання Vercel Dashboard

1. Після відправки вашого коду до репозиторію GitHub зареєструйтесь на [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) з GitHub і натисніть **Add New Project**.

![Новий проект на Vercel](/images/vercel-new-project.webp)

2. Імпортуйте репозиторій GitHub із вашим проектом.

![Імпортуйте репозиторій](/images/vercel-import-project.webp)

3. Додайте ваші змінні середовища.

![Додайте ваші змінні середовища](/images/vercel-env-vars.webp)

4. Натисніть **Deploy**. Тепер щоразу, коли ви відправляєте зміни до вашого репозиторію, Vercel автоматично передеплоїть вашу програму!

## Використання Vercel CLI

Для того, щоб задеплоїти програму з командного рядка, вам спочатку потрібно [встановити Vercel CLI глобально](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

Запустіть команду [`vercel`](https://vercel.com/docs/cli/deploying-from-cli), щоб задеплоїти ваш проект.

```bash
vercel
```

Додайте `--env DATABASE_URL=YOUR_DATABASE_URL_HERE` для змінних середовища, таких як рядок підключення до бази даних. Використовуйте `--yes`, якщо хочете пропустити питання деплою та дати відповідь за умовчанням для кожного.

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

Після першого деплою ця команда задеплоїть зміни у гілку попереднього перегляду. Вам потрібно буде включити `-prod`, щоб відправити зміни безпосередньо на сайт у продакшені для майбутніх деплоїв.

```bash
vercel --prod
```
