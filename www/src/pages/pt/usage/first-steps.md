---
title: Primeiros passos
description: Começando com seu novo T3 App
layout: ../../../layouts/docs.astro
lang: pt
---

Você acabou de criar um novo aplicativo T3 e está pronto para começar. Aqui está o mínimo para que seu aplicativo funcione.

## Banco de dados

Se o seu aplicativo incluir o Prisma, certifique-se de executar `npx prisma db push` no diretório raiz do seu aplicativo. Este comando sincronizará o schema do Prisma com seu banco de dados e gerará as tipagens do TypeScript para o Prisma Client com base em seu schema. Observe que você precisa reiniciar o servidor TypeScript depois de fazer isso para que ele possa detectar os novos tipos gerados.

## Autenticação

Se seu aplicativo incluir NextAuth.js, vamos começar com o `DiscordProvider`. Este é um dos provedores mais simples que o NextAuth.js oferece, mas ainda requer um pouco de configuração inicial de sua parte.

Claro, se você preferir usar um provedor de autenticação diferente, também pode usar um dos [muitos provedores](https://next-auth.js.org/providers/) que o NextAuth.js oferece.

1. Você precisará de uma conta no Discord, então crie uma se ainda não tiver.
2. Navegue até https://discord.com/developers/applications e clique em "Novo aplicativo" no canto superior direito. Dê um nome ao seu aplicativo e concorde com os Termos de Serviço.
3. Depois de criar seu aplicativo, navegue até "Configurações → OAuth2 → Geral".
4. Copie o "ID do cliente" e adicione-o ao seu `.env` como `DISCORD_CLIENT_ID`.
5. Clique em "Redefinir Segredo", copie o novo segredo e adicione-o ao seu `.env` como `DISCORD_CLIENT_SECRET`.
6. Clique em "Adicionar redirecionamento" e digite `http://localhost:3000/api/auth/callback/discord`.
   - Para implantação de produção, siga as etapas anteriores para criar outro aplicativo Discord, mas desta vez substitua `http://localhost:3000` pela URL na qual você está implantando.
7. Salve as alterações.
8. Defina `NEXTAUTH_SECRET` em `.env`. Em desenvolvimento, qualquer string funcionará, para produção, veja a nota em `.env` sobre como gerar um segredo seguro.

Agora você deve conseguir fazer login.

## Próximos passos

- Se sua aplicação incluir tRPC, confira `src/pages/index.tsx` e `src/server/trpc/router/post.ts` para ver como funcionam as consultas tRPC.
- Dê uma olhada na documentação `create-t3-app`, bem como nos documentos dos pacotes que sua aplicação inclui.
- Junte-se ao nosso [Discord](https://t3.gg/discord) e dê-nos uma estrela no [GitHub](https://github.com/t3-oss/create-t3-app)! :)
