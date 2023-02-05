---
title: Netlify
description: Deploy no Netlify
layout: ../../../layouts/docs.astro
---

Netlify é um provedor de computação em nuvem remota com suporte a frameworks modernos de desenvolvimento, semelhante ao Vercel. Veja [`ajcwebdev/ct3a-netlify`](https://github.com/ajcwebdev/ct3a-netlify) para um repositório de exemplo baseado neste documento.

## Por que hospedar no Netlify

Comumente, a plataforma Vercel tem um suporte mais refinado ao Next.js porque o a mesma desenvolve o framework. Eles têm um interesse em garantir que a plataforma seja otimizada para o melhor desempenho e DX com o Next.js. Para a maioria dos casos de uso, isso será verdade e não fará sentido usar outras alternativas.

Também sabe-se que muitos recursos do Next.js são suportados apenas no Vercel. Embora seja verdade que os novos recursos do Next.js serão testados e suportados no Vercel no momento do lançamento por padrão, também é o caso de que outros provedores, como o Netlify, [implementarão e lançarão rapidamente suporte](https://www.netlify.com/blog/deploy-nextjs-13/) para [recursos Next.js estáveis](https://docs.netlify.com/integrations/frameworks/next-js/overview/).

Existem prós e contras relativos para todos os provedores de implantação, pois nenhum único host pode ter o melhor suporte para todos os casos de uso. Por exemplo, o Netlify criou seu próprio [tempo de execução personalizado do Next.js](https://github.com/netlify/next-runtime) para as Edge Functions do Netlify (que são executadas no Deno Deploy) e [mantém um middleware exclusivo para acessar e modificar respostas HTTP](https://github.com/netlify/next-runtime#nextjs-middleware-on-netlify).

> _NOTA: Para rastrear o status dos recursos não estáveis do Next 13, consulte [Usando o diretório `app` do Next 13 no Netlify](https://github.com/netlify/next-runtime/discussions/1724)._

## Configuração do projeto

Existem várias maneiras de configurar suas instruções de compilação, incluindo diretamente pelo CLI ou painel do Netlify. Embora não seja obrigatório, é aconselhável criar e incluir um arquivo [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/). Isso garante que versões forked e clonadas do projeto sejam mais fáceis de implantar de forma reproduzível.

```toml
[build]
  command = "next build"
  publish = ".next"
```

## Usando o painel do Netlify

1. Envie seu código para um repositório do GitHub e cadastre-se no [Netlify](https://app.netlify.com/signup). Depois de criar uma conta, clique em **Add new site** e, em seguida, em **Import an existing project**.

![Novo projeto no Netlify](/images/netlify-01-new-project.webp)

2. Conecte seu provedor Git.

![Importar repositório](/images/netlify-02-connect-to-git-provider.webp)

3. Selecione o repositório do seu projeto.

![Selecione o repositório do seu projeto](/images/netlify-03-pick-a-repository-from-github.webp)

4. Netlify detectará se você tiver um arquivo `netlify.toml` e configurará automaticamente seu comando de compilação e diretório de publicação.

![Nextjs build settings](/images/netlify-04-configure-build-settings.webp)

5. Clique em **Show advanced** e, em seguida, em **New variable** para adicionar suas variáveis de ambiente.

![Add variáveis de environment](/images/netlify-05-env-vars.webp)

6. Clique em **Deploy site**, aguarde a conclusão da compilação e visualize seu novo site.

## Usando o Netlify CLI

Para dar deploy pela CLI, você deve primeiro enviar seu projeto para um repositório do GitHub e [instalar o Netlify CLI](https://docs.netlify.com/cli/get-started/). Você pode instalar `netlify-cli` como uma dependência do projeto ou instalá-lo globalmente em sua máquina com o seguinte comando:

```bash
npm i -g netlify-cli
```

Para testar seu projeto localmente, execute o comando [`ntl dev`](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment) e abra [`localhost:8888`](http://localhost:8888/) para visualizar seu aplicativo Netlify em execução localmente:

```bash
ntl dev
```

Execute o comando [`ntl init`](https://docs.netlify.com/cli/get-started/#continuous-deployment) para configurar seu projeto:

```bash
ntl init
```

Importe as variáveis de ambiente do seu projeto do seu arquivo `.env` com [`ntl env:import`](https://cli.netlify.com/commands/env#envimport):

```bash
ntl env:import .env
```

Faça o deploy do seu projeto com [`ntl deploy`](https://docs.netlify.com/cli/get-started/#manual-deploys). Você precisará passar a flag `--build` para executar o comando de build antes do deploy e a flag `--prod` para fazer o deploy para a URL principal do seu site:

```bash
ntl deploy --prod --build
```

Para visualizar um exemplo em execução no Netlify, visite [ct3a.netlify.app](https://ct3a.netlify.app/).
