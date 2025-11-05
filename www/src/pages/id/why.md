---
title: Mengapa CT3A?
description: Mengapa kamu sebaiknya memilih Create T3 App untuk proyekmu berikutnya
layout: ../../layouts/docs.astro
lang: id
---

Kami memulai Create T3 App karena [Theo](https://twitter.com/t3dotgg) menolak membuat template dari teknologi favoritnya.  
Terinspirasi oleh create-next-app, [CLI milik Astro](https://astro.build), dan kecintaan umum terhadap typesafety, tim Create T3 App bekerja keras untuk membangun titik awal terbaik bagi proyek-proyek baru berbasis T3 Stack.

Jika kamu tertarik menggunakan Next.js dengan cara yang typesafe, inilah tempat terbaik untuk memulai. Jika kamu penasaran dengan alasan di balik setiap pilihan teknologi yang kami gunakan, lanjutkan membaca :)

## Mengapa TypeScript?

JavaScript itu sulit. Jadi, kenapa menambahkan lebih banyak aturan?

Kami sangat yakin bahwa pengalaman yang diberikan oleh TypeScript akan membantu kamu menjadi pengembang yang lebih baik.  
TypeScript memberikan umpan balik langsung saat kamu menulis kode dengan mendefinisikan tipe data yang diharapkan. Ia memberikan **autocomplete** yang berguna di editor, atau menandai kesalahan dengan garis merah jika kamu mencoba mengakses properti yang tidak ada, atau mengirim nilai dengan tipe yang salah — yang biasanya baru akan kamu temukan saat debugging nanti.

Baik kamu pengembang baru maupun profesional berpengalaman, “ketegasan” TypeScript memberikan pengalaman yang lebih konsisten dan jauh lebih sedikit membuat frustrasi dibanding JavaScript biasa.

Typesafety membuatmu bekerja lebih cepat.  
Jika kamu belum yakin, mungkin kamu [menggunakan TypeScript dengan cara yang salah...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## Mengapa Next.js?

Kami mencintai React. Framework ini membuat pengembangan UI menjadi lebih mudah diakses dengan cara yang sebelumnya sulit dibayangkan.  
Namun, React juga bisa membawa pengembang ke arah yang membingungkan jika tidak berhati-hati.

Next.js hadir dengan pendekatan yang ringan namun sangat dioptimalkan untuk membangun aplikasi berbasis React.  
Mulai dari routing, API, hingga image rendering, kami mempercayakan Next.js untuk membantu pengembang mengambil keputusan yang baik.

## Mengapa tRPC / Prisma / Tailwind / dan lainnya?

Meskipun kami percaya pada prinsip “sederhana itu lebih baik”, kami menemukan bahwa komponen-komponen ini selalu digunakan di hampir setiap proyek aplikasi yang kami buat.  
`create-t3-app` memudahkan kamu untuk mengadopsi hanya bagian-bagian yang kamu butuhkan.

### tRPC

tRPC mewujudkan janji GraphQL: pengembangan client yang mulus terhadap server yang typesafe — tanpa semua boilerplate-nya.  
Ini adalah “penyalahgunaan” TypeScript yang sangat cerdas dan menghasilkan pengalaman pengembangan yang luar biasa.

### Prisma

Prisma terhadap SQL ibarat TypeScript terhadap JavaScript — menghadirkan pengalaman pengembangan yang sebelumnya tidak pernah ada.  
Dengan menghasilkan tipe dari skema yang kamu definisikan sendiri dan kompatibel dengan [berbagai database](https://www.prisma.io/docs/concepts/database-connectors), Prisma menjamin **typesafety end-to-end** dari database hingga ke aplikasi.

Prisma juga menyediakan [beragam alat](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows) yang mempermudah interaksi harian dengan database.  
Secara khusus, Prisma Client membuat query dan SQL terasa sangat mudah hingga kamu hampir tidak sadar sedang menggunakannya.  
Sementara itu, Prisma Studio menyediakan antarmuka GUI yang praktis untuk membaca dan memanipulasi data tanpa perlu menulis kode.

### Tailwind CSS

Tailwind terasa seperti “zen-mode CSS”.

Dengan menyediakan blok-blok dasar berupa warna, jarak, dan komponen primitif yang baik, Tailwind memudahkan kamu membuat aplikasi dengan tampilan menarik.  
Berbeda dengan library komponen, Tailwind tidak membatasi kreativitasmu ketika kamu ingin membawa tampilan aplikasi ke level berikutnya — menjadikannya unik dan indah.

Selain itu, dengan pendekatan mirip inline, Tailwind mendorong kamu untuk menulis gaya tanpa harus memikirkan penamaan class, struktur file, atau hal-hal lain yang tidak langsung berkaitan dengan masalah yang sedang kamu selesaikan.

### NextAuth.js

Ketika kamu membutuhkan sistem autentikasi di aplikasi Next.js-mu, NextAuth.js adalah solusi hebat untuk menangani kompleksitas keamanan tanpa perlu membangunnya sendiri dari nol.  
NextAuth.js menyediakan daftar panjang **provider OAuth** untuk menambahkan autentikasi dengan cepat, serta adapter untuk berbagai database dan ORM populer.
