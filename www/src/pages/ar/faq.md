---
title: الأسئلة الشائعة
description: الأسئلة المتكررة حول إنشاء تطبيق T3
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---

ها هي بعض الأسئلة التي يكثر سؤالها عن `create-t3-app`.
## ماذا بعد ؟ كيف أقوم بتوليد مشروع باستخدام `create-t3-app` ؟
نحن نحاول ان نبقي هذا المشروع بسيطاًً قدر الامكان، لذلك فقد وضعنا حجز الاساس لك، ويمكن اضافة ما تريد وقت الحاجه عندما يكون ضرورياَ.

اذا كنت غير ملم ببعض التقنيات المستخدمة في هذا المشروع الرجاء الاتجاة الي الـ Docs المعنيه بها، ذإذا ؤاجهتك مشاكل اخري فالرجاء الانضمام الي سيرفر الديسكور الخاص بنا [Discord](https://t3.gg/discord) and ask for help  
 
موقع [Next.js](https://nextjs.org/)  
موقع [NextAuth.js](https://next-auth.js.org)  
موقع [Prisma](https://prisma.io)  
موقع [TailwindCSS](https://tailwindcss.com)  
موقع [tRPC](https://trpc.io)  


## ما هي مصادر اتعليم المتاحه في الوقت الحالي ؟
بالرغم من ان المصادر المذكوره في الاسفل هي من افضل المصادر الموجوده لتعلم مسار T3، فان مجتمعنا و (and [Theo](https://youtu.be/rzwaaWH0ksk?t=1436))ينصحوك انا تبدأ باستخدام الـ Stack وتعلمه عن طريق ان تبني شيئاَ به.

إذا كنت تخطط لاتسخدام `create-t3-app` فان هناك إحتمالاَ أنك علي درايه ببعض أجزاء هذا الـ Stack، فلماذا لا تسغل معرفتك تلك لتبدأ الترجمة مباشرة ووتعلم الباقي اثناء البناء.

نحن ندرك أن هذا المسار لا يصلح للجميع. لذلك ، إذا كنت تشعر أنك قد جربت التوصية وما زلت ترغب في بعض الموارد ، أو لم تكن واثقًا من القيام بذلك بنفسك و تشعر بالإرهاق، فراجع هذه البرامج التعليمية الرائعة عن "create-t3-app":

### مقالات

- [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrating your T3 App into a Turborepo](https://www.jumr.dev/blog/t3-turbo)

### فيديوهات

- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [The T3 Stack - How We Built It](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [An overview of the create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## لماذا هناك ملفات بامتداد `.js` في هذا المشروع ؟


وفقًا لـ [T3-Axiom #3](/en/introduction#typesafety-isnt-optional) ، نحن نعتبر `Typesafety` كمواطن من الدرجة الأولى. لسوء الحظ ، لا تدعم جميع الـ Frameworks والاضافات TypeScript مما يعني أن بعض ملفات التكوين يجب أن تكون ملفات JS.

نحن نحاول التأكيد على أن هذه الملفات هي `Javascript ` لاسباب خارجة عن ارادتنا ، من خلال التصريح صراحةً عن نوع كل ملف (cjs أو mjs) اعتمادًا على ما تدعمه المكتبة التي تستخدمها. أيضًا ، لكن لا تزال جميع ملفات js في هذا المشروع تخضع لفحص `Types `باستخدام تعليق` @ ts-check` في الأعلى.


## أجد صعوبة في إضافة `i18n ` إلى تطبيقي. هل هناك أي مرجع يمكنني استخدامه؟
لقد قررنا عدم تضمين i18n افتراضيًا في "create-t3-app" لأنه موضوع شائك للغاية وهناك العديد من الطرق لتنفيذه.
ومع ذلك ، إذا كنت لابد من تنفيذه وترغب في رؤية مشروع مرجعي ، فلدينا مرجع مرجعي يوضح كيف يمكنك إضافة i18n إلى تطبيق T3 باستخدام next-i18next).

## لماذا نستخدم pages/ وليس app/ في Next.js 13 ؟

وفقًا لـ [T3-Axiom #2](/en/introduction#bleed-responsibly)، نحن نحب الأشياء المتطورة ولكننا نقدر الاستقرار ، من الصعب تحويل الـ router الي الي النظام الجديد شاهد [not a great place to bleed](https://youtu.be/mnwUbtieOuI?t=1662).
فـ `/app` هو لمحة عن المستقبل ، فهو ليس جاهزًا للإنتاج ؛ غير ان الـ (API) في مرحلة تجريبية ومن المتوقع أن تحدث له تغييرات جذرية.

  
لمعرفة الميزات المدعومة والمخطط العمل عليها في / app dir ، قم بزيارة [beta Next.js docs](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features)