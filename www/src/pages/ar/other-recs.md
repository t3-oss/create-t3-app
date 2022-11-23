---
title: ترشيحات أخرى
description: مكتبات وخدمات نرشحها لك
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---

نحن ندرك أن المكتبات التي ضمنتها في `create-t3-app` لا تحل كل مشكلة، على الرغم من ذلك فنحن ننصحك أن تبدأ بالأشياء التي نقدمها، فسيحل عليك وقت تحتاج فيه أن تستخدم مكتبات خارجية فأنت وحدك من تدري ماذا يحتاج مشروعك، ها هي بعض المصادر التي نشجعك على أن تتبعها.
هناك بعض الترشيحات التي قدمها مساهمون منفردون فلا يجب أن لا تُؤخذ على أنها رسمية من فريق t3 أو t3-OSS، لذلك **نرجوا ان تقوم بالبحث، خاصة قبل أن تشترك في خدمات مدفوعة**

## State Management

**ملحوظة المحرر**: مكتبات الـ State Management هي شئ رائع لكنها في معظم الحالات ليست ضرورية، فـ tRPC و ReactQuery تقوم بهة الوظيفة بشكل جيد، لذلك إبدأ بـ`useState` وانتقل إلى أحد البدائل فقط عندما يلزم الأمر.

### Zustand

**حتي لا تستعمل Redux أأبداََ مرة اخرى**
بديل Redux الذي لم تكن تعلم إنك تحتاجة، غير أنك يمكنك الوثوق ب، [Poimandres](https://github.com/pmndrs) دائما فيمكنك أن تصنع بها كل شي من تطبيقات المكالمات الي الالعاب فقط بهذه المكتبة الصغيرة.

- [Zustand Homepage](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Jotai

**حتى لا تستخدم Context مرة أخرى**
For a more atomic approach, Jotai is hard to beat. Also by [Poimandres](https://github.com/pmndrs), Jotai lets you define singletons that feel like global useState. Great option for stateful behaviors that don't need a state machine just yet.

- [Jotai Homepage](https://jotai.org/)
- [Jotai GitHub](https://github.com/pmndrs/jotai)

## Component Libraries

تحتاج معظم التطبيقات إلى نفس مجموعة المكونات - أزرار التبديل والقوائم المنسدلة والشروط وما إلى ذلك. توفر هذه المكتبات مكونات رائعة يمكن الوصول إليها يمكنك استخدامها وتخصيصها حسب رغبتك.

### Unstyled Component Libraries

تُعرف أيضًا باسمHeadless libraries ، فهي توفر مكونات رائعة غير منظمة , Accessible و يمكنك تخصيصها حسب رغبتك. هنا بعض التوصيات.

- [Radix UI](https://www.radix-ui.com/)
- [Headless UI](https://headlessui.com/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/)

### Styled Component Libraries\*\*

في بعض الأحيان تقوم ببناء مشروع حيث تريد فقط أن تبدو واجهة المستخدم جيدة. كـ لوحات التحكم والمشروعات المماثلة الأخرى ، ستنجز أي هذه المكتبات هذه المهمة على أكمل وجه

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)

### سلطة التباين الطبقي

** لبناء مكتبات UI **
إنشاء مكتبة واجهة مستخدم بشكل تصريحي(Declarative) بألوان وأحجام مختلفة ومتغيرات مختلفة. عندما يصل مشروعك إلى نطاق تريد فيه مجموعة موحدة من مكونات الـ UI مع متغيرات متعددة باستخدام Tailwind CSS ، فإن CVA هي أداة رائعة.

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

# الانميشن

### AutoAnimate

**الانميشن بسطر كود واحد**

تحاول معظم المكتبات المتحركة إرضاء كل حالة استخدام ممكنة ، نتيجة لذلك تصبح غير مرغوب فيها. AutoAnimate هي أداة لا تحتاج إلى تكوين توفر تحسينًا كبيرًا في UX دون بذل جهد إضافي من المطور.

- [AutoAnimate Homepage](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [AutoAnimate Component Snippet](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### ـ Framer Motion

**الرسوم المتحركة المعقدة**
يوفر FramerMotion اسلوبا بسيطا لكتابة الكود، فيسمع لك بكتابة رسوميات معقدة بكود أقل

- [Framer Motion Homepage](https://framer.com/motion)
- [Framer Motion Documentation](https://www.framer.com/docs/)

## Deployments, Infrastructure, Databases and CI

### Vercel

**إستضافة موقعك**
قامت Vervel بتسهيل استضافة موقعك بعد أن كان جحيما في الماضي، فإنها تعتمد علي AWS لكن مع واجهة أفضل.

- [Vercel موقع](https://vercel.com/)
- [Create T3 App Vercel كتيب تعليمات](/en/deployment/vercel)

### PlanetScale

**حتي لا تقلق علي قواعد بياناتك بعد الآن**
تعد PlanetScale أحد أفضل مزودي خدمة قواعد البيانات علي الاطلاق في قدرتها على التوسع وتجربة المطور الممتازة والأسعار المعقولة.

- [PlanetScale Homepage](https://planetscale.com/)

### Railway

**لإستضافة البنية التحتية للموقع**
فهي Heroku العصر الحديث، إذا كان Vercelli , PlanetScale غير كافيين لك، فـ Railway ستكون خيارك المناسب.

- [Railway موقع](https://railway.app/)

### Upstash

نحن نحب Prisma و Planet Scale لكن بعض المشاريع تتطلب حلولا أكثر سرعة Upstash باستخدام Redis في مشروعك دون الحاجة أن تٌدير البنية التحتية.

- [Upstash موقع](https://upstash.com/)

### Pusher

**For serverless WebSockets**
إذا كان الـ WebSockets مهمة بالنسبة لك، فإنه من الأفضل الاعتماد على سيرفر تقليدي مثل [Fastify](https://www.fastify.io/) والتي أيضا تدعم(which [also works with tRPC!](https://trpc.io/docs/v10/fastify) لكن إذا كانت السرعة مهمة فإن Pusher هو الخيار المناسب لك.

- [Pusher Homepage](https://pusher.com/)

### Soketi

Soketi is an self-hostable, simple, and fast alternative to Pusher. It's fully compatible with the Pusher SDK which you can use to connect to the server. Soketi serverless is also in beta.

- [Soketi Homepage](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

## Analytics

تعتبر بيانات المستخدم ذات قيمة كبيرة عند إنشاء تطبيق. فيما يلي بعض موفري التحليلات الذين نوصيك بهم.

### Plausible

هل تحتاج إلى تحليلات؟ Plausible هو أحد أسرع الطرق للحصول عليها [simple plugin for Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Plausible موق](https://plausible.io/)

### Umami

يعد Umami بديلًا بسيطًا وسريعًا لبرنامج Google Analytics. يمكنك استخدامه بسهولة في Vercel و Railway وما إلى ذلك باستخدام PlanetScale كقاعدة بيانات.

- [Umami موفع](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)

## Other

### Next Bundle Analyzer

قد يكون من الصعب أحيانًا تحديد ما سيتم تضمينه في الإصدار النهائي لتطبيقك. يُعد Next Bundle Analyzer طريقة سهلة لتصور وتحليل حزم JavaScript التي تم إنشاؤها.

- [@next/bundle-analyzer on npm](https://www.npmjs.com/package/@next/bundle-analyzer)
