---
title: Langkah Pertama
description: Memulai dengan Aplikasi T3 baru Anda
layout: ../../../layouts/docs.astro
lang: id
---

Anda baru saja membuat kerangka (scaffold) Aplikasi T3 baru dan siap digunakan. Berikut adalah hal-hal minimum yang perlu dilakukan agar aplikasi Anda dapat berjalan.

## Database

### MySQL, PostgreSQL

Jika Anda memilih MySQL atau PostgreSQL sebagai database, aplikasi T3 Anda akan disertai dengan skrip bash `start-database.sh` yang dapat membuat container Docker dengan database untuk pengembangan lokal. Jika Anda sudah memiliki database sendiri, Anda dapat menghapus file ini dan memasukkan kredensial database Anda ke dalam file `.env`.  
Di macOS, Anda juga dapat menggunakan [DBngin](https://dbngin.com/) jika tidak ingin menggunakan Docker.

### Prisma

Jika aplikasi Anda menggunakan Prisma, pastikan untuk menjalankan perintah `npx prisma db push` dari direktori root aplikasi Anda. Perintah ini akan menyinkronkan skema Prisma Anda dengan database serta menghasilkan tipe TypeScript untuk Prisma Client berdasarkan skema tersebut.  
Perlu diperhatikan bahwa Anda perlu [memulai ulang server TypeScript](https://tinytip.co/tips/vscode-restart-ts/) setelah menjalankan perintah ini agar TypeScript dapat mendeteksi tipe yang telah dihasilkan.

### Drizzle

Jika aplikasi Anda menggunakan Drizzle, periksa file `.env` untuk melihat instruksi tentang cara membuat variabel lingkungan `DATABASE_URL`. Setelah file `.env` siap, jalankan perintah `pnpm db:push` (atau perintah setara untuk manajer paket lainnya) untuk mendorong (push) skema Anda ke database.

## Autentikasi

Jika aplikasi Anda menyertakan NextAuth.js, kami telah menyiapkannya dengan `DiscordProvider`. Ini adalah salah satu penyedia autentikasi paling sederhana yang ditawarkan oleh NextAuth.js, tetapi tetap memerlukan sedikit pengaturan awal dari pihak Anda.

Tentu saja, jika Anda ingin menggunakan penyedia autentikasi lain, Anda dapat menggunakan salah satu dari [banyak penyedia](https://next-auth.js.org/providers/) yang ditawarkan oleh NextAuth.js.

1. Anda akan memerlukan akun Discord, jadi daftar terlebih dahulu jika belum punya.
2. Kunjungi https://discord.com/developers/applications dan klik **"New Application"** di pojok kanan atas. Beri nama aplikasi Anda dan setujui Ketentuan Layanan.
3. Setelah aplikasi Anda dibuat, buka menu **"Settings → OAuth2 → General"**.
4. Salin **"Client ID"** dan tambahkan ke `.env` Anda sebagai `AUTH_DISCORD_ID`.
5. Klik **"Reset Secret"**, salin secret baru tersebut, dan tambahkan ke `.env` sebagai `AUTH_DISCORD_SECRET`.
6. Klik **"Add Redirect"** dan ketik `http://localhost:3000/api/auth/callback/discord`.
   - Untuk deployment produksi, ikuti langkah-langkah yang sama tetapi ganti `http://localhost:3000` dengan URL tempat Anda akan melakukan deployment.
7. Simpan perubahan (**Save Changes**).

Sekarang Anda seharusnya sudah dapat melakukan login.

## Pengaturan Editor

Ekstensi berikut direkomendasikan untuk pengalaman pengembangan yang optimal. Tautan di bawah ini menyediakan dukungan plugin khusus untuk setiap editor.

- [Ekstensi Prisma](https://www.prisma.io/docs/guides/development-environment/editor-setup)
- [Ekstensi Tailwind CSS IntelliSense](https://tailwindcss.com/docs/editor-setup)
- [Ekstensi Prettier](https://prettier.io/docs/en/editors.html)

## Langkah Selanjutnya

- Jika aplikasi Anda menyertakan tRPC, lihat file `src/pages/index.tsx` dan `src/server/api/routers/post.ts` untuk memahami cara kerja query tRPC.
- Jelajahi dokumentasi Create T3 App serta dokumentasi paket-paket lain yang disertakan dalam aplikasi Anda.
- Bergabunglah dengan [Discord kami](https://t3.gg/discord) dan beri bintang di [GitHub](https://github.com/t3-oss/create-t3-app)! :)
