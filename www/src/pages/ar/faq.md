---
title: الأسئلة الشائعة
description: الأسئلة المتكررة حول إنشاء تطبيق T3
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---

ها هي بعض الأسئلة التي يَكثر سُؤالها عن `create-t3-app`.

## ماذا بعد؟ كيف استعمل `create-t3-app` لأنشاء تطبيق؟

نحن نحاول أن نُبقي هذا المشروع بَسيطاًً قدر الإمكان، لذلك فَقد وضعنا حَجر الأساس لك، ويمكن إضافة ما تريد وقتما تُريد.

إذا كًنت غير مُلم ببعض التقنيات المُستخدمة في هذا المَشروع فاتجة إلى الـ Docs المَعنية بها، فإذا واجهتك مُشكلة ما فالرجاء الانضمام إلى سيرفر الديسكورد [Discord](https://t3.gg/discord) وأطلب المُساعدة.

موقع [Next.js](https://nextjs.org/)  
موقع [NextAuth.js](https://next-auth.js.org)  
موقع [Prisma](https://prisma.io)  
موقع [TailwindCSS](https://tailwindcss.com)  
موقع [tRPC](https://trpc.io)

## ما هي مصادر التعلم المتاحة في الوقت الحالي ؟

بالرغم من أن المصادر المذكورة في اللأسفل هي من أفضل المصادر الموجودة لتعلم مسار T3، فإننا ننصحك انا تبدأ باستخدام الـ Stack وتَعلمه عن طريق أن تبني شيئاَ به.

إذا كُنت تخطط لإستخدام `create-t3-app` فَربما تكون دِراية ببعض أجزاء هذا الـ Stack، فلماذا لا تَستغل مَعرفتك تِلك لتبدأ العمل مباشرة.

نَحن نُدرك أن هذا المسار لا يَصلح للجميع. لِذلك ، إذا كنت تشعر أنك قد جَربت ما أوصيناك بة وما زلت ترغب في المزيد من مصادر التَعلم ، أو في حال أن لم تكن واثقًا من قَدرتك علي القيام بذلك وَحدك، فراجع هذه البرامج التعليمية الرائعة عن "create-t3-app":

### مقالات

- [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrating your T3 App into a Turborepo](https://www.jumr.dev/blog/t3-turbo)

### فيديوهات

- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [The T3 Stack - How We Built It](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [An overview of the create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## لماذا هُناك ملفات بامتداد `.js` في هذا المشروع ؟

وِفقًا لـ [T3-Axiom #3](/en/introduction#typesafety-isnt-optional) ، نَحن نَعتبر `Type Safety` مواطناََ مِن الدرجة الأولى. لِسوء الحَظ ، لا تدعم بَعض الـ Frameworks والاضافات TypeScript مما يعني أن بعض ملفات التكوين يجب أن تكون ملفات JS وهو مُر لابُد منة.

نُحن نُحاول التأكيد على أن هذه الملفات هي `Javascript ` لأسباب خَارجة عن إرادتنا وذلك عن طريق إستخدام (cjs أو mjs)، لكن لا تزال جميع ملفات js في هذا المشروع تخضع لفحص `Types` باستخدام تعليق `ts-check@` في الأعلى.

## أجد صعوبة في إضافة `i18n ` إلى تطبيقي. هل هناك أي مرجع يمكنني الرجوع إلية؟

لقد قررنا عدم تضمين i18n افتراضيًا في "create-t3-app" وذلك لأنه موضوع شائك للغاية وهناك العديد من الطرق لتنفيذة.
ومع ذلك ، إذا كنان لابُد من تَنفيذه وترغب في رؤية مشروع مَرجعي ، فلدينا مَرجع يُوضح كيف يمكنك إضافة i18n إلى تَطبيق T3 باستخدام next-i18next).

## لماذا نستخدم `pages/` وليس `app/` في Next.js 13؟

كما ذكرنا مُسبقا في [T3-Axiom #2](/en/introduction#bleed-responsibly)، نحن نُحب الأشياء المتطورة لكننا نُقدر الاستقرار ، فمن الصعب تَحويل الـ router الي النظام الجديد، شاهد [not a great place to bleed](https://youtu.be/mnwUbtieOuI?t=1662).
فـ `/app` هو مُجرد لَمحة عن المستقبل ، فهو ليس جاهزًا للإنتاج ؛ غير ان الـ (API) في مَرحلة تجريبية ومن المتوقع أن تحدث له تغييرات جذرية.

لمعرفة الميزات المدعومة والمخطط العمل عليها في / app dir ، قم بزيارة [beta Next.js docs](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features)
