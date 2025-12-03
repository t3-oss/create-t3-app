---
title: Rekomendasi Lainnya
description: Pustaka dan layanan yang kami rekomendasikan untuk banyak proyek
layout: ../../layouts/docs.astro
lang: id
---

Kami menyadari bahwa pustaka yang disertakan dalam `create-t3-app` tidak menyelesaikan setiap masalah. Walaupun kami mendorong kamu untuk memulai proyek dengan hal-hal yang telah kami sediakan, akan ada saatnya kamu perlu menambahkan paket lain. Hanya kamu yang tahu apa yang dibutuhkan oleh proyekmu, tetapi berikut adalah beberapa hal yang sering kami rekomendasikan.

Rekomendasi ini berasal dari kontributor individu Create T3 App dan **tidak dianggap sebagai dukungan resmi** dari tim Create T3 App atau T3-OSS.  
_**Silakan lakukan riset sendiri, terutama sebelum menggunakan layanan berbayar.**_

## Manajemen State

_**Catatan Editor**_: Pustaka manajemen state bisa sangat membantu, tetapi sering kali tidak diperlukan. Hook React Query dari tRPC seharusnya sudah cukup untuk menangani state dari server. Untuk state di sisi klien, mulailah dengan `useState` dari React, dan gunakan salah satu opsi di bawah ini jika kamu memerlukan lebih banyak kemampuan.

### Zustand

**Agar tidak pernah menggunakan Redux lagi**

“Redux modern dan sederhana” yang mungkin belum kamu tahu kamu butuhkan. [Poimandres](https://github.com/pmndrs) selalu bisa dipercaya. Kamu bisa membangun segalanya, mulai dari aplikasi panggilan video, game, hingga server, hanya dengan pustaka kecil ini.

- [Beranda Zustand](https://zustand-demo.pmnd.rs/)
- [Zustand di GitHub](https://github.com/pmndrs/zustand)

### Jotai

**Agar tidak perlu menggunakan Context lagi**

Untuk pendekatan yang lebih atomik, Jotai sulit dikalahkan. Juga dibuat oleh [Poimandres](https://github.com/pmndrs), Jotai memungkinkanmu mendefinisikan singleton yang terasa seperti global `useState`. Pilihan hebat untuk perilaku stateful yang belum memerlukan state machine.

- [Beranda Jotai](https://jotai.org/)
- [Jotai di GitHub](https://github.com/pmndrs/jotai)

## Pustaka Komponen

Sebagian besar aplikasi membutuhkan komponen yang sama — tombol toggle, menu dropdown, modal, dan sebagainya. Pustaka berikut menyediakan komponen yang hebat dan mudah diakses, serta bisa kamu sesuaikan sesuai kebutuhan.

### Pustaka Komponen Tanpa Gaya (Unstyled)

Juga dikenal sebagai pustaka headless, mereka menyediakan komponen tanpa gaya namun tetap mudah diakses, dan bisa kamu kustomisasi sesukamu. Berikut beberapa rekomendasinya:

- [Radix UI](https://www.radix-ui.com/) memberikan kumpulan primitif yang kuat, mudah digunakan, dan dapat kamu gaya dengan CSS biasa atau Tailwind CSS.
- [Headless UI](https://headlessui.com/) dibuat oleh tim Tailwind CSS, menyediakan komponen tanpa gaya yang terintegrasi mulus dengan Tailwind CSS.
- [React Aria](https://react-spectrum.adobe.com/react-aria/) menyediakan primitif UI yang mudah diakses untuk sistem desainmu. Komponen Date Picker-nya termasuk yang terbaik.

### Pustaka Komponen Bergaya (Styled)

**Untuk saat kamu hanya ingin aplikasi terlihat bagus tanpa repot**

Terkadang kamu membuat proyek di mana tampilan UI-nya cukup “oke” sejak awal. Untuk dashboard admin dan proyek serupa, pustaka berikut akan menyelesaikan pekerjaan dengan baik.

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)
- [@shadcn/ui](https://ui.shadcn.com/)

### Class Variance Authority

**Untuk membangun pustaka UI sendiri**

Bangun pustaka UI secara deklaratif dengan berbagai varian warna, ukuran, dll. Saat proyekmu mencapai skala di mana kamu ingin memiliki kumpulan komponen UI standar dengan beberapa varian menggunakan Tailwind CSS, CVA adalah alat yang sangat cocok.

- [Class Variance Authority di GitHub](https://github.com/joe-bell/cva)

## Animasi

Untuk kebutuhan animasi di aplikasimu, berikut rekomendasi kami:

### AutoAnimate

**Untuk animasi dengan satu baris kode**

Sebagian besar pustaka animasi mencoba mencakup semua kemungkinan kasus penggunaan, sehingga menjadi rumit. AutoAnimate adalah alat tanpa konfigurasi yang dapat meningkatkan UX secara signifikan tanpa usaha tambahan dari pengembang.

- [Beranda AutoAnimate](https://auto-animate.formkit.com/)
- [AutoAnimate di GitHub](https://github.com/formkit/auto-animate)
- [Snippet Komponen AutoAnimate](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**Untuk animasi kompleks dengan kode deklaratif**

Framer Motion menyediakan sintaks yang sederhana dan deklaratif, memungkinkanmu menulis lebih sedikit kode untuk membuat animasi yang kompleks, bahkan hingga gerakan interaktif.

- [Beranda Framer Motion](https://framer.com/motion)
- [Dokumentasi Framer Motion](https://www.framer.com/docs/)

## Deployment, Infrastruktur, Database, dan CI

### Vercel

**Untuk hosting aplikasimu**

Vercel mengubah proses deployment web yang rumit menjadi integrasi GitHub yang mudah dan otomatis. Kami telah menskalakan ke ratusan ribu pengguna tanpa masalah. Ditenagai oleh AWS, dengan antarmuka yang jauh lebih baik :)

- [Beranda Vercel](https://vercel.com/)
- [Panduan Deployment Vercel Create T3 App](/en/deployment/vercel)

### PlanetScale

**Untuk database tanpa kekhawatiran**

PlanetScale adalah “platform database serverless” terbaik yang pernah kami gunakan. Skalabilitas luar biasa, pengalaman developer yang menyenangkan, dan harga yang kompetitif. Jika kamu menggunakan SQL (dan semoga juga Prisma), sulit untuk menemukan yang lebih baik dari ini.

- [Beranda PlanetScale](https://planetscale.com/)

### Railway

**Untuk hosting infrastruktur kamu**

“Heroku modern.” Cara termudah untuk menjalankan server sungguhan. Jika Vercel dan PlanetScale belum cukup, Railway kemungkinan besar cukup. Cukup arahkan ke repositori GitHub dan jalankan.

- [Beranda Railway](https://railway.app/)

### Upstash

**Untuk Redis tanpa server (serverless)**

Kami menyukai Prisma dan PlanetScale, tapi beberapa proyek membutuhkan solusi yang lebih cepat. Upstash memungkinkan kamu mendapatkan performa memori tinggi dari Redis dalam proyek serverless tanpa harus mengelola infrastruktur atau skalanya sendiri.

- [Beranda Upstash](https://upstash.com/)

### Pusher

**Untuk WebSocket tanpa server**

Jika WebSocket adalah fokus utama proyekmu, pertimbangkan backend tradisional seperti [Fastify](https://www.fastify.io/) (yang [juga bekerja dengan tRPC!](https://trpc.io/docs/v10/fastify)). Namun, untuk menambahkan WebSocket dengan cepat ke T3 App, Pusher adalah pilihan yang sangat baik.

- [Beranda Pusher](https://pusher.com/)

### Soketi

Soketi adalah alternatif self-hosted yang sederhana dan cepat untuk Pusher. Sepenuhnya kompatibel dengan SDK Pusher yang dapat digunakan untuk terhubung ke server. Soketi serverless juga sedang dalam versi beta.

- [Beranda Soketi](https://soketi.app)
- [Soketi di GitHub](https://github.com/soketi/soketi)

## Analitik

Data pengguna sangat berharga saat kamu membangun aplikasi. Berikut beberapa penyedia analitik yang kami rekomendasikan.

### PostHog

PostHog adalah solusi open-source dan self-hosted yang lengkap untuk menambahkan analitik mendalam pada produkmu. Mereka memiliki SDK untuk hampir setiap pustaka/framework yang ada.

- [Beranda PostHog](https://posthog.com/)

### Plausible

Butuh analitik dengan cepat? Plausible adalah cara tercepat dan paling minimalis untuk mendapatkannya. Bahkan memiliki [plugin sederhana untuk Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Beranda Plausible](https://plausible.io/)

### Umami

Umami adalah alternatif open-source dan self-hosted untuk Google Analytics — sederhana, cepat, dan fokus pada privasi. Kamu bisa men-deploy-nya dengan mudah ke Vercel, Railway, dll., menggunakan PlanetScale sebagai databasenya, atau gunakan versi cloud-nya.

- [Beranda Umami](https://umami.is/)
- [Umami di GitHub](https://github.com/umami-software/umami)
- [Umami Cloud](https://cloud.umami.is/)

## Lainnya

### Next Bundle Analyzer

Kadang sulit menentukan apa saja yang akan termasuk dalam hasil build aplikasimu. Next Bundle Analyzer adalah cara mudah untuk memvisualisasikan dan menganalisis bundel JavaScript yang dihasilkan.

- [@next/bundle-analyzer di npm](https://www.npmjs.com/package/@next/bundle-analyzer)
