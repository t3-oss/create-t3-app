---
title: Vercel
description: النَشر الي Vercel
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---

ننصحك بنشر تطبيقك عبر [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) فهو أسهل، خاصة لتطبيقات Next.js.

## إعداد المشروع

بطبيعة الأمر فإن vercel ستقوم بإعداد المشروع عنك لكن بإمكانك التعديل عليها من خلال إنشاء ملف [`vercel.json`](https://vercel.com/docs/project-configuration)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## استخدام لوحة تحكم Vercel

1. بعد دفع مشروعك الي Github سجل الدخول إلى [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) عن طريق Github واضغط علي **Add New Project**

![New project on Vercel](/images/vercel-new-project.webp)

2. قم بإستيراد GitHub repository

![Import repository](/images/vercel-import-project.webp)

3. إضف environment variables.

![Add environment variables](/images/vercel-env-vars.webp)

4. إضغط علي **Deploy** الان مع كل مرة تعمل فيها Push ستقوم vercel بإعادة بناء المشوع تلقائيا

## إستخدام Vercel CLI

حتي تنشر مشروع عن طريق CLI [install the Vercel CLI globally](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

شَغل أمر [`vercel`](https://vercel.com/docs/cli/deploying-from-cli)

```bash
vercel
```

لا تنس اضافة environment variables مثل `--env DATABASE_URL=YOUR_DATABASE_URL_HERE`، أضف عَلم `--yes` لتخطي كل الاسئلة

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

بطبيعة الامر فإن النشر سيطون علي `preview branch` لكن إذا ما كُنت تريد النشر الي `production` فقُم بإضافة علم `--prod`

```bash
vercel --prod
```
