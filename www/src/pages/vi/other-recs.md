---
title: Các khuyến nghị khác
description: Thư viện và dịch vụ mà chúng tôi khuyến nghị cho nhiều dự án
layout: ../../layouts/docs.astro
lang: vi
---

Chúng tôi nhận thấy rằng các thư viện đi kèm trong `create-t3-app` sẽ không giúp bạn giải quyết được mọi vấn đề. Mặc dù chúng tôi khuyến khích bạn bắt đầu dự án của mình với những thư viện chúng tôi cung cấp, sẽ đến một thời điểm nào đó mà bạn cần sử dụng những thư viện khác. Chỉ bạn mới biết dự án của mình cần gì, tuy nhiên, dưới đây là một số thứ mà chúng tôi thường xuyên đề xuất.

Đây là những đề xuất của các cộng tác viên cá nhân của Create T3 App và không nên được xem là những đề xuất "chính thức" bởi nhóm Create T3 App hoặc T3-OSS. _**Hãy nghiên cứu kỹ lưỡng trước khi sử dụng, đặc biệt là trước khi cam kết sử dụng các dịch vụ trả phí**_.

## Quản lý trạng thái (State Management)

_**Lưu ý của Editor**_: Các thư viện quản lý trạng thái (State Management Libraries) có thể rất tuyệt vời, nhưng chúng thường không cần thiết. Các hook React Query của tRPC có thể đảm nhiệm tốt việc quản lý trạng thái phía máy chủ (server state) của bạn. Đối với trạng thái phía máy khách (client state), hãy bắt đầu với `useState` của React và chỉ nên sử dụng một trong các tùy chọn này khi bạn cần nhiều hơn thế.

### Zustand

**Bạn sẽ không bao giờ phải dùng Redux nữa**

Đây được coi là một "Redux hiện đại, đơn giản" mà bạn ước mình biết đến sớm hơn. [Poimandres](https://github.com/pmndrs) rất tín. Bạn có thể xây dựng mọi thứ từ ứng dụng gọi video đến trò chơi đến máy chủ với thư viện nhỏ bé này.

- [Trang chủ Zustand](https://zustand-demo.pmnd.rs/)
- [GitHub Zustand](https://github.com/pmndrs/zustand)

### Jotai

**Bạn sẽ không bao giờ phải dùng Context nữa**

Khi đề cập đến cách tiếp cận nguyên tử (atomic), Jotai gần như không thể bị đánh bại. Thư viện này cũng được tạo bởi [Poimandres](https://github.com/pmndrs), Jotai cho phép bạn định nghĩa các singleton giống như một useState, nhưng sử dụng một cách toàn cục. Đây sẽ là một lựa chọn tuyệt vời cho các hành vi có trạng thái (stateful behaviors) mà chưa cần đến trạng thái máy (state machine).

- [Trang chủ Jotai](https://jotai.org/)
- [GitHub Jotai](https://github.com/pmndrs/jotai)

## Thư viện Component

Hầu hết các ứng dụng đều cần một số component giống nhau - nút bật tắt (toggle buttons), menu thả xuống (dropdown menus), modal, v.v. Các thư viện này cung cấp các component tuyệt vời, dễ tiếp cận mà bạn có thể sử dụng và tùy chỉnh theo ý thích.

### Thư viện Component không định kiểu (Unstyled)

Còn được gọi là thư viện headless, chúng cung cấp một danh sách component tuyệt vời, không có style sẵn và dễ tiếp cận, giúp bạn có thể tùy chỉnh theo ý thích cá nhân. Dưới đây là một vài đề xuất của chúng tôi.

- [Radix UI](https://www.radix-ui.com/) cung cấp cho bạn một bộ primitives mạnh mẽ, tiện lợi và dễ tiếp cận mà bạn có thể định nghĩa bằng CSS thuần hoặc Tailwind CSS.

- [Headless UI](https://headlessui.com/) được tạo bởi Tailwind, nó cung cấp các component không có style sẵn, dễ tiếp cận và dễ tích hợp với Tailwind CSS.

- [React Aria](https://react-spectrum.adobe.com/react-aria/) cung cấp các UI primitives dễ tiếp cận cho hệ thống thiết kế (design system) của bạn. Date Picker của họ là một "wow" đáng kinh ngạc.

### Thư viện Component có định kiểu (Styled)

**Khi ứng dụng của bạn chỉ ở mức ổn**

Đôi khi bạn đang xây dựng một dự án mà bạn chỉ muốn giao diện người dùng (UI) trông tươm tất ngay từ đầu. Đối với các Bảng điều khiển quản trị (Admin Dashboards) và các dự án tương tự khác, bất kỳ thư viện component nào trong số này cũng sẽ giúp bạn hoàn thành công việc trong thời gian ngắn nhất.

- [Chakra UI](https://chakra-ui.com)
- [Mantine](https://mantine.dev)
- [@shadcn/ui](https://ui.shadcn.com/)

### Class Variance Authority

**Để xây dựng thư viện UI**

Để xây dựng một Thư viện UI, bạn cần cách khai báo các biến thể màu sắc, kích thước, v.v. khác nhau. Khi dự án của bạn đạt đến quy mô mà bạn muốn có một bộ component UI được chuẩn hóa với nhiều biến thể sử dụng Tailwind CSS, CVA sẽ là một "người đồng hành" không thể thiếu của bạn.

- [GitHub Class Variance Authority](https://github.com/joe-bell/cva)

## Hoạt ảnh (Animations)

Khi bạn cần hoạt ảnh trong ứng dụng của mình, đây là những đề xuất của chúng tôi.

### AutoAnimate

**Tạo hoạt ảnh chỉ với một dòng code**

Hầu hết các thư viện hoạt ảnh cố gắng đáp ứng mọi trường hợp sử dụng có thể và kết quả là hầu hết chúng đều rất cồng kềnh. AutoAnimate là một công cụ không cần cấu hình (zero-configuration) mà đem lại cho bạn sự cải thiện đáng kể về UX mà không cần phải nghĩ nhiều về setup.

- [Trang chủ AutoAnimate](https://auto-animate.formkit.com/)
- [GitHub AutoAnimate](https://github.com/formkit/auto-animate)
- [Đoạn mã Component AutoAnimate](https://gist.github.com/hwkr/3fdea5d7f609b98c162e5325637cf3cb)

### Framer Motion

**Tạo hoạt ảnh phức tạp với code khai báo đơn giản**

Framer Motion cung cấp các cú pháp khai báo đơn giản và cho phép bạn viết ít code hơn để tạo ra mọi thứ từ hoạt ảnh phức tạp đến cả cử chỉ (gestures).

- [Trang chủ Framer Motion](https://framer.com/motion)
- [Tài liệu Framer Motion](https://www.framer.com/docs/)

## Triển khai, Hạ tầng, Cơ sở dữ liệu và CI

### Vercel

**Host ứng dụng của bạn một cách đơn giản nhất**

Vercel đã "vực dậy" việc triển khai web từ địa ngục đến việc chỉ cần thêm vào Github và "deploy". Chúng tôi đã mở rộng quy mô lên hàng trăm nghìn người dùng mà không gặp vấn đề gì. Được xây dựng trên nền của AWS, tuy nhiên giao diện của Vercel lại tốt hơn chục nghìn lần :)

- [Trang chủ Vercel](https://vercel.com/)
- [Hướng dẫn triển khai Create T3 App trên Vercel](/vi/deployment/vercel)

### PlanetScale

**Chiếc cơ sở dữ liệu mà bạn không cần lo lắng**

PlanetScale là "nền tảng cơ sở dữ liệu serverless" tốt nhất mà chúng tôi từng sử dụng. Nó có khả năng mở rộng đáng kinh ngạc, trải nghiệm lập trình tuyệt vời và giá cả phải chăng. Nếu bạn đang sử dụng SQL (và hy vọng là Prisma), thì bạn khó có thể không sử dụng nền tảng này.

- [Trang chủ PlanetScale](https://planetscale.com/)

### Railway

**Host hạ tầng của bạn**

Được coi là một "Heroku hiện đại". Đây là cách dễ nhất để bạn khởi chạy và quản lý hạ tầng đám mây của bạn. Nếu Vercel và PlanetScale không đủ đối với bạn, Railway sẽ lấp đầy khoảng trống đó. Chỉ cần đưa nó vào một repo GitHub và bắt đầu hành trình của bạn.

- [Trang chủ Railway](https://railway.app/)

### Upstash

**Một Redis serverless**

Chúng tôi yêu thích Prisma và PlanetScale, nhưng một số dự án cần đòi hỏi giải pháp hiệu năng cao hơn. Upstash đẹm lại các tính năng của Redis trong dự án serverless của bạn mà không cần phải tự quản lý cơ sở hạ tầng và việc mở rộng quy mô.

- [Trang chủ Upstash](https://upstash.com/)

### Pusher

**WebSockets serverless**

Nếu WebSockets là trọng tâm chính của dự án của bạn, bạn có thể muốn xem xét sử dụng một backend server truyền thống như [Fastify](https://www.fastify.io/) (cũng [hoạt động với tRPC!](https://trpc.io/docs/v10/fastify)). Nhưng nếu bạn không đủ thời gian để thêm WebSockets vào một ứng dụng T3, đừng lo, Pusher sẽ là "món chính" tuyệt vời.

- [Trang chủ Pusher](https://pusher.com/)

### Soketi

Soketi là một giải pháp tự host (self-hostable), đơn giản và nhanh chóng cho Pusher. Nó hoàn toàn tương thích với Pusher SDK mà bạn có thể sử dụng để kết nối với máy chủ. Hãy nhớ rằng, Soketi serverless hiện tại đang trong giai đoạn beta.

- [Trang chủ Soketi](https://soketi.app)
- [GitHub Soketi](https://github.com/soketi/soketi)

## Phân tích (Analytics)

Dữ liệu người dùng rất có giá trị khi bạn xây dựng một ứng dụng. Dưới đây là một số nhà cung cấp dịch vụ phân tích mà chúng tôi đề xuất.

### PostHog

PostHog là một giải pháp mã nguồn mở, đầy đủ tính năng và có thể tự host để mang lại phân tích chuyên sâu cho sản phẩm của bạn. Họ có SDK cho mọi thư viện/framework có thể tưởng tượng được.

- [Trang chủ PostHog](https://posthog.com/)

### Plausible

Bạn đang cần một nền tảng phân tích ưu việt? Plausible là một trong những cách nhanh nhất để có được chúng. Siêu tối giản. Nó thậm chí còn có hẳn cả [plugin đơn giản cho Next.js](https://plausible.io/docs/proxy/guides/nextjs).

- [Trang chủ Plausible](https://plausible.io/)

### Umami

Umami là một giải pháp thay thế mã nguồn mở, có thể tự host, đơn giản, nhanh chóng và tập trung vào quyền riêng tư cho Google Analytics. Bạn có thể triển khai nó rất dễ dàng lên Vercel, Railway, v.v. với PlanetScale làm cơ sở dữ liệu hoặc bạn cũng có thể sử dụng phiên bản đám mây của nó.

- [Trang chủ Umami](https://umami.is/)
- [GitHub Umami](https://github.com/umami-software/umami)
- [Umami Cloud](https://cloud.umami.is/)

## Khác

### Next Bundle Analyzer

Đôi khi có thể khó xác định những gì sẽ được bao gồm trong khi build (build output) ứng dụng của bạn. Next Bundle Analyzer là một cách dễ dàng để trực quan hóa và phân tích các gói JavaScript (JavaScript bundles) được tạo ra trong quá trình build sản phẩm của bạn.

- [@next/bundle-analyzer trên npm](https://www.npmjs.com/package/@next/bundle-analyzer)
