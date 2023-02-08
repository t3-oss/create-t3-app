---
title: NextAuth.js
description: Uso do NextAuth.js
layout: ../../../layouts/docs.astro
lang: pt
---

Quando você deseja um sistema de autenticação em sua aplicação Next.js, o NextAuth.js é uma excelente solução para trazer a complexidade da segurança sem o incômodo de ter que construí-lo sozinho. Ele vem com uma extensa lista de provedores para adicionar rapidamente a autenticação OAuth e fornece adaptadores para muitos bancos de dados e ORMs.

## Context Provider

No ponto de entrada do seu aplicativo, você verá que ele está envolvida pelo [SessionProvider](https://next-auth.js.org/getting-started/client#sessionprovider):

```tsx:pages/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

Este provedor de contexto permite que seu aplicativo acesse os dados da sessão de qualquer lugar em seu aplicativo, sem ter que passá-los como props:

```tsx:pages/users/[id].tsx
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (!session) {
    // Lida com o estado não autenticado, por exemplo renderizar um componente SignIn
    return <SignIn />;
  }

  return <p>Bem-vindo {session.user.name}!</p>;
};
```

## Recuperando a sessão do lado do servidor.

Às vezes, você poderá querer solicitar a sessão no servidor. Para fazer isso, faça uma requisição usando o helper `getServerAuthSession` que `create-t3-app` fornece e passe-a para o cliente usando `getServerSideProps`:

```tsx:pages/users/[id].tsx
import { getServerAuthSession } from "../server/auth";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

const User = () => {
  const { data: session } = useSession();
  // NOTA: `session` não terá um estado de carregamento, pois já foi pré-carregado no servidor

  ...
}
```

## Inclusão do `user.id` na Sessão

`create-t3-app` está configurado para utilizar o [retorno de chamada de sessão (sesion callback)](https://next-auth.js.org/configuration/callbacks#session-callback) na configuração NextAuth.js para incluir o ID do usuário dentro do objeto `session`.

```ts:pages/api/auth/[...nextauth].ts
callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
```

Isso é acoplado a um arquivo de declaração de tipo para garantir que o `user.id` tenha seu tipo quando acessado no objeto `session`. Leia mais sobre [`Module Augmentation`](https://next-auth.js.org/getting-started/typescript#module-augmentation) nos documentos de NextAuth.js.

```ts:types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
```

O mesmo padrão pode ser usado para adicionar quaisquer outros dados ao objeto `session`, como um campo `role`, mas **não deve ser mal utilizado para armazenar dados confidenciais** no cliente.

## Uso com tRPC

Ao usar NextAuth.js com tRPC, você pode criar procedimentos protegidos e reutilizáveis usando [middleware](https://trpc.io/docs/v10/middlewares). Isso permite criar procedimentos que só podem ser acessados por usuários autenticados. `create-t3-app` configura tudo isso para você, permitindo que você acesse facilmente o objeto de sessão dentro de procedimentos autenticados.

Isso é feito em um processo de duas etapas:

1. Pegar a sessão dos headers da request usando a função [`getServerSession`](https://next-auth.js.org/configuration/nextjs#getServerSession). A vantagem de usar `getServerSession` em vez do `getSession` regular é que é uma função que é executada somente do lado do servidor e não faz chamadas de busca desnecessárias. O `create-t3-app` cria uma função auxiliar que abstrai essa API peculiar.

```ts:server/common/get-server-auth-session.ts
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
```

Usando esta função auxiliar, podemos pegar a sessão e passá-la para o contexto tRPC:

```ts:server/trpc/context.ts
import { getServerAuthSession } from "../common/get-server-auth-session";

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({
    session,
  });
};
```

2. Criar um middleware tRPC que verifique se o usuário está autenticado. Em seguida, usamos o middleware em um `protectedProcedure`. Qualquer chamador para esses procedimentos deve ser autenticado, caso contrário, será lançado um erro que pode ser tratado adequadamente pelo cliente.

```ts:server/trpc/trpc.ts
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // Infere `session` como não-nulo
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
```

O objeto de sessão é uma representação leve e mínima do usuário e contém apenas alguns campos. Ao usar `protectedProcedures`, você tem acesso ao id do usuário que pode ser usado para buscar mais dados do banco de dados.

```ts:server/trpc/router/user.ts
const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
});
```

## Uso com Prisma

Fazer o NextAuth.js funcionar com o Prisma requer muita [configuração inicial](https://next-auth.js.org/adapters/models/). O `create-t3-app` lida com tudo isso para você e, se você selecionar Prisma e NextAuth.js, obterá um sistema de autenticação totalmente funcional com todos os modelos necessários pré-configurados. Enviamos seu aplicativo montado com um provedor do Discord OAuth pré-configurado, que escolhemos porque é um dos mais fáceis de começar - basta fornecer seus tokens no `.env` e pronto. No entanto, você pode adicionar facilmente mais provedores seguindo a [documentação do NextAuth.js](https://next-auth.js.org/providers/). Observe que certos provedores exigem que campos extras sejam adicionados a determinados modelos. Recomendamos que você leia a documentação do provedor que deseja usar para certificar-se de que possui todos os campos obrigatórios.

### Adicionando novos campos aos seus modelos

Ao adicionar novos campos a qualquer um dos modelos `User`, `Account`, `Session` ou `VerificationToken` (provavelmente você só precisaria modificar o modelo `User`), você precisa ter em mente que o [Adaptador Prisma](https://next-auth.js.org/adapters/prisma) cria campos automaticamente nesses modelos quando novos usuários se inscrevem e fazem login. Portanto, ao adicionar novos campos a esses modelos, você deve fornecer padrão valores para eles, pois o adaptador não está ciente desses campos.

Se, por exemplo, você quiser adicionar um `role` (cargo) ao modelo `User`, você precisará fornecer um valor padrão para o campo `role`. Isso é feito adicionando um valor `@default` ao campo `role` no modelo `User`:

```diff:prisma/schema.prisma
+ enum Role {
+   USER
+   ADMIN
+ }

  model User {
    ...
+   role Role @default(USER)
  }
```

## Uso com o middleware Next.js

Uso de NextAuth.js com middleware Next.js [requer o uso da estratégia de sessão JWT](https://next-auth.js.org/configuration/nextjs#caveats) para autenticação. Isso ocorre porque o middleware só consegue acessar o cookie da sessão se for um JWT. Por padrão, `create-t3-app` é configurado para usar a estratégia de banco de dados **padrão**, em combinação com o Prisma como o adaptador de banco de dados.

## Configurando o DiscordProvider padrão

1. Vá para [a seção Aplicativos no Portal do desenvolvedor do Discord](https://discord.com/developers/applications) e clique em "Novo aplicativo"
2. No menu de configurações, vá para "OAuth2 => Geral"

- Copie o Client ID e cole-o em `DISCORD_CLIENT_ID` em `.env`.
- Em Client Secret, clique em "Reset Secret" e copie essa string para `DISCORD_CLIENT_SECRET` em `.env`. Tenha cuidado, pois você não poderá ver esse segredo novamente e redefini-lo fará com que o existente expire.
- Clique em "Add Redirect" e cole em `<app url>/api/auth/callback/discord` (exemplo para desenvolvimento local: <code class="break-all">http://localhost:3000/api/auth/callback/discord</code>)
- Salve suas alterações
- É possível, mas não recomendado, usar o mesmo aplicativo Discord tanto para desenvolvimento quanto para produção. Você também pode considerar [mockar o Provider](https://github.com/trpc/trpc/blob/next/examples/next-prisma-starter-websockets/src/pages/api/auth/%5B...nextauth%5D.ts) durante o desenvolvimento.

## Recursos Úteis

| Recurso                          | Link                                    |
| -------------------------------- | --------------------------------------- |
| Documentação do NextAuth.js      | https://next-auth.js.org/               |
| GitHub do NextAuth.js            | https://github.com/nextauthjs/next-auth |
| tRPC Kitchen Sink - com NextAuth | https://kitchen-sink.trpc.io/next-auth  |
