---
title: التثبيت
description: تعليمات التثبيت لـ Create T3 App
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---

لعمل تطبيق باستخدام create-t3-app ، قم بتشغيل أي من الأوامر الثلاثة التالية وأجب عن أسئلة موجه الأوامر:

### npm

```bash
npm create t3-app@latest
```

### yarn

```bash
yarn create t3-app
```

### pnpm

```bash
pnpm create t3-app@latest
```

بعد أن يتم إنشاء تطبيقك ، الق نظرة علي [الخطوات الأولى](/en/usage/first-steps) للبدء في تطبيقك الجديد.

## Advanced usage

| الخيار            | الوظيفة                                                             |
| ----------------- | ------------------------------------------------------------------- |
| `[dir]`           | اسم الملف الذي سيعيش فيه المشروع                                    |
| `--noGit`         | أخبار CLI صراحةً الان يهيئ GIT في المشروع                           |
| `-y`, `--default` | Bypass the CLI and bootstrap a new t3-app with all options selected |
| `--noInstall`     | إنشاء مشروع دون تثبيت الـ dependencies                              |

## خصائص تجريبية

بالنسبة لـ CI الخاص بنا ، لدينا بعض العلامات التجريبية (Flags) التي تسمح لك بعمل أي تطبيق دون أي مطالبات(Dependencies). إذا كانت حالة الاستخدام هذه تنطبق عليك ، فيمكنك استخدام هذه العلامات. يرجى ملاحظة أن هذه العلامات تجريبية وقد تتغير في المستقبل دون اتباع إصدارات semver.

| الخيار       | الوظيفة                      |
| ------------ | ---------------------------- |
| `--CI`       | دع CLI يعرف أنك في وضع CI    |
| `--trpc`     | أضف tRPC الي المشروع         |
| `--prisma`   | أضف Prisma إلى المشروع       |
| `--nextAuth` | أضف NextAuth.js الي المشروع  |
| `--tailwind` | أضف Tailwind CSS الي المشروع |

**ملاحظة: إذا لم تقدم علامة `CI` ، فلن يكون لبقية هذه العلامات أي تأثير.**
You don't need to explicitly opt-out of the packages you don't want. However, if you prefer to be explicit, you can pass `false`, e.g. `--nextAuth false`.

### مثالث

الامر التالي سيصنع تطبيق T3 باستخدام tRPC و Tailwind CSS.

```bash
pnpm dlx create-t3-app@latest --CI --trpc --tailwind
```
