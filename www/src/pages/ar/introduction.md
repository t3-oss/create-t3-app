---
title: مقدمة
description: مقدمة إلى the T3 Stack
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/PbjHxIuHduU" title="The best stack for your next project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## T3 Stack

الـ T3 Stack هو Stack لتطوير تطبيقات الويب صنع بواسطة Theo ويركز على البساطة، إعادة الاستخدام، الـ Typesafety

القطع الأساسية هي [**Next.js**](https://nextjs.org/) , [**TypeScript**](https://typescriptlang.org/) , [**Tailwind CSS**](https://tailwindcss.com/) وهي دائما مضافة، إذا كنت تصنع شيئا يت
لب Backend فيمكنك اضافة [**tRPC**](https://trpc.io/) , [**Prisma**](https://prisma.io/) و [**NextAuth.js**](https://next-auth.js.org/)

لعلك لاحظت أن هناك الكثير من القطع ، هذا صحيح، اَضف قطعا وازل أخرى كما تشاء فلك مُطلق الحرية

## حسنا .. ما هو create-t3-app ؟ اهو قالب؟

نوعا من؟ create-t3-app هو CLI تم إنشاؤه بواسطة مطوري T3 Stack المخضرمين لتبسيط إعداد تطبيق T3 Stack. هذا يعني أن كل قطعة اختيارية ، ويتم إنشاء "القالب" بناءً على احتياجاتك الخاصة.

هذا **ليس** قلباََ كالماََ. فيجب عليك أن تضيف مكتبتك الخاصه لحل المشاكل التي ستواجهك في مشروعاتك. علي الرغم من اننا لا نريد أن نصف حلولا أكثر تحديد [لكن لدينا بعض الترشيحات لك](/en/other-recs).

## T3 Axioms

سنكون صريحين - هذا مشروع عنيد (opinionated). نتشارك في عدد قليل من المعتقدات الأساسية حول البناء ونتعامل معها كأساس قراراتنا.

### Solve Problems

It's easy to fall into the trap of "adding everything" - we explicitly don't want to do that. Everything added to `create-t3-app` should solve a specific problem that exists within the core technologies included. This means we won't add things like state libraries (`zustand`, `redux`) but we will add things like NextAuth.js and integrate Prisma and tRPC for you.

### Bleed Responsibly

نحن نحب التقنيات الحديثة، كمية السعادة التي تأتي من الأشياء الجديدة أمر رائع، لكن يجب عليك أن تتوخى الحذر وأن تستخدم التقنيات الغير مستقرة في الأماكن الأقل حساسية، فمثلا نحن لا نراهن على قواعد بيانات حديثة، فـ SQL تكفي وزيادة، لكننا سنراهين علي tRPC لانها مجرد Functions ومن السه الاستغناء عنها.

# # الـ Typesafety ليس خياراََ.

قد حددنا مسبقاَ أن الهدف الأوحد من `create-t3-app` هو أن نوفر بداية سريعة لتطوير تطبيقات الويب مع أخذ Tyesafety في الاعتبار, فهو أمر لابد منه لتطور فاعليتك كمطور عن طريق تقليل عدد الـ Bugs قدر الإمكان.
أي قرار يضر بالطبيعة الآمنة لـ "create-t3-app" هو قرار يجب اتخاذه في مشروع مختلف.
