---
title: Tailwind CSS
description: Penggunaan Tailwind CSS
layout: ../../../layouts/docs.astro
lang: id
---

## Apa itu Tailwind CSS?

Tailwind CSS adalah framework CSS kecil dengan pendekatan [utility first](https://tailwindcss.com/docs/utility-first) untuk membangun desain kustom tanpa perlu berpindah konteks seperti pada CSS biasa. Framework ini murni CSS — tidak menyediakan komponen atau logika bawaan, dan memberikan [manfaat yang sangat berbeda](https://www.youtube.com/watch?v=CQuTF-bkOgc) dibandingkan dengan library komponen seperti Material UI.

Tailwind membuat penulisan CSS menjadi sangat mudah dan cepat, seperti contoh berikut:

CSS Lama:

1. Tulis CSS, biasanya di file terpisah

```css
.my-class {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  padding: 1rem;
}
```

2. Impor CSS ke dalam komponenmu

```jsx
import "./my-class.css";
```

3. Tambahkan class ke elemen HTML

```html
<div class="my-class">...</div>
```

Versi yang sama menggunakan Tailwind:

1. Cukup tulis class langsung di HTML

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

Jika digunakan bersama dengan komponen React, Tailwind menjadi sangat kuat untuk membangun UI dengan cepat.

Tailwind CSS memiliki sistem desain bawaan yang indah, termasuk palet warna yang dipilih dengan hati-hati, pola ukuran untuk lebar/tinggi dan padding/margin agar desain seragam, serta breakpoint responsif untuk layout adaptif. Sistem ini dapat disesuaikan dan diperluas agar sesuai dengan kebutuhan proyekmu.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla, lebih dikenal sebagai [mewtru](https://twitter.com/trunarla), memberikan presentasi luar biasa tentang [membangun sistem desain menggunakan Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Penggunaan

Pastikan kamu sudah menginstal plugin editor untuk Tailwind agar pengalaman menulis kode lebih baik.

### Ekstensi dan Plugin

- [Ekstensi VSCode](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Integrasi JetBrains](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Formatting

Kelas Tailwind CSS bisa menjadi berantakan jika banyak, jadi formatter sangat disarankan. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) akan mengurutkan kelas sesuai [urutan yang direkomendasikan](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted), agar sesuai dengan output CSS bundle. Saat kamu memilih Tailwind di CLI, plugin ini akan otomatis diinstal dan dikonfigurasi.

### Penerapan Kelas Secara Kondisional

Menambahkan kelas dengan kondisi menggunakan ternary bisa membuat kode sulit dibaca. Paket-paket berikut membantu menata kelas dengan lebih rapi saat menggunakan logika kondisi:

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Sumber Daya Berguna

| Sumber                       | Tautan                                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Dokumentasi Tailwind         | [https://tailwindcss.com/docs/editor-setup/](https://tailwindcss.com/docs/editor-setup/)                             |
| Cheat Sheet Tailwind         | [https://nerdcave.com/tailwind-cheat-sheet/](https://nerdcave.com/tailwind-cheat-sheet/)                             |
| awesome-tailwindcss          | [https://github.com/aniftyco/awesome-tailwindcss/](https://github.com/aniftyco/awesome-tailwindcss/)                 |
| Komunitas Tailwind           | [https://github.com/tailwindlabs/tailwindcss/discussions/](https://github.com/tailwindlabs/tailwindcss/discussions/) |
| Server Discord Tailwind      | [https://tailwindcss.com/discord/](https://tailwindcss.com/discord/)                                                 |
| Channel Youtube TailwindLabs | [https://www.youtube.com/tailwindlabs/](https://www.youtube.com/tailwindlabs/)                                       |
| Tailwind Playground          | [https://play.tailwindcss.com/](https://play.tailwindcss.com/)                                                       |
