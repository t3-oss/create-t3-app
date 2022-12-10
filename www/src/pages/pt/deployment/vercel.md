---
title: Vercel
description: Fazendo deploy para a Vercel
layout: ../../../layouts/docs.astro
lang: pt
---

Recomendamos fazer o deploy de sua aplicação na [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). Isso facilita muito o deploy de sua aplicação Next.js.

## Configuração do projeto

A Vercel provavelmente configurará seu comando de build e publicará o diretório automaticamente. No entanto, você também pode especificar essas informações junto com outras configurações criando um arquivo chamado [`vercel.json`](https://vercel.com/docs/project-configuration) e incluindo os seguintes comandos:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Usando o painel de controle da Vercel

1. Depois de enviar seu código para um repositório GitHub, faça login na [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) com o GitHub e clique em **Add New Project**.

![Novo projeto no Vercel](/images/vercel-new-project.webp)

2. Importe o repositório GitHub com seu projeto.

![Importar repositório](/images/vercel-import-project.webp)

3. Adicione suas variáveis de ambiente.

![Adicionar variáveis de ambiente](/images/vercel-env-vars.webp)

4. Clique em **Deploy**. Agora, sempre que você enviar uma alteração ao seu repositório, a Vercel reimplementará automaticamente seu aplicativo!

## Usando a CLI da Vercel

Para fazer deploy a partir da linha de comando, você deve primeiro [instalar a CLI da Vercel globalmente](https://vercel.com/docs/cli#installing-vercel-cli).

```bash
npm i -g vercel
```

Execute o comando [`vercel`](https://vercel.com/docs/cli/deploying-from-cli) para implantar seu projeto.

```bash
vercel
```

Inclua `--env DATABASE_URL=YOUR_DATABASE_URL_HERE` para variáveis de ambiente como a string de conexão do banco de dados. Use `--yes` se quiser pular as perguntas de implantação e dar a resposta padrão para cada uma.

```bash
vercel --env DATABASE_URL=YOUR_DATABASE_URL_HERE --yes
```

Após o primeiro deploy, esse comando o fará em um branch de preview. Você precisará incluir `--prod` para enviar alterações diretamente para a produção.

```bash
vercel --prod
```
