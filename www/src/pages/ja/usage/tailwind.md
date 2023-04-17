---
title: Tailwind CSS
description: Tailwind CSSの使い方
layout: ../../../layouts/docs.astro
lang: ja
---

## What is Tailwind CSS?

Tailwind CSS is a tiny, [utility first](https://tailwindcss.com/docs/utility-first) CSS framework for building custom designs, without the context switching that regular CSS requires. It is purely a CSS framework and does not provide any pre-built components or logic, and provides [a very different set of benefits](https://www.youtube.com/watch?v=CQuTF-bkOgc) compared to a component library like Material UI.

## Tailwind CSS とは何ですか？

Tailwind CSS は、通常の CSS が必要とするコンテキストスイッチなしで、カスタムデザインを構築するための小さな、[ユーティリティファースト](https://tailwindcss.com/docs/utility-first) CSS フレームワークです。純粋に CSS フレームワークであり、あらかじめ構築されたコンポーネントやロジックを提供するものではなく、Material UI のようなコンポーネントライブラリと比較して、[非常に異なる利点のセット](https://www.youtube.com/watch?v=CQuTF-bkOgc)を提供しています。

It makes CSS incredibly easy and quick to write, as shown by the following example:

Old CSS:

1. Write CSS, often in a separate file

これにより、以下の例のように、CSS が驚くほど簡単に、素早く書けるようになります：

旧 CSS です：

1. CSS を書く（多くの場合、別ファイルで書く

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

2. Import CSS into your component

3. CSS をコンポーネントにインポートする

```jsx
import "./my-class.css";
```

3. Add the class to your HTML

4. HTML にクラスを追加する

```html
<div class="my-class">...</div>
```

Equivalent in Tailwind:

1. Just write classes in your HTML

Tailwind ではこうです：

1. HTML にクラスを書くだけ

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

When used together with React Components, it is extremely powerful for quickly building UIs.

Tailwind CSS has a beautiful built-in design system, that comes out of the box with a carefully chosen color palette, sizing patterns for styles such as width/height and padding/margin for a uniform design, as well as media breakpoints for creating responsive layouts. This design system can be customized and extended to create the exact toolbox of styles that your project needs.

React Components と併用することで、UI を素早く構築するのに非常に威力を発揮します。

Tailwind CSS には美しいビルトインデザインシステムが搭載されており、厳選されたカラーパレット、均一なデザインを実現する width/height や padding/margin などのスタイルのサイズパターン、レスポンシブなレイアウトを作成するためのメディアブレイクポイントなどが箱から出された状態で提供されています。このデザインシステムは、カスタマイズや拡張が可能で、プロジェクトが必要とするスタイルのツールボックスを正確に作成することができます。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla better known as [mewtru](https://twitter.com/trunarla) gave an amazing talk on [building a design system using Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

[mewtru](https://twitter.com/trunarla)として知られる Tru Narla は、[Tailwind CSS を使ったデザインシステムの構築](https://www.youtube.com/watch?v=T-Zv73yZ_QI)について素晴らしい講演をしました。

## Usage

Make sure you have editor plugins for Tailwind installed to improve your experience writing Tailwind.

## 使用方法

Tailwind の書き味を向上させるために、Tailwind 用のエディタプラグインがインストールされていることを確認してください。

### Extensions and Plugins

- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains Integration](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### 拡張機能およびプラグイン

- [VSCode エクステンション](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains インテグレーション](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### Formatting

Tailwind CSS classes can easily get a bit messy, so a formatter for the classes is a must have. [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) sorts the classes in the [recommended order](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) so that the classes match the outputted css bundle. When selecting Tailwind in the CLI, we will install and configure this for you.

### 書式設定

Tailwind CSS のクラスは、少し乱雑になりやすいので、クラスのフォーマッタは必需品です。[Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) は、出力される css バンドルとクラスが一致するように、クラスを[推奨順序](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted)でソートします。CLI で Tailwind を選択すると、これをインストール・設定します。

### Conditionally Applying Classes

Conditionally adding classes using ternaries can get very messy and hard to read. These packages help in organizing your classes when using some conditional logic.

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

### 条件付きでクラスを適用する

サナリーを使った条件付きクラス追加は、非常に面倒で読みにくいものになります。これらのパッケージは、条件付きロジックを使用する際に、クラスを整理するのに役立ちます。

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## Useful Resources

| Resource                     | Link                                                     |
| ---------------------------- | -------------------------------------------------------- |
| Tailwind Docs                | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind Cheat Sheet         | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss          | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind Community           | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Tailwind Discord Server      | https://tailwindcss.com/discord/                         |
| TailwindLabs Youtube Channel | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground          | https://play.tailwindcss.com/                            |

## 役に立つ情報源

| リソース                        | リンク                                                   |
| ------------------------------- | -------------------------------------------------------- |
| Tailwind ドキュメント           | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind チートシート           | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss             | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind コミュニティ           | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Tailwind Discord サーバー       | https://tailwindcss.com/discord/                         |
| TailwindLabs Youtube チャンネル | https://www.youtube.com/tailwindlabs/                    |
| Tailwind Playground             | https://play.tailwindcss.com/                            |