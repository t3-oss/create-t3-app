---
title: مقدمة
description: مقدمة الي the T3 Stack
layout: ../../layouts/docs.astro
language: ar
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
نحن نحب التقنيات الحديثة، كمية السعاده التي من الاشياء الحديثة أمر رائع، 
We love our bleeding edge tech. The amount of speed and, honestly, fun that comes out of new shit is really cool. We think it's important to bleed responsibly, using riskier tech in the less risky parts. This means we wouldn't ⛔️ bet on risky new database tech (SQL is great!). But we happily ✅ bet on tRPC since it's just functions that are trivial to move off.

### Typesafety Isn't Optional

The stated goal of `create-t3-app` is to provide the quickest way to start a new full-stack, **typesafe** web application. We take typesafety seriously in these parts as it improves our productivity and helps us ship fewer bugs. Any decision that compromises the typesafe nature of `create-t3-app` is a decision that should be made in a different project.
