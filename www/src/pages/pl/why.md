---
title: Dlaczego CT3A?
description: Dlaczego powinieneś wybrać Create T3 App dla swojego następnego projektu
layout: ../../layouts/docs.astro
lang: pl
---

Stworzyliśmy Create T3 App, ponieważ [Theo](https://twitter.com/t3dotgg) nie chciał przygotować szablonu składającego się ze swoich ulubionych technologii. Zainspirowany przez create-next-app, [CLI od Astro](https://astro.build) oraz ogólne zamiłowanie do typesafety, zespół Create T3 App ciężko pracował budując najlepszy możliwy punkt startowy dla nowych projektów korzystających ze stacka T3.

Jeżeli jesteś zainteresowany korzystaniem z Next.jsa w sposób, w który nie stracisz na typesafety, jest to znakomite miejsce, aby zacząć. Jeśli jesteś ciekawy co do poszczególnych technologii wybranych przez nas dla tego narzędzia, czytaj dalej :)

## Dlaczego TypeScript?

JavaScript jest ciężki. Dlaczego dodajemy więcej zasad?

Stanowczo wierzymy, że TypeScript pomoże ci być lepszym deweloperem. Zaopatruje Cię on w feedback na żywo definiując oczekiwane typy danych. Dostarcza także pomocnego autouzupełniania w edytorze lub krzyczy na ciebie czerwonymi podkreśleniami, jeżeli próbujesz uzyskać dostęp do właściwości, która nie istnieje, lub jesli próbujesz przesłać wartość złego typu - co skutkowałoby dłuższym debugowaniem w razie błędu. Bez względu na to, czy jesteś nowy w świecie web developmentu, czy też doświadczonym programistą, "surowość" jaką daje ci TypeScript pozwala na mniej frustrujące i bardziej konsekwentne doświadczenie niż czysty JS.

Typesafety pozwala ci być szybszym. Jeżeli dalej nie jesteś przekonany, może się okazać, że [korzystasz z TypeScripta źle...](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Dlaczego Next.js?

Kochamy Reacta. Zmienił on sposób tworzenia interfejsów na niewyobrażalnie bardziej przystępny. Może on także prowadzić dewelopera za rękę z miejscach, mogących sprawiać problemy.

Next.js oferuje lekko kontrowersyjne, bardzo zoptymalizowane podejście do tworzenia aplikacji z pomocą Reacta. Od routingu przez API do renderowania zdjęć, ufamy Next.jsowi i wierzymy, że prowadzi on nas do dobrych decyzji.

## Dlaczego tRPC/Prisma/Tailwind/itp.?

Staramy się utrzymać projekty w tak prosty sposób, jak tylko się da. Okazuje się jednak, że korzystamy z tych narzędzi w każdym "projekcie-aplikacji" jaki tylko budujemy. `create-t3-app` robi znakomitą robotę pozwalając ci zaadoptować te części, których potrzebujesz.

### tRPC

tRPC spełnia obietnice GraphQLa o bezproblemowej integracji klienta z serwerem bez niepotrzebnego boilerplate'a. Jest to przemyślane wykorzystanie TypeScripta które zaopatrzy Cię w niespotykane doświadczenie przy programowaniu.

### Prisma

Prisma dla SQLa to jak TypeScript dla JSa. Pozwala na DX jaki wcześniej nie istniał. Generując typy ze schematu zdefiniowanego przez użytkownika i kompatybilnego z [wieloma bazami danych](https://www.prisma.io/docs/concepts/database-connectors), Prisma gwarantuje typesafety na każdym kroku od bazy danych do twojej aplikacji.

Prisma oddaje ci w ręce cały [zestaw narzędzi](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows) ułatwiając codzienne integracje z bazą danych. Prisma Client odpowiedzialny za wykonywanie zapytań do bazy danych jest tak łatwy w użyciu, że nawet nie zorientujesz się, kiedy będziesz z niego korzystać. Prisma Studio natomiast to przystępny interfejs graficzny dla twojej bazy danych, który pozwala ci odczytywać z niej dane i manipulować nimi bez potrzeby pisania kodu.

### Tailwind CSS

Tailwind sprawia wrażenie "CSSa w trybie zen".

Zaopatrując Cię w narzędzia do budowania, takie jak świetne domyślne kolory, spacingi oraz inne prymitywy, Tailwind w znaczny sposób ułatwia stworzenie dobrze wyglądającej aplikacji. W przeciwieństwie do bibliotek komponentów, nie sprawia niepotrzebnych problemów, kiedy chcesz stworzyć coś unikalnego i pięknego.

Dodatkowo, z podejściem "inline", Tailwind zachęca cię do stylizowania aplikacji bez martwienia się o nazywanie klas, organizowanie struktury plików czy rozwiązywanie innych problemów niekoniecznie mających coś wspólnego z tym, co chcesz właśnie stworzyć.

### NextAuth.js

Kiedy chcesz dodać system kont do swojej aplikacji Next.js, NextAuth.js to znakomite rozwiązanie. Pozwala ono wdrożyć złożone systemy bezpieczeństwa nie zmuszając Cię przy tym do pisania ich własnoręcznie. NextAuth.js zawiera rozległą listę providerów, które zapewnią Ci szybki sposób na dodanie OAutha. Paczka ta posiada również wiele adapterów dla baz danych i ORMów.
