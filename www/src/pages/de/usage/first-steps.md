---
title: Erste Schritte
description: Erste Schritte mit deiner neuen T3 App
layout: ../../../layouts/docs.astro
lang: de
---

Du hast gerade eine neue T3 App erstellt und bist bereit loszulegen. Hier ist das Mindeste, um deine App zum Laufen zu bringen.

## Datenbank

Wenn deine App Prisma beinhaltet, musst du `npx prisma db push` aus dem Stammverzeichnis deiner App ausführen. Dieser Befehl synchronisiert dein Prisma-Schema mit deiner Datenbank und generiert die TypeScript-Typen für den Prisma-Client basierend auf deinem Schema. Beachte, dass du den TypeScript-Server nach dieser Aktion neu starten musst, damit die generierten Typen erkannt werden.

## Authentifizierung

Wenn deine App NextAuth.js beinhaltet, starten wir mit dem `DiscordProvider`. Dies ist einer der einfachsten Provider, die NextAuth.js anbietet, aber trotzdem ist noch ein wenig Einrichtung deinerseits erforderlich.

Solltest du einen anderen Authentifizierungsanbieter bevorzugen, kannst du auch einen der [viele Anbieter](https://next-auth.js.org/providers/) verwenden, die NextAuth.js anbietet.

1. Du benötigst einen Discord-Account. Registriere dich, wenn du noch keinen hast.
2. Navigiere zu https://discord.com/developers/applications und klicke in der oberen rechten Ecke auf "New Application". Gib deiner Anwendung einen Namen und stimme den Nutzungsbedingungen zu.
3. Sobald deine Anwendung erstellt wurde, navigiere zu "Settings → OAuth2 → General".
4. Kopiere die "Client ID" und füge sie in deine `.env` als `DISCORD_CLIENT_ID` ein.
5. Klick "Reset Secret", kopiere das neue Secret und füge den Wert in deine `.env` als `DISCORD_CLIENT_SECRET` ein.
6. Klick "Add Redirect" und gib `http://localhost:3000/api/auth/callback/discord` ein.
   - Für den Produktivbetrieb müssen die vorherigen Schritte erneut verfolgt werden, um eine weitere Discord-Anwendung zu erstellen. Ersetze diesmal `http://localhost:3000` mit der URL, auf die du veröffentlichen möchtest.
7. Speicher die Änderungen.
8. Schreib das `NEXTAUTH_SECRET` in `.env`. Während der Entwicklung funktioniert jeder String. Für den Produktivbetrieb sollte ein Blick auf die Notiz in `.env` geworfen werden, um ein sicheres Secret zu erstellen.

Du solltest dich nun anmelden können.

## Nächste Schritte

- Wenn deine App tRPC beinhaltet, schau dir `src/pages/index.tsx` und `src/server/trpc/router/example.ts` an, um zu sehen, wie tRPC-Abfragen funktionieren.
- Schau dir die `create-t3-app`-Dokumentation an, sowie die Dokumentation der Pakete, die deine App beinhaltet.
- Tritt unserem [Discord](https://t3.gg/discord) bei und gib uns einen Stern auf [GitHub](https://github.com/t3-oss/create-t3-app)! :)
