---
title: Vercel
description: Triển khai lên Vercel
layout: ../../../layouts/docs.astro
lang: vi
---

Chúng tôi khuyến khích bạn nên triển khai ứng dụng của bạn lên [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). Nó làm cho việc triển khai ứng dụng Next.js trở nên vô cùng dễ dàng.

## Cấu hình dự án

Vercel sẽ cấu hình lệnh build và đọc các thư mục một cách tự động. Tuy nhiên, bạn cũng có thể tự cấu hình thông tin này cùng với các cấu hình Vercel khác bằng cách tạo một file tên là [`vercel.json`](https://vercel.com/docs/project-configuration) và ghi đè các lệnh sau. Tuy nhiên, **Điều này hầu như không bắt buộc cho hầu hết các dự án.**

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Sử dụng trong Vercel Dashboard

1. Sau khi đẩy code của bạn lên repository của bạn ở Github, bạn hãy đăng ký tài khoản [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) với Github và click vào **Add New Project**.

![New project on Vercel](/images/vercel-new-project.webp)

2. Thêm repository chứa source code của bạn.

![Import repository](/images/vercel-import-project.webp)

3. Thêm các biến môi trường.

![Add environment variables](/images/vercel-env-vars.webp)

4. Chọn **Deploy**. Và kể từ bây giờ, mỗi khi nào bạn đẩy một thay đổi lên repository của bạn, Vercel sẽ tự động triển khai lại ứng dụng của bạn!

## Sử dụng CLI của Vercel

Để triển khai sử dụng CLI của Vercel, bạn phải trước tiên [cài đặt CLI của Vercel](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

Chạy lệnh [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) để triển khai dự án của bạn.

```bash
vercel
```

Để thêm các biến môi trường như chuỗi kết nối cơ sở dữ liệu, bạn có thể sử dụng lệnh `--env DATABASE_URL=YOUR_DATABASE_URL_HERE`. Sử dụng `--yes` nếu bạn muốn bỏ qua các câu hỏi triển khai và mặc định đồng ý cho mỗi câu hỏi.

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

Sau khi triển khai lần đầu tiên, lệnh này sẽ triển khai lên một nhánh preview. Nếu bạn muốn đẩy các thay đổi trực tiếp lên trang web live cho các triển khai tương lai, bạn sẽ cần phải bao gồm `--prod`.

```bash
vercel --prod
```
