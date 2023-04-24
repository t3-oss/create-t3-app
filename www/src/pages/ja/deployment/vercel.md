---
title: Vercel
description: Vercelへのデプロイ
layout: ../../../layouts/docs.astro
lang: ja
---

We recommend deploying your app to [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). It makes it super easy to deploy Next.js apps.

アプリケーションは[Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss)にデプロイすることをお勧めします。Next.js のアプリケーションを超簡単にデプロイすることができます。

## Project Configuration

Vercel will likely configure your build command and publish the directory automatically. However, you can also specify this information along with other configurations by creating a file called [`vercel.json`](https://vercel.com/docs/project-configuration) and including the following commands. **This is not required for most projects.**

## プロジェクト構成

Vercel はビルドコマンドの設定とディレクトリの公開を自動的にうまくやってくれる場合が多いでしょう。しかし、[`vercel.json`](https://vercel.com/docs/project-configuration)というファイルを作成し、以下のコマンドを含めることで、他の設定も含めてこれらの情報を明示指定することもできます。**これはほとんどのプロジェクトで必要ありません**。

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Using the Vercel Dashboard

1. After pushing your code to a GitHub repository, sign up for [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) with GitHub and click on **Add New Project**.

![New project on Vercel](/images/vercel-new-project.webp)

2. Import the GitHub repository with your project.

![Import repository](/images/vercel-import-project.webp)

3. Add your environment variables.

![Add environment variables](/images/vercel-env-vars.webp)

4. Click **Deploy**. Now whenever you push a change to your repository, Vercel will automatically redeploy your app!

## Vercel ダッシュボードを使う

1. コードを GitHub のリポジトリにプッシュした後、GitHub で[Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss)にサインアップし、**Add New Project**をクリックします。

![Vercel の新プロジェクト](/images/vercel-new-project.webp)

2. GitHub のリポジトリをプロジェクトと一緒にインポートします。

![インポートリポジトリ](/images/vercel-import-project.webp)

3. 環境変数を追加します。

![環境変数を追加する](/images/vercel-env-vars.webp)

4. **Deploy**をクリックします。これで、リポジトリに変更をプッシュするたびに、Vercel は自動的にアプリケーションを再デプロイするようになります！

## Using the Vercel CLI

To deploy from the command line you must first [install the Vercel CLI globally](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

Run the [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) command to deploy your project.

```bash
vercel
```

Include `--env DATABASE_URL=YOUR_DATABASE_URL_HERE` for environment variables like the database connection string. Use `--yes` if you want to skip the deployment questions and give the default answer for each.

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

After the first deployment this command will deploy to a preview branch. You will need to include `--prod` to push changes directly to the live site for future deployments.

```bash
vercel --prod
```

## Vercel CLI を使う

コマンドラインからデプロイするには、まず [Vercel CLI をグローバルにインストール](https://vercel.com/docs/cli#installing-vercel-cli) する必要があります。

```bash
npm i -g vercel
```

プロジェクトをデプロイするために [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) コマンドを実行します。

```bash
vercel
```

データベース接続文字列などの環境変数には、`--env DATABASE_URL=YOUR_DATABASE_URL_HERE`を含めるようにします。デプロイの質問を省略し、それぞれにデフォルトの回答を与えたい場合は `--yes` を使用します。

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

最初のデプロイの後、このコマンドはプレビューブランチにデプロイされます。将来のデプロイのために、変更をライブサイトに直接プッシュするには、`--prod`を含める必要があります。

```bash
vercel --prod
```
