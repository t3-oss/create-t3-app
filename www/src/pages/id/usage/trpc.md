---
title: tRPC
description: Penggunaan tRPC
layout: ../../../layouts/docs.astro
lang: id
---

tRPC memungkinkan kita menulis **API end-to-end yang aman terhadap tipe (typesafe)** tanpa perlu melakukan _code generation_ atau menambah beban di waktu _runtime_.  
tRPC memanfaatkan kemampuan inferensi dari TypeScript untuk menurunkan definisi tipe dari router API-mu dan memungkinkan kamu memanggil prosedur API dari frontend dengan **autocomplete** dan keamanan tipe penuh.  
Dengan tRPC, frontend dan backend terasa jauh lebih terhubung, menciptakan pengalaman pengembangan yang luar biasa.

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>I built tRPC to allow people to move faster by removing the need for a traditional API-layer, while still having confidence that our apps won't break as we rapidly iterate.<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="https://avatars.githubusercontent.com/u/459267?v=4"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Alex - creator of tRPC</span>
      <a
        href="https://twitter.com/alexdotjs"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @alexdotjs
      </a>
    </div>
  </cite>
</blockquote>

## Bagaimana cara menggunakan tRPC?

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Making typesafe APIs easy with tRPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Kontributor tRPC [trashh_dev](https://twitter.com/trashh_dev) memberikan [presentasi keren di Next.js Conf](https://www.youtube.com/watch?v=2LYM8gf184U) tentang tRPC. Kami sangat merekomendasikan menontonnya jika kamu belum sempat.

Dengan tRPC, kamu menulis fungsi TypeScript di backend, lalu memanggilnya langsung dari frontend.  
Contoh prosedur tRPC sederhana:

```ts:server/api/routers/user.ts
const userRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
```

Ini adalah **prosedur tRPC** (setara dengan handler route di backend tradisional) yang pertama-tama memvalidasi input menggunakan **Zod** — memastikan bahwa input berupa string. Jika tidak, maka akan mengirimkan pesan error yang informatif.

Setelah input tervalidasi, kita menambahkan _resolver function_ yang bisa berupa [query](https://trpc.io/docs/client/react/useQuery), [mutation](https://trpc.io/docs/v11/client/react/useMutation), atau [subscription](https://trpc.io/docs/v11/subscriptions).
Dalam contoh di atas, resolver memanggil database menggunakan klien [Prisma](./prisma) dan mengembalikan pengguna yang memiliki `id` sesuai input.

Kamu mendefinisikan prosedur dalam **router**, yang merupakan kumpulan prosedur dengan namespace yang sama.
Misalnya, kamu bisa punya router untuk `users`, `posts`, dan `messages`.
Router-router ini kemudian digabungkan menjadi satu `appRouter` terpusat:

```ts:server/api/root.ts
const appRouter = createTRPCRouter({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

Perhatikan bahwa kita hanya mengekspor **definisi tipe** dari router, artinya kita tidak pernah mengimpor kode server ke sisi klien.

Sekarang mari kita panggil prosedurnya di frontend.
tRPC menyediakan pembungkus untuk `@tanstack/react-query` yang memberi kita kekuatan penuh dari _hooks_-nya, tapi dengan tambahan _type safety_.
Contohnya:

```tsx:pages/users/[id].tsx
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const UserPage = () => {
  const { query } = useRouter();
  const userQuery = api.users.getById.useQuery(query.id);

  return (
    <div>
      <h1>{userQuery.data?.name}</h1>
    </div>
  );
};
```

Kamu akan langsung merasakan betapa baiknya **autocomplete dan keamanan tipe** di sini.
Begitu kamu mengetik `api.`, daftar router muncul di saran otomatis, dan begitu memilih satu, daftar prosedurnya juga muncul.
Jika input tidak cocok dengan validator di backend, TypeScript akan memberikan error.

## Menginferensi Error

Secara default, `create-t3-app` menyiapkan [error formatter](https://trpc.io/docs/v11/server/error-formatting) agar kamu bisa **menginferensi error dari Zod** jika validasi gagal di backend.

Contoh penggunaan:

```tsx
function MyComponent() {
  const { mutate, error } = api.post.create.useMutation();

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      mutate({ title: formData.get('title') });
    }}>
      <input name="title" />
      {error?.data?.zodError?.fieldErrors.title && (
        <span className="mb-8 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </span>
      )}
      ...
    </form>
  );
}
```

## File-File yang Dihasilkan

tRPC membutuhkan cukup banyak _boilerplate_ — tapi semua itu sudah disiapkan oleh `create-t3-app`.
Berikut penjelasan file-file pentingnya:

### 📄 `pages/api/trpc/[trpc].ts`

Titik masuk utama API yang mengekspor router tRPC.
Biasanya kamu tidak akan sering mengubah file ini, tapi jika ingin menambahkan middleware seperti CORS, kamu bisa melakukannya di sini.

### 📄 `server/api/trpc.ts`

File ini memiliki dua bagian utama: pembuatan konteks dan inisialisasi tRPC.

1. **Konteks (Context):**
   Data yang akan diakses oleh semua prosedur tRPC — misalnya koneksi database atau informasi autentikasi.

   - `createInnerTRPCContext`: Untuk konteks yang tidak bergantung pada request (contohnya database).
   - `createTRPCContext`: Untuk konteks yang bergantung pada request (contohnya sesi pengguna).

2. **Inisialisasi tRPC:**
   Di sini kita mendefinisikan **prosedur** dan **middleware** yang dapat digunakan ulang.
   Kita juga menggunakan `superjson` sebagai _data transformer_ agar tipe data tetap utuh antara backend dan frontend.

### 📄 `server/api/routers/*.ts`

Tempat mendefinisikan prosedur dan route API.
Biasanya setiap domain (users, posts, dll.) punya router terpisah.

### 📄 `server/api/root.ts`

Menggabungkan semua sub-router dari `routers/**` menjadi satu app router utama.

### 📄 `utils/api.ts`

Titik masuk frontend untuk tRPC — di sinilah kita membuat klien tRPC dan mengatur hook `react-query`.
Kita juga menambahkan `superjson` agar transformasi data tetap konsisten antara backend dan frontend.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/x4mu-jOiA0Q" title="How tRPC really works" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Kontributor Create T3 App, [Christopher Ehrlich](https://twitter.com/ccccjjjjeeee), membuat [video tentang alur data di tRPC](https://www.youtube.com/watch?v=x4mu-jOiA0Q).
Video ini direkomendasikan jika kamu sudah menggunakan tRPC tapi masih agak bingung bagaimana cara kerjanya di balik layar.

## Sumber Daya Berguna

| Resource               | Link                                            |
| ---------------------- | ----------------------------------------------- |
| tRPC Docs              | https://www.trpc.io                             |
| Bunch of tRPC Examples | https://github.com/trpc/trpc/tree/next/examples |
| React Query Docs       | https://tanstack.com/query/latest/docs          |
