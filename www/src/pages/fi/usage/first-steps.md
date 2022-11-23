---
title: First Steps
description: Getting started with your new T3 App
layout: ../../../layouts/docs.astro
---

Olet juuri rakentanut uuden T3-sovelluksen ja olet valmis aloittamaan. Tässä on vähimmäisvaatimukset sovelluksesi toimimiseen.

## Tietokanta

Jos sovelluksesi sisältää Prisman, muista suorittaa `npx prisma db push` sovelluksesi juuri hakemistossa (root directory). Tämä komento synkronoi Prisma-skeemasi (schema) tietokantaasi ja luo TypeScript-tyypit Prisma-Clientille skeemasi perusteella. Huomaa, että sinun on käynnistettävä TypeScript-palvelin uudelleen tämän jälkeen, jotta se voi havaita luodut tyypit.

## Todennus

Jos sovelluksesi sisältää NextAuth.js:n, pääset alkuun `DiscordProvider`:in kanssa. Tämä on yksi yksinkertaisimmista NextAuth.js:n tarjoamista palveluntarjoajista, mutta se vaatii silti hieman alkuasetusta sinulta.

Tietysti, jos haluat käyttää toista todennustarjoajaa, voit käyttää myös yhtä [monista palveluntarjoajista](https://next-auth.js.org/providers/), joita NextAuth.js tarjoaa.

1. Tarvitset Discord-tilin, joten rekisteröi sellainen, jos et ole jo tehnyt sitä.
2. Siirry osoitteeseen https://discord.com/developers/applications ja napsauta "Uusi sovellus" oikeassa yläkulmassa. Anna hakemuksellesi nimi ja hyväksy käyttöehdot.
3. Kun sovelluksesi on luotu, siirry kohtaan "Asetukset → OAuth2 → Yleiset".
4. Kopioi "Client ID" ja lisää se `.env` -tiedostoon muodossa `DISCORD_CLIENT_ID`.
5. Napsauta Nollaa salaisuus (reset secret), kopioi uusi salaisuus ja lisää se `.env` -tiedostoon muodossa `DISCORD_CLIENT_SECRET`.
6. Napsauta "Lisää uudelleenohjaus (Add redirect)" ja kirjoita `http://localhost:3000/api/auth/callback/discord`.
   - Luo uusi Discord-sovellus tuotantokäyttöön noudattamalla edellisiä vaiheita, mutta korvaa tällä kertaa `http://localhost:3000` URL-osoitteella, johon otat käyttöön.
7. Tallenna muutokset.
8. Aseta `NEXTAUTH_SECRET` `.env`:ssä. Kehitettäessä mikä tahansa merkkijono toimii, tuotannon osalta katso `.env`:n huomautus suojatun salaisuuden luomisesta.

Nyt sinun pitäisi pytyä kirjautumaan sisään sovelluksessasi.

## Seuraavat askeleet

- Jos sinun sovellus sisältää tRPC:n, katso `src/pages/index.tsx` ja `src/server/trpc/router/example.ts` oppiaksesi miten tRPC pyynnöt (queries) toimivat.
- Tutustu `create-t3-app` -ohjeisiin sekä sovelluksesi sisältämien pakettien ohjeisiin.
- Liity meidän [Discordiin](https://t3.gg/discord) ja anna meille tähti [GitHubissa](https://github.com/t3-oss/create-t3-app)! :)
