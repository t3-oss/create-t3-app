---
title: Inne Rekomendacje
description: Biblioteki i usługi, które polecamy dla wielu projektów
layout: ../../layouts/docs.astro
---

Zdajemy sobie sprawę z tego, że biblioteki które zawiera `create-t3-app` nie są lekarstwem na wszystko. Polecamy zaczynać projekty z rzeczami, które są już dołączone - przyjdzie jednak czas, kiedy będziesz musiał dodać swoje paczki. Tylko ty wiesz, czego twój projekt potrzebuje. Polecamy przejrzeć jednak poniższą listę naszych rekomendacji.

Są to rekomendacje pojedynczych kontrybutorów i nie powinny być postrzegane jako "oficjalne" sposoby na rowiązywanie danych problemów od zespołu `create-t3-app` czy też T3-OSS.
_**Zrób swój research, szczególnie zanim skorzystasz z płatnych usług**_.

## State Management

_**Uwaga Edytora**_: Biblioteki do state managementu mogą być niezłe, jednak często nie są one potrzebne. Hooki od tRPC (a dokładniej od React Query) powinny być w stanie zarządzać statem od strony serwera. W przypadku state'a klienta, zacznij od hooka `useState` oferowanego przez Reacta i skorzystaj z poniższych opcji jeśli będziesz potrzebować czegoś więcej.

### Zustand

**Aby nigdy więcej nie używać Reduxa**

"Nowoczesny, prosty Redux", o którym nie wiedziałeś, że go potrzebujesz. [Poimandresowi](https://github.com/pmndrs) zawsze można zaufać. Zbudować możesz wszystko, począwszy od aplikacji do rozmów wideo a skończywszy na grach czy też serwerach.

- [Strona główna Zustanda](https://zustand-demo.pmnd.rs/)
- [GitHub Zustanda](https://github.com/pmndrs/zustand)

### Jotai

**Aby nigdy więcej nie używać kontekstu**

Przy bardziej "niepodzielnym" podejściu, ciężko jest pobić Jotai. Także wykonana przez [Poimandres](https://github.com/pmndrs), Jotai pozwala ci definiować singletony które sprawiają wrażenie, jakby były globalnym hookiem `useState`. Świetna opcja do zachowań wymagających zachowania ze statem i takich, które jeszcze nie potrzebują maszyny state'a.

- [Strona główna Jotai](https://jotai.org/)
- [GitHub Jotai](https://github.com/pmndrs/jotai)

## Biblioteki Komponentów

Wiele aplikacji wymaga tej samej garści komponentów - przełączników, dropdownów czy też modali. Biblioteki te zaopatrzą cię w znakmite i przystępne componenty, z których możesz korzystać i które możesz dostosowywać jak tylko chcesz.

### Biblioteki Komponentów Bez Narzuconych Stylów

Znane także jako biblioteki "headless", zapoatrzą cię w znakomite, przystępne komponenty bez narzuconych stylów, które będziesz mógł dostosować jak tylko chcesz. Tu znajdziesz kilka rekomendacji.

- [Radix UI](https://www.radix-ui.com/) zaopatrzy cię w olbrzymi zestaw praktycznych i przystępnych prymitywów, które będziesz mógł dostosować do swoich potrzeb z czystym CSSem lub Tailwind CSS.

- [Headless UI](https://headlessui.com/) wykonane przez zespół stojący za Tailwind CSS, przekazuje ci przystępne komponenty bez narzuconych stylów, które bezproblemowo integrują się z Tailwind CSS.

- [React Aria](https://react-spectrum.adobe.com/react-aria/) zaopatrzy cię w przystępne prymitywy do UI dla twojego design systemu.

### Biblioteki Komponentów Z Gotowymi Stylami

**For when you just want your app to look OK**

Sometimes you're building a project where you just want the UI to look decent out of the box. For Admin Dashboards and other similar projects, any of these component libraries will get the job done.

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)

### Class Variance Authority

**For building UI Libraries**

Declaratively build a UI Library with different color, size, etc. variants. When your project reaches a scale where you want a standardized set of UI components with multiple variants using Tailwind CSS, CVA is a great tool.

- [Class Variance Authority GitHub](https://github.com/joe-bell/cva)

## Animations

For when you need animations in your app, here are our recommendations.

### AutoAnimate

**For animations with a single line of code**

Most animation libraries try to satisfy every possible use case, and become clunky as a result. AutoAnimate is a zero-configuration tool that will give you a significant improvement in UX with no additional developer effort.

- [AutoAnimate Homepage](https://auto-animate.formkit.com/)
- [AutoAnimate GitHub](https://github.com/formkit/auto-animate)
- [AutoAnimate Component Snippet](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**For complex animations with declarative code**

Framer Motion provides a simple, declarative syntax and allows you to write less code to craft everything from complex animations to even gestures.

- [Framer Motion Homepage](https://framer.com/motion)
- [Framer Motion Documentation](https://www.framer.com/docs/)

## Deployments, Infrastructure, Databases and CI

### Vercel

**For hosting your app**

Vercel took the hell of web deployments and made it a set-and-forget GitHub integration. We've scaled to hundreds of thousands of users without issue. AWS-powered, just a way better interface :)

- [Vercel Homepage](https://vercel.com/)
- [Create T3 App Vercel deployment guide](/en/deployment/vercel)

### PlanetScale

**For databases without the worry**

PlanetScale is the best "serverless database platform" we've used by far. Insane scale, great developer experience, fantastic pricing. If you're using SQL (and hopefully Prisma), this is hard to beat.

- [PlanetScale Homepage](https://planetscale.com/)

### Railway

**For hosting your infra**

"Modern Heroku". Easiest way to get a real server up and running. If Vercel and PlanetScale aren't enough, Railway probably is. Point it at a GitHub repo and go.

- [Railway Homepage](https://railway.app/)

### Upstash

**For serverless Redis**

We love Prisma and PlanetScale, but some projects require a more performant solution. Upstash allows you to get the in-memory performance of Redis in your serverless project, without having to manage the infrastructure and scaling yourself.

- [Upstash Homepage](https://upstash.com/)

### Pusher

**For serverless WebSockets**

If WebSockets are the primary focus of your project, you may want to consider a more traditional backend such as [Fastify](https://www.fastify.io/) (which [also works with tRPC!](https://trpc.io/docs/v10/fastify)). But for quickly adding WebSockets to a T3 App, Pusher is an excellent choice.

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
