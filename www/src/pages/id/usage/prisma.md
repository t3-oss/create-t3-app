---
title: Prisma
description: Penggunaan Prisma
layout: ../../../layouts/docs.astro
lang: id
---

Prisma adalah ORM untuk TypeScript yang memungkinkan kamu mendefinisikan skema dan model database di dalam file `schema.prisma`, lalu menghasilkan klien yang aman secara tipe (type-safe) untuk berinteraksi dengan database dari sisi backend.

## Prisma Client

Prisma Client terletak di `src/server/db.ts`, di mana ia diinisialisasi sebagai variabel global (seperti yang direkomendasikan sebagai [best practice](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) oleh tim Prisma) dan diekspor agar dapat digunakan di seluruh route API.  
Kita sudah menyertakan Prisma Client di dalam [Context](/id/usage/trpc#-serverapitrpcts) secara default, dan sangat disarankan untuk menggunakannya melalui Context daripada mengimpor secara terpisah di setiap file.

## Skema (Schema)

Kamu akan menemukan file skema Prisma di `/prisma/schema.prisma`.  
File ini berfungsi untuk mendefinisikan struktur dan model database, serta digunakan ketika menghasilkan Prisma Client.

### Dengan NextAuth.js

Ketika kamu memilih NextAuth.js bersamaan dengan Prisma, file skema akan dihasilkan secara otomatis dan dikonfigurasi dengan nilai yang direkomendasikan untuk model `User`, `Session`, `Account`, dan `VerificationToken`, sesuai dengan [dokumentasi NextAuth.js](https://next-auth.js.org/adapters/prisma).

## Database Default

Database default yang digunakan adalah SQLite — sangat cocok untuk pengembangan atau membuat proof-of-concept dengan cepat, tetapi **tidak direkomendasikan untuk produksi**.  
Kamu dapat mengubah database dengan mengganti `provider` di blok `datasource` menjadi `postgresql` atau `mysql`, lalu memperbarui connection string di environment variable agar menunjuk ke database yang kamu gunakan.

## Mengisi Data Awal (Seeding) pada Database

[Seeding database](https://www.prisma.io/docs/guides/database/seed-database) adalah cara cepat untuk mengisi database dengan data percobaan agar kamu bisa langsung mulai bekerja.  
Untuk menyiapkannya, buat file `seed.ts` di direktori `/prisma`, lalu tambahkan skrip `seed` di file `package.json`.  
Kamu juga membutuhkan TypeScript runner untuk menjalankan file seed tersebut.  
Kami merekomendasikan [tsx](https://github.com/esbuild-kit/tsx), karena performanya tinggi dan tidak memerlukan konfigurasi ESM, tapi kamu juga bisa menggunakan `ts-node` atau runner lainnya.

```jsonc:package.json
{
  "scripts": {
    "db-seed": "NODE_ENV=development prisma db seed"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

```ts:prisma/seed.ts
import { db } from "../src/server/db";

async function main() {
  const id = "cl9ebqhxk00003b600tymydho";
  await db.example.upsert({
    where: {
      id,
    },
    create: {
      id,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
```

Setelah itu, jalankan `pnpm db-seed` (atau gunakan `npm`/`yarn`) untuk mengisi database kamu.

## Sumber Daya yang Berguna

| Sumber Daya                 | Tautan                                                                                                                                                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dokumentasi Prisma          | [https://www.prisma.io/docs/](https://www.prisma.io/docs/)                                                                                                                                                                                                                                             |
| GitHub Prisma               | [https://github.com/prisma/prisma](https://github.com/prisma/prisma)                                                                                                                                                                                                                                   |
| Prisma Migrate Playground   | [https://playground.prisma.io/guides](https://playground.prisma.io/guides)                                                                                                                                                                                                                             |
| NextAuth.JS Prisma Adapter  | [https://next-auth.js.org/adapters/prisma](https://next-auth.js.org/adapters/prisma)                                                                                                                                                                                                                   |
| Panduan Koneksi PlanetScale | [https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale) |
