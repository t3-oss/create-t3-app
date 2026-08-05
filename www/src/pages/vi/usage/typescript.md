---
title: TypeScript
description: Cách sử dụng TypeScript
layout: ../../../layouts/docs.astro
lang: vi
---

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Build safety nets, not guard rails<span aria-hidden="true">&quot;</span> - <span aria-hidden="true">&quot;</span>Dựng lưới an toàn, chớ xây lan can<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @t3dotgg"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="/images/theo_300x300.webp"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Theo - người tạo ra T3 Stack</span>
      <a
        href="https://twitter.com/t3dotgg"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @t3dotgg
      </a>
    </div>
  </cite>
</blockquote>

Cho dù bạn có là lập trình viên tay mơ hay là lập trình viên có kinh nghiệm, chúng tôi nghĩ rằng TypeScript là một "người bạn" không thể thiếu. Mặc dù nó có thể khiến bạn gặp một chút khó khăn khi bắt đầu, nhưng giống như nhiều công cụ hữu ích khác, Typescript sẽ là công cụ khiến nhiều lập trình viên không bao giờ muốn "đường ai nấy đi" khi đã biết tận dụng sức mạnh của nó.

Typescript phản hồi gần như tức thì khi bạn viết code bằng cách định nghĩa kiểu dữ liệu dự kiến, vì thế điểm mạnh của nó là tự cập nhật autocompletion theo những thay đổi mới nhất trong trình soạn thảo mã của bạn, hoặc có thể cảnh báo bạn với dòng gạch màu đỏ lòm nếu bạn đang cố gắng truy cập vào một thuộc tính không tồn tại hoặc đang cố gắng truyền một giá trị có kiểu sai, thứ khiến bạn sẽ phải tốn hàng giờ đồng hồ để "debug" sau đó.

Chính vì thế, Typescript là công cụ giúp cho lập trình viên có nhiều năng suất hơn bao giờ hết; cung cấp tài liệu cho code bạn đang viết hoặc sử dụng trực tiếp trong trình soạn thảo của bạn, và có phản hồi ngay lập tức khi bạn làm sai một cái gì đó, giống như bún đậu thì phải chấm với mắm tôm chứ không phải tương ớt vậy.

## Suy luận kiểu dữ liệu (Type Inference)

Mặc dù nhiều lập trình viên TypeScript mới thường lo lắng về việc _định nghĩa kiểu dữ liệu_ TypeScript một cách chuẩn chỉ, nhưng lợi ích thực sự của Typescript nằm ở chỗ nó không yêu cầu bạn phải thay đổi code của mình để thay đổi kiểu dữ liệu, hay còn gọi là suy luận kiểu dữ liệu (Type Inference). Suy luận kiểu dữ liệu có nghĩa là nếu bạn đã định nghĩa một kiểu dữ liệu, kiểu dữ liệu đó sẽ đi theo trong suốt luồng của ứng dụng mà không cần phải khai báo lại ở những nơi khác. Điều này có nghĩa là, ví dụ, một khi bạn đã định nghĩa kiểu của các tham số mà một hàm nhận vào, phần còn lại của hàm thường sẽ được đảm bảo an toàn về kiểu dữ liệu mà không cần thêm bất kỳ code TypeScript cụ thể nào. Các nhà phát triển thư viện đã phải bỏ ra rất nhiều công sức để duy trì các kiểu dữ liệu cho thư viện của họ, điều này có nghĩa là chúng ta với tư cách là nhà phát triển ứng dụng có thể hưởng lợi từ cả suy luận kiểu dữ liệu và "tài liệu" được tích hợp trong trình soạn thảo code mà các kiểu này cung cấp.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/RmGHnYUqQ4k" title="You might be using Typescript wrong" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Xem thêm video của Theo về cách [bạn có thể sử dụng TypeScript sai](https://www.youtube.com/watch?v=RmGHnYUqQ4k).

## Các ứng dụng mạnh mẽ của suy luận kiểu dữ liệu

### Zod

[Zod](https://github.com/colinhacks/zod) là một thư viện kiểm tra dữ liệu được xây dựng trên TypeScript. Viết một schema đại diện cho một nguồn thật sự duy nhất cho dữ liệu của bạn, và Zod sẽ đảm bảo rằng dữ liệu của bạn hợp lệ trong suốt ứng dụng của bạn, thậm chí cả khi đi qua ranh giới mạng và API bên ngoài.

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/v4/) cung cấp cho bạn các truy vấn và thao tác sửa đổi theo kiểu khai báo, được quản lý tự động và luôn được cập nhật, từ đó trực tiếp cải thiện trải nghiệm của cả lập trình viên và người dùng.

## Tài liệu hữu ích

| Tài liệu                                                                            | Đường dẫn                                                         |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Cẩm nang TypeScript                                                                 | https://www.typescriptlang.org/docs/handbook/                     |
| TypeScript dành cho tân thủ                                                         | https://github.com/total-typescript/beginners-typescript-tutorial |
| Luyện tập typing chuẩn Typescript                                                   | https://github.com/type-challenges/type-challenges                |
| Kênh Youtube của người được mệnh danh là Rodney Mullen của TypeScript (Matt Pocock) | https://www.youtube.com/c/MattPocockUk/videos                     |
