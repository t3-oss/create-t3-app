---
title: Prisma
description: Cách sử dụng Prisma
layout: ../../../layouts/docs.astro
lang: vi
---

Prisma là một ORM cho TypeScript, cho phép bạn định nghĩa schema và mô hình của cơ sở dữ liệu của bạn trong tệp `schema.prisma`, và sau đó tạo ra một client mà kiểu dữ liệu của bạn sẽ được liên kết chặt chẽ với cơ sở dữ liệu của bạn và có thể được sử dụng để tương tác với cơ sở dữ liệu của bạn từ backend.

## Prisma Client

Client của Prisma được đặt ở `src/server/db.ts`, được khởi tạo như là một biến toàn cục (được khuyến nghị là [best practice](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem) bởi đội ngũ tại Prisma) và được xuất ra để được sử dụng trong các route API của bạn. Chúng tôi đã bao gồm Prisma Client trong [Context](/en/usage/trpc#-serverapitrpcts) và khuyến nghị bạn sử dụng từ Context thay vì nhập nó riêng lẻ trong từng tệp.

## Schema

Bạn sẽ tìm thấy tệp schema của Prisma ở `/prisma/schema.prisma`. Đây là nơi bạn định nghĩa schema và mô hình của cơ sở dữ liệu của bạn, và được sử dụng khi tạo ra client của Prisma.

### Với NextAuth.js

Khi bạn chọn NextAuth.js kết hợp với Prisma, tệp schema được tạo và thiết lập cho bạn với các giá trị được Auth.js khuyến nghị như là `User`, `Session`, `Account`, và `VerificationToken`, tìm hiểu thêm tại [tài liệu Auth.js](https://next-auth.js.org/adapters/prisma).

## Cơ sở dữ liệu mặc định

Cơ sở dữ liệu mặc định là cơ sở dữ liệu SQLite, tuy đây là điều tốt để bạn có thể tập trung cho phát triển và tạo ra một proof-of-concept nhanh chóng, nhưng chúng tôi không khuyến nghị bạn làm điều này cho production cảu bạn. Bạn có thể thay đổi cơ sở dữ liệu để sử dụng bằng cách thay đổi `provider` trong khối `datasource` thành `postgresql` hoặc `mysql`, và sau đó cập nhật chuỗi kết nối trong biến môi trường để Prisma có thể kết nối với cơ sở dữ liệu của bạn.

## Tạo dữ liệu cho cơ sở dữ liệu

[Tạo dữ liệu cho cơ sở dữ liệu](https://www.prisma.io/docs/guides/database/seed-database) là một cách tốt để nhanh chóng điền đầy cơ sở dữ liệu với dữ liệu thử nghiệm để giúp bạn bắt đầu. Để thiết lập seeding, bạn sẽ cần tạo một tệp `seed.ts` trong thư mục `/prisma`, và sau đó thêm một script `seed` vào tệp `package.json` của bạn. Bạn cũng sẽ cần thêm vào một Typescript runner để thực thi script seed, chúng tôi đề xuất [tsx](https://github.com/esbuild-kit/tsx), một Typescript runner rất hiệu quả sử dụng esbuild và không yêu cầu bất kỳ cấu hình ESM, nhưng `ts-node` hoặc các runner khác cũng sẽ hoạt động tốt cho bước này.

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

Sau đó, chỉ cần chạy `pnpm db-seed` (hoặc `npm`/`yarn`) để tạo dữ liệu cho cơ sở dữ liệu của bạn.

## Tài liệu hữu ích

| Tài liệu                                    | Đường dẫn                                                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tài liệu của Prisma                         | https://www.prisma.io/docs/                                                                                                                       |
| GitHub của Prisma                           | https://github.com/prisma/prisma                                                                                                                  |
| Khu thử nghiệm Prisma Migrate               | https://playground.prisma.io/guides                                                                                                               |
| Prisma Adapter cho NextAuth.JS              | https://next-auth.js.org/adapters/prisma                                                                                                          |
| Hướng dẫn kết nối cơ sở dữ liệu PlanetScale | https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale |
