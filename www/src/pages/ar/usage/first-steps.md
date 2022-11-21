---
title: الخطوات الاول
description: الخطوات الاولي في create-t3-app
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---
لقد أنشأت للتو مشروعا باستخدام T3 Stack ، هذة أقل ما يمكن فعله قبل أن تتمكن من تشغيل المشروع.

قواعد البيانات
اذا كان مشروعك يحتوي على Prisma فعليك ان تقوم بتشغيل أمر `npx prisma adb push` في مشروع ، هذا الأمر يقوم بمزامنة الـ Schema مع قاعدة البيانات ليضمن الـ Typesafety عند الـ Client، ** لاحظ أن هذه الخطوة تتطلب إعادة تشغيل الخادم **

الـمصادقة
إذا كان تطبيقك يتضمن NextAuth.js ، وسنبدأ مع Discord Provider. يعد هذا أحد أبسط مزودي الخدمة الذين يقدمهم NextAuth.js ، لكنه لا يزال يتطلب القليل من الإعداد الأولي من جانبك.
بالطبع ، إذا كنت تفضل استخدام موفر مصادقة مختلف ، فيمكنك أيضًا استخدام أحد المزودين العديدين الذين يقدمهم NextAuth.js.

ستحتاج إلى حساب Discord ، سجيل واحداََ إذا لم تكن قد قمت بذلك بالفعل.
اذهب https://discord.com/developers/applications واضغط علي New Application في الجاني الايمن الاعلي .
ثم اذهب -> Settings ثم الى OAuth2 ثم General

قم بنسخ Client ID وضعه في .env كـ DISCORD_CLIENT_ID
اضغط علي Reset Secret ثم انسخ كلمة السر الجديدة وضعها في .env كـ DISCORD_CLIENT_SECRET
اضغط علي Add Redirect واضف http://localhost:3000/api/auth/callback/discord
اضف NEXTAUTH_SECRET الي .env كـ String، في الـ Production اضف كلمة سر قوية.

Join our Discord and give us a star on GitHub! :)




