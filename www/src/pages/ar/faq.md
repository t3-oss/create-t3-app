---
title: الأسئلة الشائعة
description: الأسئلة المتكررة حول إنشاء تطبيق T3
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---

إليك ما يَكثُر من سٌؤاله عن `create-t3-app`.

## ماذا بعد؟ كيف استعمل `create-t3-app` لإنشاء تطبيق؟

نحن نحاول أن نُبقي هذا المشروع بَسيطاً قدر الإمكان، لذلك فَقد وضعنا حَجر الأساس لك، ويمكن إضافة ما تريد وقتما تُريد.

إذا كًنتَ غير مُلم ببعض التقنيات المُستخدمة في هذا المَشروع فاتجه إلى الـDocs المَعنية بها، وإذا واجهتك مُشكلة ما، فيرجى الانضمام إلى سيرفر [Discord](https://t3.gg/discord) واطلب المُساعدة.

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## ما هي مصادر التعلم المتاحة في الوقت الحالي؟

بالرغم من أن المصادر المذكورة في الأسفل هي من أفضل المصادر الموجودة لتعلم مسار T3، فإننا ننصحك أن تبدأ باستخدام الـStack وتَعلمه عن طريق البناء به.

إذا كُنت تخطط لإستخدام `create-t3-app` فَربما تكون على دِراية ببعض أجزاء هذا الـStack، فلمَ لا تَستغل مَعرفتك تِلك لتبدأ العمل مباشرة.

نَحن نُدرك أن هذا المسار لا يَصلح للجميع. لِذلك، إذا كنت تشعر أنك قد جَربت ما أوصيناك به وما زلت ترغب في المزيد من مصادر التَعلم، أو في حال لم تكن واثقاً من قَدرتك على القيام بذلك وَحدك و/أو تشعر بالإرباك تجاه هذا الـStack، فاطلع على هذه البرامج التعليمية الرائعة عن Create T3 App:

### مقالات

- [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [Migrating your T3 App into a Turborepo](https://www.jumr.dev/blog/t3-turbo)

### فيديوهات

- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [The T3 Stack - How We Built It](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [An overview of the create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## لماذا هُناك ملفات بامتداد `.js` في هذا المشروع؟

وِفقاً لـ[T3-Axiom #3](/en/introduction#typesafety-isnt-optional) ، نَحن نَعتبر مبدأ `Type Safety` مواطناََ مِن الدرجة الأولى. لِسوء الحَظ، لا تدعم بَعض الـFrameworks والإضافات TypeScript مما يعني أن بعض ملفات الإعدادات يجب أن تكون ملفات JS وهو أمر لابُد منه.

نُؤكد على أن هذه الملفات هي ملفات Javascript لسبب ضروري، من خلال الإعلان صراحةً عن نوع كل ملف منها (`cjs` أو `mjs`) اعتماداً على ما تدعمه المكتبة التي تستَخدِمَها، بالإضافة إلى أن جميع ملفات `js` في هذا المشروع تظل تخضع لفحص `Types` باستخدام تعليق `ts-check@` في الأعلى.

## أجد صعوبة في إضافة i18n إلى تطبيقي. هل هناك أي مرجع يمكنني الرجوع إليه؟

لقد قررنا عدم تضمين i18n افتراضياً في `create-t3-app` وذلك لأنه موضوع شائك للغاية وهناك العديد من الطرق لتنفيذه.
ومع ذلك، إذا كان لابُد من تَنفيذه وترغب في رؤية مشروع مَرجعي، فلدينا [مَرجع](https://github.com/juliusmarminge/t3-i18n) يُوضح كيف يمكنك إضافة i18n إلى تَطبيق T3 باستخدام [next-i18next](https://github.com/i18next/next-i18next).

## لماذا نستخدم `/pages` وليس `/app` في Next.js 13؟

كما ذكرنا مُسبقاً في [T3-Axiom #2](/en/introduction#bleed-responsibly)، نحن نُحب الأشياء المتطورة لكننا نُقدر الاستقرار ، فمن الصعب تَحويل الـrouter إلى النظام الجديد، شاهد [not a great place to bleed](https://youtu.be/mnwUbtieOuI?t=1662).
فـ`/app` هو مُجرد لَمحة عن المستقبل، فهو ليس جاهزاً للبيئة الإنتاجية؛ كما أن الـAPI في مَرحلة تجريبية ومن المتوقع أن تحدث له تغييرات جذرية.

لمعرفة الميزات المدعومة والمخطط العمل عليها في مجلد `/app`، قم بزيارة [beta Next.js docs](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features).
