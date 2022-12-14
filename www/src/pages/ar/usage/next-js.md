---
title: Next.js
description: إستخدام Next.js
lang: ar
dir: rtl
layout: ../../../layouts/docs.astro
---

Next.js هو إطار عمل Backend لتطبيقات React

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js is a backend framework" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

شاهد هذا الفيديو لتعرف المزيد عن [Theo's Next.js Conf talk](https://www.youtube.com/watch?v=W4UhNo3HAMw)

## لماذا عَلي أن أستخدمها ؟

نحن نحب React. لقد جعلت تطوير واجهة المستخدم سهلا بطرية لم نتخيلها من قبل. لكنها يمكن أن تؤدي بالمطورين إلى أن يتبع بعض المسارات الصعبة. تقدم Next.js أسلوبًا سلساََ لإنشاء التطبيقات باستخدام React. بداية بالـ Routing انتقالا إلى الـ Api ومن ثم الصور ، نضع ثقتنا فى Next.js لتقود المطورين نحو قرارات جيدة.

إقران Next.js مع Vercel يجعل تطوير تطبيقات الويب ونشرها أسهل من أي وقت مضى. فتوفر طرية مجانية لنشر موقعك (نحن ❤️ Vercel)

## Get Static/Server Props

الميزة الرئيسية لـ Next.js هي الـ Data Fetching. نوصيك بشدة أن تقرأ الـ Docs لكي تفهم كيفية استخدام كل واحدة منهما. لا يُنصح باستخدام getServerSideProps عمومًا ما لم يكن هناك سبب وجيه لذلك ، نظرًا لأنها مُكلفة ماديا وتُؤدي إلى إبطاء موقعك. Incremental Static Regeneration هو بديل رائع لـ getServerSideProps عندما تكون البيانات ديناميكية ويمكن جلبها بشكل متزايد.

## مصادر مفيدة

| المَصدر                        | الرابط                             |
| ------------------------------ | ---------------------------------- |
| Next.js Documentation          | https://nextjs.org/docs            |
| Next.js GitHub                 | https://github.com/vercel/next.js  |
| Next.js Blog                   | https://nextjs.org/blog            |
| Next.js Discord                | https://nextjs.org/discord         |
| Next.js Twitter                | https://twitter.com/nextjs         |
| Vercel/Next.js YouTube Channel | https://www.youtube.com/c/VercelHQ |
