---
title: Next.js
description: Sử dụng Next.js
layout: ../../../layouts/docs.astro
lang: vi
---

Next.js được xem như là một framework backend cho các ứng dụng React của bạn.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/W4UhNo3HAMw" title="Next.js is a backend framework" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tham khảo [bài giảng của Theo về Next.js](https://www.youtube.com/watch?v=W4UhNo3HAMw) để hiểu rõ hơn về Next.js và cách nó hoạt động.

## Tại sao tôi nên dùng Next.js?

Chúng ta đều yêu React. Nó đã làm cho việc phát triển UI trở nên dễ dàng hơn bao giờ hết. Nhưng đồng thời nó cũng có thể dẫn chúng ta vào ngõ cụt. Next.js cung cấp một cách nhìn nhận về việc phát triển ứng dụng sử dụng React, mang nặng tính tối ưu hóa để tạo ra các ứng dụng sử dụng React. Từ routing đến định nghĩa API đến việc render hình ảnh, chúng tôi tin rằng Next.js sẽ giúp những nhà phát triển web đưa ra các quyết định tốt hơn.

Sử dụng Next.js với [Vercel](https://vercel.com/) làm cho việc phát triển và triển khai ứng dụng web trở nên dễ dàng hơn bao giờ hết. Với gói miễn phí tuyệt vời và giao diện dễ sử dụng, Vercel cung cấp một giải pháp "point and click" để triển khai trang web của bạn (Chúng tôi ❤️ Vercel)

## Lấy dữ liệu tĩnh/Server Props

Một tính năng quan trọng của Next.js là khả năng đọc dữ liệu. Chúng tôi khuyến nghị bạn tham khảo [tài liệu chính thức](https://nextjs.org/docs/basic-features/data-fetching) để hiểu sự khác biệt giữa chúng và tìm ra cách sử dụng hiệu quả mỗi phương pháp . `getServerSideProps` thường gây ra nhiều phiền toái và áp dụng được với ít trường, bởi vì nó là một blocking call và có thể dẫn tới làm chậm trang web của bạn. [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) là một lựa chọn tốt hơn cho `getServerSideProps` khi dữ liệu của nó trả về là dữ liệu động và có thể được lấy từng phần.

Nếu bạn cần sử dụng tính năng này, hãy tham khảo các liên kết sau: [Advanced tRPC - Callers, functions, and gSSP](https://www.youtube.com/watch?v=G2ZzmgShHgQ) và [SSG-Helpers](https://trpc.io/docs/v9/ssg-helpers)

## Tài liệu hữu ích

| Tài liệu                    | Đường dẫn                          |
| --------------------------- | ---------------------------------- |
| Tài liệu Next.js            | https://nextjs.org/docs            |
| GitHub Next.js              | https://github.com/vercel/next.js  |
| Blog Next.js                | https://nextjs.org/blog            |
| Discord Next.js             | https://nextjs.org/discord         |
| Twitter Next.js             | https://twitter.com/nextjs         |
| Kênh Youtube Vercel/Next.js | https://www.youtube.com/c/VercelHQ |
