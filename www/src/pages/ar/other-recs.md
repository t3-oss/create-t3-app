---
title: Other Recommendations
description: Libraries and Services that we recommend for many projects
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---

نحن ندرك ان المكتبات التي ضمنناها في `create-t3-app` لا تحل كل مشكلة، علي الرغم من ذلك فنحن ننصحك ان تبدأ بالاشياء التي نقدمهاـ، فسيحل عليك وقت تحتاج فيه أن تستخدم مكتبات حارجية فأنت وحك من تدري ماذا يحتاج مشروعك، ها هي بعض المضادر التي ينمن انلتي تشجعك علي ان تتبعها.
هناك بعض الترشيحات التي قدمها مساهمون منفردون فلا يجب أن تُؤخذ علي انها رسمية من فريق t3 أو t3-OSS، لذلك **نرجوا ان تقوم بالبحث، خاصة قبل ان تشترك في خدمات مدفوعة**

## State Management
**ملحوظة المحرر**: مكتبات الـ State Management هي شئ رائع لكنها في معظم الحلالت ليست ضرورية، فـ tRPC و ReactQuery تقوم بهة الوظيفة بشكل جيد، لذلك إبدا  بـ`useState` وانتقل الي احد البدائي فقط عندما يلزم الامر.

### Zustand

**حتي لا تستعمل Redux أأبداََ مرة اخري**
بديل Redux الذي لم تكن تعلم إنك تحتاجة، غير أنك بمكنك الوثوق ب، [Poimandres](https://github.com/pmndrs) دائما فيمكنك ان تصنع بها كل شي من تطبيقات المكالمات الي الالعاب فقط بهذة المكتبة الصغيرة.


- [Zustand Homepage](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Jotai

**حتي لا تستخدم Context مرة أخري**
For a more atomic approach, Jotai is hard to beat. Also by [Poimandres](https://github.com/pmndrs), Jotai lets you define singletons that feel like global useState. Great option for stateful behaviors that don't need a state machine just yet.

- [Jotai Homepage](https://jotai.org/)
- [Jotai GitHub](https://github.com/pmndrs/jotai)

## Component Libraries
تحتاج معظم التطبيقات إلى نفس مجموعة المكونات - أزرار التبديل والقوائم المنسدلة والشروط وما إلى ذلك. توفر هذه المكتبات مكونات رائعة يمكن الوصول إليها يمكنك استخدامها وتخصيصها حسب رغبتك.

### Unstyled Component Libraries
تُعرف أيضًا باسمHeadless libraries  ، فهي توفر مكونات رائعة غير منظمة , Accessible و يمكنك تخصيصها حسب رغبتك. هنا بعض التوصيات.
- [Radix UI](https://www.radix-ui.com/)
- [Headless UI](https://headlessui.com/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/) 

### Styled Component Libraries**
في بعض الأحيان تقوم ببناء مشروع حيث تريد فقط أن تبدو واجهة المستخدم جيدة. كـ لوحات التحكم والمشروعات المماثلة الأخرى ، ستنجز أي هذة المكتبات  هذه المهمة علي اكمل وجة

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)

### سلطة التباين الطبقي
** لبناء مكتبات UI **
إنشاء مكتبة واجهة مستخدم بشكل تصريحي(Declarative) بألوان وأحجام مختلفة ومتغيرات مختلفة. عندما يصل مشروعك إلى نطاق تريد فيه مجموعة موحدة من مكونات الـ UI مع متغيرات متعددة باستخدام Tailwind CSS ، فإن CVA هي أداة رائعة.

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

# الانميشن

### AutoAnimate

**الانميشن بسطر كود واحد**

تحاول معظم المكتبات المتحركة إرضاء كل حالة استخدام ممكنة ، نتيجة لذلك تصبح غير مرغوب فيها. AutoAnimate هي أداة لا تحتاج الي تكوين توفر تحسينًا كبيرًا في UX دون بذل جهد إضافي من المطور.

- [AutoAnimate Homepage](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [AutoAnimate Component Snippet](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### ـ Framer Motion
**للرسوم المتحركة المعقدة**
يوفر FramerMotion اسلوبا بسيطا لكتابة الكود، فيسمع لك بكتابة رسوميات معقدة بكود أقل

- [Framer Motion Homepage](https://framer.com/motion)
- [Framer Motion Documentation](https://www.framer.com/docs/)

## Deployments, Infrastructure, Databases and CI

### Vercel

**إستضافة تعليقك**
قامت Vervel بتسهيل اسضافة موقعك بعد أن كان جحيما في الماضي، فاعامد علي AWS لكن مع واحهة أفضل.

- [Vercel موقع](https://vercel.com/)
- [Create T3 App Vercel كتيب تعليمات](/en/deployment/vercel)

### PlanetScale

**حتي لا تقلق علي قواعد بياناتك بعد الان**
تعد PlanetScale أحد أفضل مزودي خدمة قواعد البانات علي الاطلاق فبقدرتها علي التوسع وتجربة المطور الممتازة والاسعار المعقولة.

- [PlanetScale Homepage](https://planetscale.com/)

### Railway

**لإستضافة البنية التحتية لبموقعك**
فهي Heroku العصر الحديث، إذا كانVercel , PlanetScale غير كافيين لك، فـ Railway ستكون خيارك المناسب.

- [Railway موقع](https://railway.app/)

### Upstash

**For serverless Redis**

We love Prisma and PlanetScale, but some projects require a more performant solution. Upstash allows you to get the in-memory performance of Redis in your serverless project, without having to manage the infrastructure and scaling yourself.

- [Upstash Homepage](https://upstash.com/)

### Pusher

**For serverless WebSockets**
إذا كان الـ WebSockets مهمة بالنسبة لك، فإنة من الافضل الاعتماد علي سيرفر تقليدي مثل [Fastify](https://www.fastify.io/) والتي أيضا تدعم(which [also works with tRPC!](https://trpc.io/docs/v10/fastify) لكن اذا كانت السرعة مهمه فأن Pusher هو الخيار المناسب لك.
- [Pusher Homepage](https://pusher.com/)

### Soketi

Soketi is an self-hostable, simple, and fast alternative to Pusher. It's fully compatible with the Pusher SDK which you can use to connect to the server. Soketi serverless is also in beta.

- [Soketi Homepage](https://soketi.app)
- [Soketi GitHub](https://github.com/soketi/soketi)

## Analytics

User data is very valuable when you're building an app. Here are some analytics providers we recommend.

### Plausible

Need analytics? Plausible is one of the quickest ways to get them. Super minimal. It even has a [simple plugin for Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Plausible Homepage](https://plausible.io/)

### Umami

Umami is a self-hostable, simple, fast, privacy-focused alternative to Google Analytics. You can deploy it really easily to Vercel, Railway, etc. with PlanetScale as your database.

- [Umami Homepage](https://umami.is/)
- [Umami GitHub](https://github.com/umami-software/umami)

## Other

### Next Bundle Analyzer

It can sometimes be difficult to determine what will be included in the build output for your app. Next Bundle Analyzer is an easy way to visualize and analyze the JavaScript bundles that are generated.

- [@next/bundle-analyzer on npm](https://www.npmjs.com/package/@next/bundle-analyzer)
