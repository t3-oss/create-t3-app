---
title: مقدمة
description: مقدمة الي the T3 Stack
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/PbjHxIuHduU" title="The best stack for your next project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## T3 Stack
الـ T3 Stack هو Stack لتطوير تطبيقات الويب صنع بواسطه Theo ويركز علي البساطه، إعادة الاستخدام، الـ Typesafety

القطع الاساسة هي [**Next.js**](https://nextjs.org/) , [**TypeScript**](https://typescriptlang.org/) , [**Tailwind CSS**](https://tailwindcss.com/) وهي دائما مضافة، إذا كنت تصنع شيئا يت
لب Baclend فيمكنك اضافة [**tRPC**](https://trpc.io/) , [**Prisma**](https://prisma.io/) و [**NextAuth.js**](https://next-auth.js.org/)

لعلك لاحظت  ان هناك الكثير من القطع ، هذا صحيح، اَضف قطعا وازل اخري كما تشاء فلك مُطلق الحرية


## حسنا .. ما هو create-t3-app ? اهو قالب؟ 



نوعا من؟ create-t3-app هو CLI تم إنشاؤه بواسطة مطوري T3 Stack المخضرمين لتبسيط إعداد تطبيق T3 Stack. هذا يعني أن كل قطعة اختيارية ، ويتم إنشاء "القالب" بناءً على احتياجاتك الخاصة.

هذا **ليس** قلباََ كالماََ. فيجب عليك ان تضيف مكتبتك الخاصه لحل المشاكل التي ستواجهك في مشروعاتك. علي الرغم من اننا لا نريد ان  نصف حلولا اكثر تحديد  [لكن لدينا بعض الترشيحات لك](/en/other-recs).


## T3 Axioms
سنكون صريحين - هذا مشروع  عنيد (opinionated). نتشارك في عدد قليل من المعتقدات الأساسية حول البناء ونتعامل معها كأساس لقراراتنا.


### Solve Problems

It's easy to fall into the trap of "adding everything" - we explicitly don't want to do that. Everything added to `create-t3-app` should solve a specific problem that exists within the core technologies included. This means we won't add things like state libraries (`zustand`, `redux`) but we will add things like NextAuth.js and integrate Prisma and tRPC for you.

### Bleed Responsibly
نحن نحب التقنيات الحديثة، كمية السعاده التي من الاشياء الحديثة أمر رائع، لكن تجب عليك ان تتوخي الحذر وان تستخدم التقنيات الغير مستقرة في الاماكن الاقل حساسية، فمثلا نحن لن نراهن علي قواعد بيانات حديثه، فـ SQL تكفي وزيادة، لكننا سنراهين علي tRPC لانها مجرد Functions ومن السه الاستغناء عنها.

# # الـ Typesafety ليس خياراََ.
قد حددنا مسبقاَ ان الهدف الاوحد من `create-t3-app` هو ان نوفر بدائة سريعة لتطوير تطبيقات الويب مع أخذ Tyesafety في الاعتبار فهو امر لابد منه لتطور فعاليتك كمطور عن طريق تقليل عدد الـ Bugs قدر الامكان.
أي قرار يضر بالطبيعة الآمنة لـ "create-t3-app" هو قرار يجب اتخاذه في مشروع مختلف.