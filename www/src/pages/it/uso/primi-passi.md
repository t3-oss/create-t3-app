---
title: Primi Passi
description: Inizia con la tua nuova app T3
layout: ../../../layouts/docs.astro
---

Hai appena creato una nuova app T3 e sei pronto a partire. Ecco il minimo indispensabile per far funzionare la tua app.

## Database

Se la tua app include Prisma, assicurati di eseguire `npx prisma db push` dalla directory principale della tua app. Questo comando sincronizzerà il tuo schema Prisma con il tuo database e genererà i tipi TypeScript per il client Prisma in base al tuo schema. Si noti che è necessario riavviare il server TypeScript dopo aver eseguito questa operazione in modo che possa rilevare i tipi generati.

## Autenticazione

Se la tua app include NextAuth.js, iniziamo con `DiscordProvider`. Questo è uno dei provider più semplici offerti da NextAuth.js, ma richiede comunque un po' di configurazione iniziale da parte tua.

Naturalmente, se preferisci utilizzare un provider di autenticazione diverso, puoi anche utilizzare uno dei [molti provider](https://next-auth.js.org/providers/) offerti da NextAuth.js.

1. Avrai bisogno di un account Discord, quindi registrane uno se non l'hai già fatto.
2. Vai su https://discord.com/developers/applications e fai clic su "Nuova applicazione" nell'angolo in alto a destra. Assegna un nome alla tua applicazione e accetta i Termini di servizio.
3. Una volta creata l'applicazione, vai a "Impostazioni → OAuth2 → Generale".
4. Copia il "Client ID" e aggiungilo al tuo `.env` come `DISCORD_CLIENT_ID`.
5. Fai clic su "Reimposta segreto", copia il nuovo segreto e aggiungilo al tuo `.env` come `DISCORD_CLIENT_SECRET`.
6. Fai clic su "Aggiungi reindirizzamento" e digita "http://localhost:3000/api/auth/callback/discord".
   - Per la distribuzione di produzione, segui i passaggi precedenti per creare un'altra applicazione Discord, ma questa volta sostituisci "http://localhost:3000" con l'URL in cui stai distribuendo.
7. Salva modifiche.
8. Impostare `NEXTAUTH_SECRET` in `.env`. In fase di sviluppo funzionerà qualsiasi stringa, per la produzione vedere la nota in `.env` sulla generazione di un segreto sicuro.

Ora dovresti essere in grado di accedere.

## Prossimi passi

- Se la tua app include tRPC, controlla `src/pages/index.tsx` e `src/server/trpc/router/example.ts` per vedere come funzionano le query tRPC.
- Dai un'occhiata alle documentazione di `create-t3-app`, così come alle documentazione dei pacchetti inclusi nella tua app.
- Unisciti al nostro [Discord](https://t3.gg/discord) e assegnaci una stella su [GitHub](https://github.com/t3-oss/create-t3-app)! :)