---
title: Next.js
description: Penggunaan Next.js
layout: ../../../layouts/docs.astro
lang: id
---

Next.js adalah framework backend untuk aplikasi React Anda.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js adalah framework backend" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Lihat [presentasi Theo di Next.js Conf](https://www.youtube.com/watch?v=W4UhNo3HAMw) untuk mendapatkan pemahaman yang lebih baik tentang apa itu Next.js dan bagaimana cara kerjanya.</p>

## Mengapa saya harus menggunakannya?

Kami sangat menyukai React. React telah membuat pengembangan UI menjadi lebih mudah diakses dengan cara yang sebelumnya sulit dibayangkan. Namun, React juga dapat menuntun pengembang ke arah yang membingungkan jika tanpa panduan.  
Next.js menawarkan pendekatan yang **sedikit beropini namun sangat dioptimalkan** untuk membuat aplikasi menggunakan React. Mulai dari routing, definisi API, hingga rendering gambar — kami mempercayai Next.js untuk membantu pengembang membuat keputusan yang baik.

Menggabungkan Next.js dengan [Vercel](https://vercel.com/) membuat proses pengembangan dan deployment aplikasi web menjadi lebih mudah dari sebelumnya. Layanan gratis mereka yang sangat dermawan dan antarmuka yang super intuitif menyediakan solusi "klik dan jalankan" untuk mendistribusikan situs Anda (Kami ❤️ Vercel)

## Get Static/Server Props

Salah satu fitur utama Next.js adalah kemampuannya dalam **pengambilan data (data fetching)**.  
Kami sangat merekomendasikan membaca [dokumentasi resmi](https://nextjs.org/docs/basic-features/data-fetching) untuk memahami cara menggunakan setiap metode serta perbedaannya.  
Fungsi `getServerSideProps` umumnya **tidak disarankan**, kecuali jika ada alasan yang kuat untuk menggunakannya, karena sifatnya yang **blocking call** dan dapat memperlambat situs Anda.  
[Incremental Static Regeneration (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) adalah alternatif hebat untuk `getServerSideProps` ketika data bersifat dinamis dan bisa diambil secara bertahap.

Jika Anda tetap perlu menggunakan fitur ini, periksa tautan berikut:

- [Advanced tRPC - Callers, functions, and gSSP](https://www.youtube.com/watch?v=G2ZzmgShHgQ)
- [SSG-Helpers](https://trpc.io/docs/v9/ssg-helpers)

## Sumber Daya Berguna

| Sumber Daya                  | Tautan                             |
| ---------------------------- | ---------------------------------- |
| Dokumentasi Next.js          | https://nextjs.org/docs            |
| GitHub Next.js               | https://github.com/vercel/next.js  |
| Blog Next.js                 | https://nextjs.org/blog            |
| Discord Next.js              | https://nextjs.org/discord         |
| Twitter Next.js              | https://twitter.com/nextjs         |
| Kanal YouTube Vercel/Next.js | https://www.youtube.com/c/VercelHQ |
