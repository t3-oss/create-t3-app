---
title: Netlify
description: Fazendo deploy para a Netlify
layout: ../../../layouts/docs.astro
---

Netlify é um provedor de deploy alternativo semelhante à Vercel. Veja [`ajcwebdev/ct3a-netlify`](https://github.com/ajcwebdev/ct3a-netlify) para um exemplo de repositório baseado nesta documentação.

## Por que hospedar na Netlify

A sabedoria popular diz que a Vercel possui um suporte melhor para Next.js já que foi ela que desenvolveu o Next.js. Eles possuem interesse em garantir que a plataforma esteja ajustada para um desempenho ideal e uma boa DX com Next.js. Isso é verdade para a maioria dos casos de uso, não fazendo sentido desviar-se do caminho padrão.

Há também um sentimento comum de que diversos recursos do Next.js são suportados apenas na Vercel. Embora isso seja verdade para os novos recursos do Next.js que são testados e suportados na Vercel deste o seu lançamento, também é verdade que outros provedores como a Netlify buscam [implementar e liberar rapidamente versões de suporte](https://www.netlify.com/blog/deploy-nextjs-13/) para [recursos estáveis do Next.js](https://docs.netlify.com/integrations/frameworks/next-js/overview/)

Existem diversos prós e contras dentre todos provedores de deploy, já que nenhum host pode consegue ter o melhor suporte para todos os casos de uso existente. Por exemplo, a Netlify criou o seu próprio [Next.js runtime customizado](https://github.com/netlify/next-runtime) para as Netlify Edge Functions (que rodam no Deno Deploy) e [mantém um único middleware para acessar e modificar respostas HTTP](https://github.com/netlify/next-runtime#nextjs-middleware-on-netlify).

> _NOTA: Para verificar o status de recursos não estáveis do Next 13 veja [Using the Next 13 `app` directory on Netlify](https://github.com/netlify/next-runtime/discussions/1724)._

## Configuração do Projeto

Há diversas maneiras de configurar suas instruções de build, incluindo diretamente através da Netlify CLI ou pelo Netlify Dashboard. Embora não seja obrigatório, é recomendável criar e incluir um arquivo [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/). Isso garante que as versões fork ou clonadas do projeto sejam mais fáceis de implementar.

```toml
[build]
  command = "next build"
  publish = ".next"
```

## Usando o Netlify Dashboard

1. Dê o push de seu código para um repositório do GitHub e inscreva-se na [Netlify](https://app.netlify.com/signup). Depois de ter criado uma conta, clique em **Add new site** e então **Import an existing project**.

![Novo projeto na Netlify](/images/netlify-01-new-project.webp)

2. Conecte o seu provedor Git.

![Importar repositório](/images/netlify-02-connect-to-git-provider.webp)

3. Selecione o repositório de seu projeto.

![Selecione o repositório de seu projeto](/images/netlify-03-pick-a-repository-from-github.webp)

4. A Netlify detectará se você possui um arquivo `netlify.toml` e então vai automaticamente configurar seu comando de build e diretório de publicação.

![Configurações de build do Nextjs](/images/netlify-04-configure-build-settings.webp)

5. Clique em **Show advanced** e então **New variable** para adicionar suas variáveis de ambiente.

![Adicionar variáveis de ambiente](/images/netlify-05-env-vars.webp)

6. Clique em **Deploy site**, aguarde até o processo de build terminar, e então veja seu novo site.

## Usando a Netlify CLI

Para fazer o deploy a partir da linha de comando, primeiramente você fazer o push de seu projeto para um repositório do GitHub e [instalar a Netlify CLI](https://docs.netlify.com/cli/get-started/). Você pode instalar a `netlify-cli` como uma dependência de seu projeto ou instalar globalmente em sua máquina usando o seguinte comando:

```bash
npm i -g netlify-cli
```

Para testar o seu projeto localmente, rode o comando [`ntl dev`](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment) e abra [`localhost:8888`](http://localhost:8888/) para ver sua aplicação Netlify rodando localmente:

```bash
ntl dev
```

Rode o comando [`ntl init`](https://docs.netlify.com/cli/get-started/#continuous-deployment) para configurar seu projeto:

```bash
ntl init
```

Importe as variáveis de ambiente de seu projeto que estão em seu arquivo `.env` com [`ntl env:import`](https://cli.netlify.com/commands/env#envimport):

```bash
ntl env:import .env
```

Faça o deploy de seu projeto com [`ntl deploy`](https://docs.netlify.com/cli/get-started/#manual-deploys). Você precisará passar a flag `--build` para rodar o comando de build antes do deploy e a flag `--prod` para fazer o deploy do seu site em sua URL principal:

```bash
ntl deploy --prod --build
```

Para ver um exemplo rodando na Netlify, visite [ct3a.netlify.app](https://ct3a.netlify.app/).
