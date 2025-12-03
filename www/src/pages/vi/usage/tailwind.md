---
title: Tailwind CSS
description: Sử dụng Tailwind CSS
layout: ../../../layouts/docs.astro
lang: vi
---

## Tailwind CSS là gì?

Tailwind CSS là một framework CSS nhỏ gọn, [tập trung vào utility](https://tailwindcss.com/docs/utility-first) nhằm cho phép bạn xây dựng thiết kế tùy chỉnh mà không cần chuyển đổi context giữa CSS thông thường. Nó là một framework CSS và không cung cấp bất kỳ thành phần tiền xây dựng hoặc logic nào, và cung cấp [một tập hợp khác biệt](https://www.youtube.com/watch?v=CQuTF-bkOgc) so với một các thư viện khác như Material UI.

Nó làm cho CSS trở nên vô cùng dễ dàng và nhanh chóng để viết, như được chứng minh bởi ví dụ sau:

CSS thông thường:

1. Viết CSS, thường trong một file riêng

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

2. Import CSS vào component của bạn

```jsx
import "./my-class.css";
```

3. Thêm class vào HTML

```html
<div class="my-class">...</div>
```

Tương đương trong Tailwind:

1. Chỉ viết classes trong HTML của bạn

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

Khi sử dụng cùng với React Components, nó mang đến sức mạnh để xây dựng UI một cách nhanh chóng.

Tailwind CSS có một hệ thống thiết kế tích hợp sẵn, được tạo ra từ box với một palette màu sắc được chọn cẩn thận, các kích thước cho các kiểu như width/height và padding/margin cho một thiết kế đồng nhất, cũng như các điểm cắt cho tạo ra các bố cục hài hòa. Hệ thống này được thiết kế này để có thể dễ dàng tùy chỉnh và mở rộng để tạo ra các công cụ mà bạn cần.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla, hay được biết đến dưới tên một người dùng Twitter là [mewtru](https://twitter.com/trunarla), đã cho chúng ta một bài nói chuyện tuyệt vời về [cách xây dựng một hệ thống thiết kế sử dụng Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

## Sử dụng

Hãy đảm bảo rằng bạn đã cài đặt các plugin editor cho Tailwind CSS để cải thiện trải nghiệm viết Tailwind CSS.

### Extensions và Plugins

- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Định dạng

Tailwind CSS classes có thể dễ dàng trở nên lộn xộn, vì vậy việc cần có một định dạng cho các classes là điều cần thiết. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) sắp xếp các classes trong [thứ tự được đề xuất](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) để các classes phù hợp với bundle CSS được xuất ra. Khi chọn Tailwind trong CLI, chúng tôi sẽ cài đặt và cấu hình nó cho bạn.

### Áp dụng điều kiện

Thêm classes bằng cách sử dụng ternaries có thể trở nên rất lộn xộn và khó đọc. Các package này giúp sắp xếp các classes của bạn khi sử dụng một số logic điều kiện.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Tài liệu hữu ích

| Tài liệu                    | Đường dẫn                                                |
| --------------------------- | -------------------------------------------------------- |
| Tài liệu củaTailwind        | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind Cheat Sheet        | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss         | https://github.com/aniftyco/awesome-tailwindcss/         |
| Cộng đồng Tailwind          | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Server Discord của Tailwind | https://tailwindcss.com/discord/                         |
| Kênh Youtube của Tailwind   | https://www.youtube.com/tailwindlabs/                    |
| Playground của Tailwind     | https://play.tailwindcss.com/                            |
