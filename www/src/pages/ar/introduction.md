---
title: مقدمة
description: مقدمة إلى the T3 Stack
layout: ../../layouts/docs.astro
lang: ar
dir: rtl
---

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/PbjHxIuHduU" title="The best stack for your next project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## T3 Stack

الـ T3 Stack هو Stack لتطوير تطبيقات الويب بُني علي فَلسفة ( البساطة، قابلية إعادة الاستخدام والـ Type Safety )

القطع الأساسية هي [**Next.js**](https://nextjs.org/) , [**TypeScript**](https://typescriptlang.org/) , [**Tailwind CSS**](https://tailwindcss.com/) و دائما ما تَكون مُضافة، إذا كان مشروعك يتطلب Backend فَيُمكنك إضافة [**tRPC**](https://trpc.io/) , [**Prisma**](https://prisma.io/) و [**NextAuth.js**](https://next-auth.js.org/)

لعلك لاحظت أن هناك الكثير من القطع!، إن مُطلق الحرية أن تُضف قطعا وتَحذف أُخرى كما تشاء.

## حسنا … ما هو create-t3-app؟ أهو قالب (template)؟

نوعا من. في الواقع فقد تم إنشاء create-t3-app لتبسيط إعداد تطبيق T3 قَدر الإمكان. هذا يعني أن كل قطعة اختيارية ، فَكُل واحد يُشكله كما يشاء.

لا يحتوي `create-t3-app` علي كل ما تحتاجة فَعليك أن تُضيف مكتباتك الخاصة لحل ما سيواجهك من مشاكل. علي الرغم من أننا نريد أن نترك لك مُطلق الحرية في ذلك [لكن لدينا بعض الترشيحات لك](/en/other-recs).

## T3 Axioms

بَصراحة - هذا مشروع عنيد (opinionated). نتشارك جميعاََ في عدد قليل من المعتقدات الأساسية حَول كيفية البناء ونتخذها كأساس قراراتنا.

### Solve Problems

من السهل أن تَقع في فخ أن تُضيف كل شئ لكننا لا نريد ذَلك، يَجب أن يكون لكل شئ مَغزي وهدف مُحدد كما هو الحال في كل ما أضفناه مُسبقا ويَترتب علي ذلك عدم إضافة مكتبات مِثل (`zustand`, `redux`)، لكننا نُضيف مكتبات أُخري مُثل `NextAuth`, `Prisma` و `tRPC`.

### الإستخدام بِحذر.

نحن نحب التقنيات الحديثة، كَمَيَّة السعادة التي تأتي من تجرِبة الأشياء الجديدة أمر رائع، لكن تَتوخى الحذر فعليك إستخدام التقنيات الغير مستقرة في الأماكن الأقل حساسية، فمثلا نحن لا نراهن على قواعد بيانات حديثة، SQL تكفي وزيادة، لكننا سنراهن علي tRPC لأنها مجرد Functions ومن السهل الاستغناء عنها.

# # الـ Type Safety ليس خياراََ.

قد حددنا مُسبقاَ أن الهدف الأوحد من `create-t3-app` هو أن نوفر بِداية سَريعة لتطوير تطبيقات الويب مع إتخاذ الأمان كأولوية, فهو أمر لابد منه لتطور فاعليتك كمطور عن طريق تقليل عدد الـ Bugs قدر الإمكان.
أي قرار يضر بالطبيعة الآمنة لـ "create-t3-app" يَجب اتخاذه في مشروع مختلف.
