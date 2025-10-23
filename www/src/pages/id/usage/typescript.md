---
title: TypeScript
description: Penggunaan TypeScript
layout: ../../../layouts/docs.astro
lang: id
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Build safety nets, not guard rails<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @t3dotgg"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Theo - pembuat T3 Stack</span>
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

Baik Anda seorang pengembang baru maupun berpengalaman, kami percaya bahwa **TypeScript adalah sesuatu yang wajib dimiliki**.  
Meskipun terlihat menakutkan di awal, seperti banyak alat lainnya, setelah Anda mulai menggunakannya, Anda tidak akan ingin kembali lagi.

TypeScript memberikan umpan balik langsung saat Anda menulis kode dengan mendefinisikan tipe data yang diharapkan.  
Ia dapat membantu dengan fitur **autocomplete** di editor kode Anda, atau memberikan tanda garis merah bergelombang jika Anda mencoba mengakses properti yang tidak ada, atau mengirimkan nilai dengan tipe yang salah — hal-hal yang biasanya baru akan Anda temukan saat debugging di kemudian hari.

Mungkin ini adalah alat yang **paling meningkatkan produktivitas pengembang** — menyediakan dokumentasi kode yang sedang Anda tulis atau gunakan langsung di editor, serta memberikan umpan balik instan setiap kali Anda melakukan kesalahan — benar-benar tak ternilai.

## Inferensi Tipe (Type Inference)

Banyak pengembang baru di TypeScript terlalu fokus pada cara _menulis_ TypeScript, padahal banyak manfaatnya justru bisa dirasakan **tanpa perlu mengubah kode sama sekali**, khususnya melalui fitur **inferensi tipe**.

Inferensi berarti bahwa jika suatu hal sudah memiliki tipe, tipe tersebut akan “mengikuti” nilainya di seluruh alur aplikasi tanpa perlu dideklarasikan ulang di tempat lain.  
Misalnya, setelah Anda mendefinisikan tipe dari argumen suatu fungsi, sisa isi fungsi biasanya sudah **aman terhadap tipe (type-safe)** tanpa perlu menulis kode TypeScript tambahan.

Para pembuat library menghabiskan banyak waktu untuk menjaga konsistensi tipe di library mereka, dan berkat itu, kita sebagai pengembang aplikasi dapat menikmati inferensi serta dokumentasi langsung dari editor yang disediakan oleh tipe-tipe tersebut.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tonton video Theo tentang bagaimana [Anda mungkin menggunakan TypeScript dengan cara yang salah](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Penggunaan Kuat dari Inferensi Tipe

### Zod

[Zod](https://github.com/colinhacks/zod) adalah library validasi skema yang dibangun di atas TypeScript.  
Tulis sebuah skema yang menjadi sumber kebenaran tunggal (single source of truth) untuk data Anda, dan Zod akan memastikan bahwa data tersebut tetap valid di seluruh aplikasi — bahkan melintasi batas jaringan dan API eksternal.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) memberikan query dan mutasi deklaratif yang selalu diperbarui secara otomatis — meningkatkan pengalaman baik bagi pengembang maupun pengguna secara langsung.

## Sumber Daya Berguna

| Sumber Daya                                               | Tautan                                                            |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| Buku Panduan TypeScript                                   | https://www.typescriptlang.org/docs/handbook/                     |
| Tutorial TypeScript untuk Pemula                          | https://github.com/total-typescript/beginners-typescript-tutorial |
| Tantangan Type                                            | https://github.com/type-challenges/type-challenges                |
| Kanal YouTube “Rodney Mullen of TypeScript” (Matt Pocock) | https://www.youtube.com/c/MattPocockUk/videos                     |
