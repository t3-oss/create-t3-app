---
title: TypeScript
description: إستخدام TypeScript
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Build safety nets, not guard rails<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 mr-4 rounded-full bg-neutral-500"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Theo - creator of the T3 Stack</span>
      <a
        href="https://twitter.com/t3dotgg"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @t3dotgg
      </a>
    </div>
  </cite>
</blockquote>

سواءََ كُنت مُبرمجا مُبتدئاََ أو مُتمرسًا ، فعلبك أن تتأكد تمام الثقة أن TypeScript أمر لا بد منه. قد تبدو مخيفتاََ في البداية ، ولكنها في الواقع فحالها كحال الأدوات الأخرى، وهي شيء لا يَنظر فية الكثيرون أبدًا بعد البدء في استخدامها.

فتُوفر مٌلاحظات مٌباشرة أثناء كِتابة الكود عَن طَريق تَحديد أنواع البيانات المتوقعة ، وأيضا تٌوفر خاصية الإكمال التلقائي في الـ Editor الخاص بك ، أو ربما ستصرخ عَليك بِخطوط مُتعرجة حمراء إذا حاولت الوصول إلى خاصية غير موجودة أو إذا قمت بتمرير قيمة من النوع الخطأ ، التي قد تضطر إلى تصحيحها.

## الـ Type Inference

يميل الكثير من مٌطوري Typescript إلى كِتابة الكثير من الـ types وفي واقع الامر أن هذا ليس ضرورياََ أبداََخاصتاََ مع وجود الـ Inference.
لكن ... إنتظر لحظة .. ، ما هو الـ Inference اصلا ؟ حسنا .. الـ Inference هو تَتَبُع الـ Types لك في كل مكان في الكود، يُفيدك في أنه يُغنيك عن تِكرار كتابة الـ Types في أماكن أخرى.

<div class="embed">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

الق نظرة علي [you might be using TypeScript wrong](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## إستخدامات الـ type inference

### مكتبة Zod

مكتبة [Zod](https://github.com/colinhacks/zod) هي schema validation library تم بِنائوها بـ Typescript. فَقط اٌكتب الـ Schema التي تٌمثل مَصدر الحقيقة الاساسي single source of truth ودع الباقي لـ zod وهي ستتكفل بة.

### مكتبة Tanstack Query

تُسهل عليك كِتابة وإدارة الـ queries و الـ mutations مما يٌدوي الي تحسين تجربة المٌطور والمستخدم.

## مصادر مفيدة

| المصدر                                                    | الرابط                                                            |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| TypeScript Handbook                                       | https://www.typescriptlang.org/docs/handbook/                     |
| Beginners TypeScript Tutorial                             | https://github.com/total-typescript/beginners-typescript-tutorial |
| Type Challenges                                           | https://github.com/type-challenges/type-challenges                |
| Rodney Mullen of TypeScript (Matt Pocock) Youtube Channel | https://www.youtube.com/c/MattPocockUk/videos                     |
