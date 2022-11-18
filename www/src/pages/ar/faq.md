---
title: FAQ
description: Frequently asked questions about Create T3 App
layout: ../../layouts/docs.astro
---

ها هي بعض الاسئبة التي يكثر سؤالها عن `create-t3-app`.
##ماذا بعد ؟ كيف أقوم بتوليد مشروع باستخدام `create-t3-app` ؟
نحن نحاول ان نبقي هذا المشروع بسيطاًً قدر الامكان، لذلك فقد وضعنا حجز الاساس لك، ويمكن اضافة ما تريد وقت الحاجه عندما يكون ضرورياَ.

اذا كنت غير ملم ببعض التقنيات المستخدمة في هذا المشروع الرجاء الاتجاة الي الـ Docs المعنيه بها، ذإذا ؤاجهتك مشاكل اخري فالرجاء الانضمام الي سيرفر الديسكور الخاص بنا [Discord](https://t3.gg/discord) and ask for help

موقع [Next.js](https://nextjs.org/)  
موقع [NextAuth.js](https://next-auth.js.org)  
موقع [Prisma](https://prisma.io)  
موقع [TailwindCSS](https://tailwindcss.com)  
موقع [tRPC](https://trpc.io)  



ما هي مصادر اتعليم المتاحه في الوقت الحالي ؟
بالرغم من ان المصادر المذكوره في الاسفل هي من افضل المصادر الموجوده لتعلم مسار T3، فان مجتمعنا و (and [Theo](https://youtu.be/rzwaaWH0ksk?t=1436))ينصحوك انا تبدأ باستخدام الـ Stack وتعلمه عن طريق ان تبني شيئاَ به.

إذا كنت تخطط لاتسخدام `create-t3-app` فان هناك إحتمالاَ أنك علي درايه ببعض أجزاء هذا الـ Stack، فلماذا لا تسغل معرفتك تلك لتبدأ الترجمة مباشرة ووتعلم الباقي اثناء البناء.

الآن ، نحن ندرك أن هذا المسار لا يصلح للجميع. لذلك ، إذا كنت تشعر أنك قد جربت التوصية وما زلت ترغب في بعض الموارد ، أو لم تكن واثقًا من القيام بذلك بنفسك و تشعر بالإرهاق، فراجع هذه البرامج التعليمية الرائعة عن "create-t3-app":

### مقالات

- [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrating your T3 App into a Turborepo](https://www.jumr.dev/blog/t3-turbo)

### فيديوهات

- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [The T3 Stack - How We Built It](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [An overview of the create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

##لماذا هناك ملفات بامتداد `.js` في هذا المشروع ؟ 


As per [T3-Axiom #3](/en/introduction#typesafety-isnt-optional), we take typesafety as a first class citizen. Unfortunately, not all frameworks and plugins support TypeScript which means some of the configuration files have to be `.js` files.

We try to emphasize that these files are javascript for a reason, by explicitly declaring each file's type (`cjs` or `mjs`) depending on what's supported by the library it is used by. Also, all the `js` files in this project are still typechecked using a `@ts-check` comment at the top.

## I'm struggling to add i18n to my app. Is there any reference I can use?

We have decided against including i18n by default in `create-t3-app` because it's a very opinionated topic and there are many ways to implement it.

However, if you struggle to implement it and want to see a reference project, we have a [reference repo](https://github.com/juliusmarminge/t3-i18n) that shows how you can add i18n to a T3 App using [next-i18next](https://github.com/i18next/next-i18next).

## Why are we using `/pages` and not `/app` from Next.js 13?

As per [T3-Axiom #2](/en/introduction#bleed-responsibly), we love bleeding edge stuff but value stability, your entire router is hard to port, [not a great place to bleed](https://youtu.be/mnwUbtieOuI?t=1662). While `/app` is [a glimpse into the future](https://youtu.be/rnsC-12PVlM?t=818), it's not ready for production; The API is in beta and expected to have breaking changes.

For a list of supported, planned, and worked on features in the `/app` dir, visit the [beta Next.js docs](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features).


