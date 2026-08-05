---
title: Bước đầu tiên
description: Bắt đầu với T3 App của bạn
layout: ../../../layouts/docs.astro
lang: vi
---

Vậy là bạn đã khởi tạo thành công chiếc T3 App cho mình rồi đấy. Bây giờ là lúc để bạn có thể bắt đầu làm việc với nó.

## Cơ sở dữ liệu

### MySQL, PostgreSQL

Nếu bạn chọn MySQL hoặc PostgreSQL làm cơ sở dữ liệu của mình, T3 App sẽ có một file `start-database.sh` viết bằng bash script mà có thể tạo một container dựa trên cơ sở dữ liệu đã chọn nhằm cho phép bạn phát triển cục bộ. Nếu bạn đã có một cơ sở dữ liệu, hãy cứ thoát khỏi file này và đặt chuỗi kết nối cơ sở dữ liệu của bạn vào `.env`. Trên macOS, bạn cũng có thể sử dụng [DBngin](https://dbngin.com/) nếu bạn không muốn sử dụng docker.

### Prisma

Nếu app của bạn sử dụng Prisma, hãy chắc chắn rằng bạn đã chạy lệnh `npx prisma db push` từ thư mục gốc của app. Lệnh này sẽ đồng bộ hóa schema của Prisma với cơ sở dữ liệu của bạn và sẽ tạo ra các kiểu TypeScript cho Prisma Client dựa trên schema của bạn. Lưu ý rằng bạn cần [khởi động lại server TypeScript](https://tinytip.co/tips/vscode-restart-ts/) sau khi làm điều này để nó có thể phát hiện ra các kiểu đã được tạo.

### Drizzle

Nếu app của bạn sử dụng Drizzle, hãy xem file `.env` để biết hướng dẫn cách tạo biến môi trường `DATABASE_URL`. Khi file env của bạn đã sẵn sàng, chạy lệnh `pnpm db:push` (hoặc lệnh tương đương cho các trình quản lý gói khác) để đẩy schema của bạn.

## Xác thực

Nếu app của bạn sử dụng NextAuth.js, chúng tôi cung cấp cho bạn một `DiscordProvider`. Đây là một trong những provider đơn giản nhất mà NextAuth.js cung cấp, tuy nhiên nó vẫn cần một chút cấu hình ban đầu từ phía bạn.

Ngoài ra, nếu bạn muốn sử dụng một provider khác, bạn cũng có thể sử dụng một trong [nhiều provider](https://next-auth.js.org/providers/) mà NextAuth.js cung cấp.

1. Bạn cần một tài khoản Discord, vì vậy hãy tạo cho mình một cái một nếu bạn chưa có.
2. Đi đến https://discord.com/developers/applications và ấn "New Application" ở góc trên bên phải. Đặt tên cho ứng dụng của bạn và đồng ý với Điều khoản dịch vụ.
3. Khi ứng dụng của bạn đã được tạo, đi đến "Settings → OAuth2 → General".
4. Copy "Client ID" và thêm nó vào file `.env` dưới dạng `AUTH_DISCORD_ID`.
5. Click "Reset Secret", copy secret mới, và thêm nó vào file `.env` dưới dạng `AUTH_DISCORD_SECRET`.
6. Click "Add Redirect" và nhập `http://localhost:3000/api/auth/callback/discord`.
   - Đối với triển khai sản phẩm, hãy làm theo các bước trước để tạo một ứng dụng Discord khác, nhưng lần này thay thế `http://localhost:3000` với URL mà bạn đang triển khai.
7. Lưu thay đổi.

Và giờ đây bạn đã có thể đăng nhập bằng Discord.

## Cấu hình trình soạn thảo của bạn

Các extension sau đây được khuyến nghị để mang lại một trải nghiệm phát triển tối ưu. Các liên kết dưới đây cung cấp hỗ trợ plugin cho trình chỉnh sửa cụ thể.

- [Prisma Extension](https://www.prisma.io/docs/guides/development-environment/editor-setup)
- [Tailwind CSS IntelliSense Extension](https://tailwindcss.com/docs/editor-setup)
- [Prettier Extension](https://prettier.io/docs/en/editors.html)

## Bước tiếp theo

- Nếu app của bạn sử dụng tRPC, hãy xem `src/pages/index.tsx` và `src/server/api/routers/post.ts` để hiểu cách tRPC queries hoạt động.
- Hãy xem xét các tài liệu của Create T3 App, cũng như các tài liệu của các thư viện mà app của bạn sử dụng.
- Hãy tham gia [Discord](https://t3.gg/discord) của chúng tôi và cho chúng tôi một ngôi sao tại [GitHub](https://github.com/t3-oss/create-t3-app)! :)
