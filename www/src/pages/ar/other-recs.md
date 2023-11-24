---
title: ترشيحات أخرى
description: مكتبات وخدمات نرشحها لك
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---

نٌدرك تمام الإدراك أن المَكتبات الإفتراضية في `create-t3-app` لا تَحٌل كُل المشاكل التي قد تواجهك، بغض النظر عن ذلك فنحن ننصحك أن تبدأ بالأشياء التي نٌقدمها، فعاجلاََ أم أجلا سيأتي عليك وقت تحتاج فيه الي إستخدام مكتبات خَارجية، أنت وَحدك مَن يدري إحتياجات مشروعك.

هَاك بَعضٌ المَصادر التي نٌشجعك على أن تّتبعها.
بَعض الترشيحات التالية قَدمها مٌساهمون مٌنفردون فلا يَجب أن تُؤخذ على أنها تَرشيحات رَسمية من فريق T3 أو T3-OSS، لذلك **قُم بالبحث، خاصة قبل أن تشترك في خدمات مدفوعة**

## State Management

**ملحوظة المحرر**: مكتبات الـ State Management رائعة لكنها في مٌعظم الحالات ليست ضَرورية، فـ tRPC و ReactQuery تقوم بالوظيفة بشكل جيد، لذلك إبدأ بـ`useState` وانتقل إلى أحد البدائل المتاحة فقط عندما يلزم الأمر.

### Zustand

**حتي لا تستعمل Redux أبداََ مرة اخرى**

بديل Redux الذي لم تكن تعلم إنك تحتاجة، غير إمكانية الوثوق بها فأنة بإستخدام [Poimandres](https://github.com/pmndrs) يمكنك صُنع **كل شي** من تطبيقات المكالمات الي الالعاب وغيرها.

- [Zustand Homepage](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

## Component Libraries

تحتاج مٌعظم التطبيقات إلى نَفس مَجمٌوعة المٌكونات - أزرار التبديل والقوائم المنسدلة وغيرها.
تٌوفر هَذه المَكتبات مُكونات رَائعة يُمكنك إستخدامها وتَخصيصها حَسب رَغبتك.

### Unstyled Component Libraries

تُعرف أيضًا باسم Headless libraries ، فهي تٌوفر مٌكونات رائعة يمكنك عمل styling لها كما تشاء, هذا الي جانب كونها Accessible و يمكنك تخصيصها حسب رغبتك.

- [Radix UI](https://www.radix-ui.com/)
- [Headless UI](https://headlessui.com/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/)

### Styled Component Libraries

في بعض الأحيان تقوم ببناء مشروع وكل ما تريدة هو أن تبدو واجهة المستخدم جيدة. كـ لوحات التحكم وغيرها ، سَتٌنجز أي هذه المكتبات هذه المهمة على أكمل وجه

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)

### Class Variance Authority

** لبناء مكتبات UI **
تُساعدك علي إنشاء مكتبات واجهة مستخدم بشكل تصريحي (Declarative) بألوان وأحجام مختلفة ومتغيرات مختلفة. عندما يصل مشروعك إلى حجم يلزمك فيه مجموعة موحدة من مكونات الـ UI مع مُتغيرات مٌتعددة لـ Tailwind CSS ، فإن CVA هي أداة رائعة.

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

## Animations

### AutoAnimate

**الانميشن بسطر كود واحد**

تحاول معظم مكتبات الانميشن إرضاء كل حالات الاستخدام الممكنة ، نتيجة لذلك تصبح غير مرغوب فيها. AutoAnimate هي أداة لا تحتاج إلى تكوين تٌوفر تَحسينًا كبيرًا في UX دون بَذل جٌهد إضافي من المطور.

- [AutoAnimate Homepage](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [AutoAnimate Component Snippet](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**الرسوم المتحركة المعقدة**

تٌوفر FramerMotion اٌسلوبا بَسيطا لكتابة الكود، فَتسمح لك بكتابة رسوميات معقدة بكود أقل

- [Framer Motion Homepage](https://framer.com/motion)
- [Framer Motion Documentation](https://www.framer.com/docs/)

## Deployments، و Infrastructure، و Databases، و CI

### Vercel

**إستضافة موقعك**

قامت Vervel بتسهيل استضافة موقعك بعد أن كان جِحِيماََ في الماضي، فإنها تَعتمد عََلي AWS لكن مع واجهة أفضل.

- [Vercel Homepage](https://vercel.com/)
- [Create T3 App Vercel deployment guide](/en/deployment/vercel)

### PlanetScale

**حتي لا تقلق علي قواعد بياناتك بعد الآن**

تُعد PlanetScale أحد أفضل مٌزودي خِدمة قَواعد البيانات عَلي الإطلاق لقٌدرتها عَلى التَوسع وتجربة المطور الممتازة والأسعار المعقولة.

- [PlanetScale Homepage](https://planetscale.com/)

### Railway

**لإستضافة البنية التحتية للموقع**

فهي Heroku العصر الحديث، إذا كان Vercelli , PlanetScale غير كافيين لك، فـ Railway سَتكون خيارك المناسب.

- [Railway Homepage](https://railway.app/)

### Upstash

نحن نٌحب Prisma و Planet Scale لكن بعض المشاريع تتطلب حٌلولا أكثر سٌرعة.
فإن **Upstash** تٌعطيك القٌدرة علي إستخدام Redis في مشروعك دون الحاجة أن تٌدير البنية التحتية.

- [Upstash موقع](https://upstash.com/)

### Pusher

**For serverless WebSockets**

إذا كان الـ WebSockets مُهمة بالنسبة لك، فإنه مِن الأفضل الإعتماد على سيرفر تقليدي مثل [Fastify](https://www.fastify.io/) والتي أيضا تدعم [tRPC](https://trpc.io/docs/v10/fastify)
لكن إذا كانت السرعة مهمة لك فإن Pusher هو الخيار المناسب لك.

- [Pusher Homepage](https://pusher.com/)

### Soketi

Soketi هو بديل بسيط وسريع للاستضافة الذاتية لـ Pusher. إنه متوافق تمامًا مع Pusher SDK الذي يمكنك استخدامه للاتصال بالخادم. Soketi serverless هو أيضًا في مرحلة تجريبية.

- [Soketi Homepage](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

## Analytics

تعتبر بيانات المستخدم ذات قيمة كبيرة عند إنشاء تطبيق. فيما يلي بعض موفري التحليلات الذين نوصيك بهم.

### Plausible

هل تحتاج إلى تحليلات؟ Plausible هو أحد أسرع الطرق للحصول عليها [simple plugin for Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Plausible Homepage](https://plausible.io/)

### Umami

يعد Umami بديلًا بسيطًا وسريعًا لبرنامج Google Analytics. يمكنك استخدامه بسهولة في Vercel و Railway وما إلى ذلك باستخدام PlanetScale كقاعدة بيانات.

- [Umami Homepage](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)

## غيرها

### Next Bundle Analyzer

قد يكون من الصعب أحيانًا تحديد ما سيتم تضمينه في الإصدار النهائي لتطبيقك. يُعد Next Bundle Analyzer طريقة سهلة لتصور وتحليل حزم JavaScript التي تم إنشاؤها.

- [next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
