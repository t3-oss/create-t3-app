---
title: Vercel
description: Vercelへのデプロイ
layout: ../../../layouts/docs.astro
lang: ja
---

アプリケーションは[Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss)にデプロイすることをお勧めします。Next.js のアプリケーションを超簡単にデプロイすることができます。

## プロジェクト構成

Vercel はビルドコマンドの設定とディレクトリの公開を自動的にうまくやってくれる場合が多いでしょう。しかし、[`vercel.json`](https://vercel.com/docs/project-configuration)というファイルを作成し、以下のコマンドを含めることで、他の設定も含めてこれらの情報を明示指定することもできます。**これはほとんどのプロジェクトでは必要ありません**。

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Vercel ダッシュボードを使う

1. コードを GitHub のリポジトリにプッシュした後、GitHub で[Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss)にサインアップし、**Add New Project**をクリックします。

![Vercel の新プロジェクト](/images/vercel-new-project.webp)

2. GitHub のリポジトリをプロジェクトと一緒にインポートします。

![インポートリポジトリ](/images/vercel-import-project.webp)

3. 環境変数を追加します。

![環境変数を追加する](/images/vercel-env-vars.webp)

4. **Deploy**をクリックします。これで、リポジトリに変更をプッシュするたびに、Vercel は自動的にアプリケーションを再デプロイするようになります！

## Vercel CLI を使う

コマンドラインからデプロイするには、まず [Vercel CLI をグローバルにインストール](https://vercel.com/docs/cli#installing-vercel-cli) する必要があります。

```bash
npm i -g vercel
```

[`vercel`](https://vercel.com/docs/cli/deploying-from-cli) コマンドを実行してプロジェクトをデプロイします。

```bash
vercel
```

データベース接続文字列などの環境変数には、`--env DATABASE_URL=YOUR_DATABASE_URL_HERE`を含めるようにします。デプロイの質問を省略し、それぞれにデフォルトの回答を与えたい場合は `--yes` を使用します。

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

最初のデプロイの後、このコマンドは preview ブランチにデプロイされます。将来のデプロイのために、変更をライブサイトに直接プッシュするには、`--prod`を含める必要があります。

```bash
vercel --prod
```
