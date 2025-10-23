---
title: Vercel
description: Deploy ke Vercel
layout: ../../../layouts/docs.astro
lang: id
---

Kami merekomendasikan untuk melakukan deploy aplikasi kamu ke [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). Platform ini membuat proses deploy aplikasi Next.js menjadi sangat mudah.

## Konfigurasi Proyek

Vercel biasanya akan mengonfigurasi perintah build dan direktori publik secara otomatis. Namun, kamu juga dapat menentukan konfigurasi ini secara manual dengan membuat file [`vercel.json`](https://vercel.com/docs/project-configuration) dan menambahkan perintah berikut. **Langkah ini tidak wajib untuk sebagian besar proyek.**

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Menggunakan Dashboard Vercel

1. Setelah kamu push kode ke repositori GitHub, daftar ke [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) menggunakan akun GitHub, lalu klik **Add New Project**.

![New project on Vercel](/images/vercel-new-project.webp)

2. Impor repositori GitHub yang berisi proyekmu.

![Import repository](/images/vercel-import-project.webp)

3. Tambahkan environment variables (variabel lingkungan).

![Add environment variables](/images/vercel-env-vars.webp)

4. Klik **Deploy**. Sekarang setiap kali kamu push perubahan ke repositori, Vercel akan secara otomatis melakukan redeploy pada aplikasimu!

## Menggunakan Vercel CLI

Untuk melakukan deploy melalui command line, kamu harus terlebih dahulu [menginstal Vercel CLI secara global](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

Jalankan perintah [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) untuk melakukan deploy proyekmu.

```bash
vercel
```

Sertakan `--env DATABASE_URL=YOUR_DATABASE_URL_HERE` untuk menambahkan environment variable seperti string koneksi database. Gunakan `--yes` jika kamu ingin melewati pertanyaan interaktif selama proses deploy dan menerima jawaban default untuk setiap pertanyaan.

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

Setelah deploy pertama, perintah ini akan melakukan deploy ke branch preview. Jika kamu ingin langsung melakukan deploy ke situs live (produksi), tambahkan flag `--prod` untuk deploy versi produksi.

```bash
vercel --prod
```
