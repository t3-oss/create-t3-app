---
title: Vercel
description: Deploying to Vercel
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---

ننصحك بنشر تطبيقك عبر [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) فهو أسهل خاصة لتطبيقات Next.js.

## إعداد المشروع

بطبيعة الأمر فإن vervel ستقوم بإعداد المشروع عنك لكنك يمكنك التعديل عليها من خلال إنشاء ملف [`vercel.json`](https://vercel.com/docs/project-configuration)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## استخدام لوحة تحكم vercelli

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

After the first deployment this command will deploy to a preview branch. You will need to include `--prod` to push changes directly to the live site for future deployments.

```bash
vercel --prod
```
