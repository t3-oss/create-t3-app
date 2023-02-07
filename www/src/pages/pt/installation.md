---
title: Instalação
description: Instruções de Instalação do Create T3 App
layout: ../../layouts/docs.astro
lang: pt
---

Para estruturar uma aplicação usando `create-t3-app`, rode qualquer um dos comandos seguintes e responda as perguntas:

### npm

```bash
npm create-t3-app@latest
```

### yarn

```bash
yarn create-t3-app
```

### pnpm

```bash
pnpm create-t3-app@latest
```

Após sua aplicação ter sido estruturada, verifique os [Primeiros Passos](/pt/usage/first-steps) para começar a usar sua nova aplicação.

## Uso avançado

| Opção/Flag        | Descrição                                                                         |
| ----------------- | --------------------------------------------------------------------------------- |
| `[dir]`           | Inclua um argumento de diretório com um nome para o projeto                       |
| `--noGit`         | Diga explicitamente à CLI para não inicializar um novo repositório git no projeto |
| `-y`, `--default` | Ignore a CLI e inicialize um novo aplicativo t3 com todas as opções selecionadas  |
| `--noInstall`     | Gera um projeto sem instalar as dependências                                      |

## Uso experimental

Para o nosso CI (Integração Contínua), nós temos algumas flags experimentais que te permitem inicializar qualquer aplicação sem responder nenhuma pergunta. Se esse caso de uso se aplicar a você, você pode usar essas flags. Note que essas flags são experimentais e podem mudar no futuro sem seguir nenhum versionamento.

| Flag         | Descrição                              |
| ------------ | -------------------------------------- |
| `--CI`       | Informa a CLI que você está no modo CI |
| `--trpc`     | Inclui o tRPC no projeto               |
| `--prisma`   | Inclui o Prisma no projeto             |
| `--nextAuth` | Inclui o NextAuth.js no projeto        |
| `--tailwind` | Inclui o Tailwind CSS no projeto       |

**Nota: se você não providenciar a flag `CI`, o resto dessas flags não possui efeito.**

Você não precisa explicitamente excluir os pacotes que não deseja. De qualquer forma, se você preferir ser explícito, você pode passar a flag `false`, ex: `--nextAuth false`.

### Exemplo

O comando a seguir irá inicializar um T3 App com tRPC e Tailwind CSS.

```bash
pnpm dlx create-t3-app@latest --CI --trpc --tailwind
```
