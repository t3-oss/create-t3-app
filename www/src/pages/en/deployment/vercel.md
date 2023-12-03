---
title: Vercel
description: Deploying to Vercel
layout: ../../../layouts/docs.astro
lang: en
---

We recommend deploying your app to [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). It makes it super easy to deploy Next.js apps.

## Project Configuration

Vercel will likely configure your build command and publish the directory automatically. However, you can also specify this information along with other configurations by creating a file called [`vercel.json`](https://vercel.com/docs/project-configuration) and including the following commands. **This is not required for most projects.**

```json
{
  "buildCommand": "npm run build",
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
