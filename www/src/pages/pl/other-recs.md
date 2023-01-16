---
title: Inne Rekomendacje
description: Biblioteki i usługi, które polecamy dla wielu projektów
layout: ../../layouts/docs.astro
lang: pl
---

Zdajemy sobie sprawę z tego, że biblioteki które zawiera Create T3 App nie są lekarstwem na wszystko. Polecamy zaczynać projekty z rzeczami, które są już dołączone - przyjdzie jednak czas, kiedy będziesz musiał dodać swoje paczki. Tylko ty wiesz, czego twój projekt potrzebuje. Polecamy przejrzeć jednak poniższą listę naszych rekomendacji.

Są to rekomendacje pojedynczych kontrybutorów i nie powinny być postrzegane jako "oficjalne" sposoby na rowiązywanie danych problemów od zespołu Create T3 App czy też T3-OSS.
_**Zrób swój research, szczególnie zanim skorzystasz z płatnych usług**_.

## State Management

_**Informacja**_: Biblioteki do state managementu mogą być niezłe, jednak często nie są one potrzebne. Hooki od tRPC (a dokładniej od React Query) powinny być w stanie zarządzać statem od strony serwera. W przypadku state'a klienta, zacznij od hooka `useState` oferowanego przez Reacta i skorzystaj z poniższych opcji jeśli będziesz potrzebować czegoś więcej.

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

Wiele aplikacji wymaga tej samej garści komponentów - przełączników, dropdownów czy też modali. Biblioteki te zaopatrzą cię w znakomite i przystępne komponenty, z których możesz korzystać, i które możesz dostosowywać jak tylko chcesz.

### Biblioteki Komponentów Bez Narzuconych Stylów

Znane także jako biblioteki "headless", zapoatrzą cię w znakomite, przystępne komponenty bez narzuconych stylów, które będziesz mógł dostosować jak tylko chcesz. Tu znajdziesz kilka rekomendacji.

- [Radix UI](https://www.radix-ui.com/) zaopatrzy cię w olbrzymi zestaw praktycznych i przystępnych prymitywów, które będziesz mógł dostosować do swoich potrzeb z czystym CSSem lub Tailwind CSS.

- [Headless UI](https://headlessui.com/) wykonane przez zespół stojący za Tailwind CSS, przekazuje ci przystępne komponenty bez narzuconych stylów, które bezproblemowo integrują się z Tailwind CSS.

- [React Aria](https://react-spectrum.adobe.com/react-aria/) zaopatrzy cię w przystępne prymitywy do UI dla twojego design systemu.

### Biblioteki Komponentów Z Gotowymi Stylami

**W przypadku, kiedy chcesz żeby twoja aplikacja wyglądała OK**

Czasem budując projekt, chcesz aby Ui wyglądało po prostu przyzwoicie. Do projektów takich jak panele administratora i podobnych, każda z tych bibliotek da sobie doskonale radę.

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)

### Class Variance Authority

**Gdy budujesz własną bibliotekę UI**

Zbuduj bibliotekę UI z różnymi kolorami, rozmiarami, wariantami itp. Gdy twój projekt osiągnie skalę na tyle dużą, że będziesz musiał skorzystać z ustandaryzowanego zestawu komponentów z wieloma wariantami (korzystając przy tym z Tailwind CSS), CVA stanie się doskonałym narzędziem.

- [GitHub Class Variance Authority](https://github.com/joe-bell/cva)

## Animacje

Rekomendacje na sytuacje, kiedy w aplikacji potrzebować będziesz animacji :)

### AutoAnimate

**Aby animacje były pojedynczą linią kodu**

Wiele bibliotek od animacji stara się rozwiązać każdy możliwy problem, stając się przy tym uciężałe i niezbyt praktyczne. AutoAnimate to narzędzie niewymagające konfiguracji, które pozwoli ci uzyskać znaczącą poprawę w UX twojej aplikacji bez dodatkowego wysiłku.

- [Strona główna AutoAnimate](https://auto-animate.formkit.com/)
- [GitHub AutoAnimate](https://github.com/formkit/auto-animate)
- [Snippet komponentu AutoAnimate](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**Złożone animacje z deklaratywnym kodem**

Framer Motion pozwala Ci w prosty sposób i z deklaratywną składnią napisać mało kodu, a w zamian zaopatrzy twoją aplikację w złożone animacje, czy nawet reakcje na gesty.

- [Strona główna Framer Motion](https://framer.com/motion)
- [Dokumentacja Framer Motion](https://www.framer.com/docs/)

## Wdrażanie, Infrastruktura, Bazy Danych i CI

### Vercel

**Aby zhostować swoją aplikację**

Vercel zamienił prawdziwe piekło deploymentu aplikacji w łatwą integrację z GitHubem. Przeskalowaliśmy się do setek tysięcy użytkowników bez problemu. Napędzany przez AWS, o wiele lepszy interfejs :)

- [Strona główna Vercel](https://vercel.com/)
- [Poradnik deploymentu aplikacji T3 z Vercelem](/pl/deployment/vercel)

### PlanetScale

**Bazy danych bez obaw**

PlanetScale to najlepsza platforma "serverless" do baz danych, z której kiedykolwiek korzystaliśmy. Znakomicie się skaluje, dostarcza świetny DX, zawiera doskonałe ceny. Jeżeli korzystasz z SQLa (i miejmy nadzieję z Prismy), ciężko jest tą usługę pobić.

- [Strona główna PlanetScale](https://planetscale.com/)

### Railway

**Aby hostować swoją infrastrukturę**

"Nowoczesne Heroku". Najłatwiejszy sposób aby uzyskać prawdziwy działający serwer. Jeżeli Vercel i PlanetScale nie są dla Ciebie wystarczające, prawdopodobnie Railway będzie. Połącz go z repozytorium GitHuba i gotowe.

- [Strona główna Railway](https://railway.app/)

### Upstash

**Redis dla aplikacji "serverless"**

Kochamy Prismę i PlanetScale, ale niektóre projekty wymagają bardziej wydajnego rozwiązania. Upstash pozwala na prędkość bliską tej przy bezpośrednim odczycie z pamięci w twoim projekcie "serverless", przy tym nie obciążając Cię zarządzaniem infrastruktury i skalowania.

- [Strona główna Upstash](https://upstash.com/)

### Pusher

**WebSockety "serverless"**

Jeżeli WebSockety stanowią główną część projektu, możesz chcieć rozważyć bardziej tradycyjny backend taki jak [Fastify](https://www.fastify.io/) ([który również działa z tRPC!](https://trpc.io/docs/v10/fastify)). Jesli jednak chcesz szybko dodać WebSockety do aplikacji T3, Pusher to doskonały wybór.

- [Strona głowna Pushera](https://pusher.com/)

### Soketi

Soketi to prosta w użyciu alternatywa do Pushera, którą hostuje się samemu. Jest w pełni kompatybilna z SDK Pushera, z którego możesz korzystać, aby połączyć się z serwerem. Wersja "serverless" Soketi jest w becie.

- [Strona główna Soketi](https://soketi.app)
- [GitHub Soketi](https://github.com/soketi/soketi)

## Statystyki Stron (Analytics)

Budując aplikację, dane użytkowników są bardzo cenne. Znajdziesz tu parę serwisów do ich zbierania, które polecamy.

### Plausible

Potrzebujesz zbierać statystyki? Plausible to jedna z najszybszych opcji aby to zrobić. Bardzo minimalna. Posiada nawet [prosty plugin dla Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Strona główna Plausible](https://plausible.io/)

### Umami

Umami to prosta w użyciu, open-source, szybka i skupiająca się na prywatności alternatywa dla Google Analytics, którą hostuje się samemu. Możesz go zdeploy'ować dzięki serwisom, takim jak Vercel, Railway itp., korzystając przy tym z PlanetScale jako bazy danych.

- [Strona główna Umami](https://umami.is/)
- [GitHub Umami](https://github.com/umami-software/umami)

## Inne

### Next Bundle Analyzer

Określenie co znajdzie się w finalnym buildzie aplikacji może czasem stanowić problem. Next Bundle Analyzer to łatwy sposób na wizualizację i analizę kodu JavaScript, który zostaje wygenerowany.

- [@next/bundle-analyzer na npm](https://www.npmjs.com/package/@next/bundle-analyzer)
