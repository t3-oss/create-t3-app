---
title: Tại sao lại là CT3A?
description: Tại sao bạn nên chọn Create T3 App cho dự án tiếp theo của mình
layout: ../../layouts/docs.astro
lang: vi
---

Chúng tôi tạo ra Create T3 App vì [Theo](https://twitter.com/t3dotgg) từ chối việc có một template cho các công nghệ yêu thích của anh ấy. Được truyền cảm hứng từ create-next-app, [CLI của Astro](https://astro.build), và một tình yêu to bự dành cho tính toàn vẹn của kiểu dữ liệu (typesafety), đội ngũ Create T3 App đã làm việc chăm chỉ để tạo nên một nền móng vững chắc nhất có thể dành cho các dự án T3 Stack mới.

Nếu bạn thích việc sử dụng Next.js một cách typesafe, đây chính là điểm bắt đầu của bạn. Nếu bạn tò mò về bất kỳ lựa chọn công nghệ cụ thể nào mà chúng tôi đã thực hiện, hãy bình tĩnh, lấy một ly cà phê và cùng đọc tiếp nhé :)

## Tại sao lại là TypeScript?

JavaScript đã khó rồi. Tại sao lại thêm nhiều các quy tắc rắc rối hơn hơn?

Chúng tôi tin chắc rằng trải nghiệm mà TypeScript mang lại sẽ giúp bạn trở thành một lập trình viên tốt hơn. Nó cung cấp phản hồi trực tiếp khi bạn viết mã bằng cách xác định các kiểu dữ liệu bạn muốn, và nó cung cấp tính năng tự động hoàn thành (autocompletion) hữu ích trong trình soạn thảo (IDE) của bạn hoặc báo lỗi cho bạn bằng các đường lượn sóng màu đỏ nếu bạn đang cố gắng truy cập một thuộc tính không tồn tại hoặc cố gắng truyền một giá trị có kiểu sai, điều mà có thể khiến bạn phải đau đầu gỡ lỗi sau này nếu như không có chúng. Cho dù bạn là người mới làm quen với phát triển web hay một chuyên gia dày dạn kinh nghiệm, "sự nghiêm ngặt" của TypeScript sẽ mang lại trải nghiệm lập trình tuyệt vời hơn, nhất quán hơn so với JS thuần túy.

Typesafety giúp bạn nhanh hơn. Nếu bạn chưa bị thuyết phục, có thể bạn [đang sử dụng TypeScript sai cách...](https://www.youtube.com/watch?v=RmGHnYUqQ4k)

## Tại sao lại là Next.js?

Chúng tôi yêu React. Nó đã làm cho việc phát triển giao diện người dùng trở nên dễ tiếp cận theo những cách mà chúng tôi chưa bao giờ tưởng tượng được trước đây. Nhưng nó cũng có thể dẫn các bạn đi vào những con đường vô tận mà không có lối ra.

Next.js cung cấp một cách tiếp cận nhẹ nhàng, nhưng cực kì được tối ưu hóa cao để tạo các ứng dụng bằng React. Từ hệ thống định tuyến (Routing) đến định nghĩa API (API Routes) đến kết xuất hình ảnh (Image Rendering), chúng tôi tin tưởng Next.js sẽ là "bạn đồng hành" tuyệt vời cho các nhà phát triển đưa ra những quyết định tốt.

## Tại sao lại là tRPC/Prisma/Tailwind/etc?

Mặc dù mục tiêu chúng tôi là giữ mọi thứ đơn giản nhất có thể, chúng tôi thấy rằng những công nghệ này thường được sử dụng trong mọi dự án mà chúng tôi xây dựng. `create-t3-app` làm rất tốt việc cho phép bạn chọn và sử dụng những công nghệ bạn cần.

### tRPC

tRPC là người viết tiếp sứ mệnh của GraphQL về việc kết nối liền mạch với client dựa trên một server typesafe mà không cần phải có các boilerplate code. Nó tận dụng kiểu dữ liệu của TypeScript một cách thông minh nhằm nâng cao trải nghiệm phát triển ứng dụng.

### Prisma

Prisma và SQL cũng giống như TypeScript và JS. Nó đã tạo ra một trải nghiệm phát triển chưa từng tồn tại trước đây. Bằng cách tạo ra các kiểu từ một file schema do người dùng định nghĩa và có tính tương thích cao với [nhiều cơ sở dữ liệu](https://www.prisma.io/docs/concepts/database-connectors), Prisma đảm bảo tính toàn vẹn dữ liệu (typesafety) từ đầu đến cuối từ cơ sở dữ liệu đến ứng dụng của bạn.

Prisma cung cấp cả một [bộ công cụ](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma#-you-want-a-tool-that-holistically-covers-your-database-workflows) giúp việc tương tác hàng ngày với cơ sở dữ liệu của bạn trở nên dễ dàng hơn. Đáng chú ý, Prisma Client chịu trách nhiệm truy vấn và làm cho SQL trở nên dễ dàng đến mức bạn sẽ hầu như không nhận thấy mình đang làm việc với cơ sở dữ liệu, và Prisma Studio là một GUI tiện lợi cho cơ sở dữ liệu của bạn bằng cách cho phép bạn đọc và thao tác dữ liệu trực tiếp mà không cần viết mã.

### Tailwind CSS

Tailwind giống như "CSS ở chế độ chill".

Bằng cách cung cấp các khối xây dựng dưới dạng các gam màu mặc định hiện đại, khoảng cách và các yếu tố cơ bản khác, Tailwind giúp dễ dàng tạo ra một ứng dụng đẹp mắt. Và không giống như các thư viện component khác, nó giúp bạn đưa ứng dụng của mình lên một tầm cao mới và tạo ra thứ gì đó đẹp đẽ và độc đáo.

Ngoài ra, với cách tiếp cận giống như inline, Tailwind khuyến khích bạn tạo kiểu mà không cần lo lắng về việc đặt tên lớp, tổ chức tệp hoặc bất kỳ vấn đề nào khác không liên quan trực tiếp đến vấn đề bạn đang cố gắng giải quyết.

### NextAuth.js

Khi bạn muốn có một hệ thống xác thực trong ứng dụng NextJS của mình, NextAuth.js là một giải pháp tuyệt vời để giải quyết sự phức tạp của bảo mật mà không gặp rắc rối khi phải tự xây dựng nó. Nó đi kèm với một dãy các nhà cung cấp xác thực thứ 3 để bạn có thể thêm xác thực OAuth một cách nhanh chóng và đồng thời cung cấp các adapter cho nhiều cơ sở dữ liệu và ORM.
