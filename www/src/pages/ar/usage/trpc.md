---
title: tRPC
description: Usage of tRPC
layout: ../../../layouts/docs.astro
lang: ar
dir: rtl
---

تسمح لك tRPC بكتابة type safe api دُون الحَاجة إلى تَوليد كود فتُنحي عنك حَدوث أخطاء مفاجئة أثناء الـ runtime، حيث إنها تَستغل خاصية الـ inference في Typescript حتى تضمن الـ type safety عِند نداء الـ Api من الـ Frontend

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>I built tRPC to allow people to move faster by removing the need of a traditional API-layer, while still having confidence that our apps won't break as we rapidly iterate.<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 mr-4 rounded-full bg-neutral-500"
      src="https://avatars.githubusercontent.com/u/459267?v=4"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Alex - creator of tRPC</span>
      <a
        href="https://twitter.com/alexdotjs"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
      >
        @alexdotjs
      </a>
    </div>
  </cite>
</blockquote>

## Files

لسوء الحظ فإن tRPC تتطلب قليلاً من الـ boilerplate ولكن لحسن الحظ فان `create-t3-app` تحمل عنك هذا العبء.

### 📄 ملف `pages/api/trpc/[trpc].ts`

هذة هي نقطة دخولك الي tRPC Api، في الأوضاع الطبيعية لن تحتاج الي أن تَمس هذا الملف كثيرا. فيمكنك تغييره عند تفعيل CORS Middleware او شئ من هذا القبيل ويقوم بعمل export لـ `createNextHandler` [Next.js API handler](https://nextjs.org/docs/api-routes/introduction) والذي يقبل [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) و [response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

مما يعني أنك قادر على استخدام `createNextApiHandler` في أي middleware تريده، إقرأ [example snippet](#enabling-cors)

### ملف 📄 `server/trpc/context.ts`

في هذا الملف تقوم بانشاء الـ Context التي سيتم تمريره الي tRPC Procedure ، الـ Context هو عبارة عن البيانات التي سيكون لكل الـ Procedures وصول لها وهي مكان مُناسب لتضع أشياء مثل database connections ومعلومات المصادقة وغيرها.

- ما هو `createContextInner`: هُنا تَقوم بإنشاء الـ Context الذي لا يَعتمد عَلى الـ request مِثل إتصال قاعدة البيانات. ويمكنك إستخدام function لـ [integration testing](#sample-integration-test) او [ssg-helpers](https://trpc.io/docs/v10/ssg-helpers)
- ما هو `createContext` ؟ هُنا حَيث تَقوم بإنشاء الـ Context الذي يعتمد على الـ request فيمكنك الوصول الى الـ `req Object` عن طريق `opts.req` ومن ثُم تَمريرة الي `createContextInner`لإنشاء الـ Context النهائي

### 📄ملف `server/trpc/trpc.ts`

في هذا حَيثُ يمكنك تحديد الـ [procedures](https://trpc.io/docs/v10/server/procedures) و [middlewares](https://trpc.io/docs/v10)، من الافضل ان لا تقوم بعمل export لـ t Object كاملا
/middlewares) بل قم بتصدير procedures و middlewares
ستلاحظ أننا نستخدم `superjson` كـ [data transformer](https://trpc.io/docs/v10/server/data-transformers)، ذلك حتى نحفظ الـ Types لحين إستخدامها في في الـ client، فمثلا إذا كان الـ Type هو Date فإن الـ client سَيُعيد Date ,gds string

### 📄 ملف `server/trpc/router/*.ts`

هنا يمكنك تحديد الـ route ,والـ procedure للـ API، من الافضل [أن تُنشئ routers](https://trpc.io/docs/v10/router) مُنفصلة للـ procedures المتقاربة ومن ثَم [دمجها](https://trpc.io/docs/v10/server/merging-routers) في router واحد في `server/trpc/router/_app.ts`

### 📄 ملف `utils/trpc.ts`

هذه هي نقطة دخول الواجهة الأمامية لـ tRPC. هذا هو المكان الذي ستقوم فيه باستيراد **type definition** الخاص بالـ procedure وإنشاء tRPC client الخاص بك جنبًا إلى
جنب مع react query hooks. نظرًا لأننا قمنا بتفعيل "superjson" في الواجهة الخلفية
فنحن بحاجة إلى تفعيلة على الواجهة الأمامية أيضًا. هذا لان البيانات التي يحدث لها serialized في الـ client يتم عمل deserialized لها في الـ client.

هنا تقوم بتحديد [روابط](https://trpc.io/docs/v10/client/links) الـ tRPC حيث تُُحدد المسار الذي سيمر به الـ request من الـ client إلى الـ server
نحن نستخدم [`httpBatchLink`](https://trpc.io/docs/v10/client/links/httpBatchLink) بشكل إفتراضي مع تفعيل [request batching](https://cloud.google.com/compute/docs/api/how-tos/batch) و [`loggerLink`](https://trpc.io/docs/v10/client/links/loggerLink)

وفي الاخير نقوم بتصدير [helper type](https://trpc.io/docs/v10/infer-types#additional-dx-helper-type) حتى نستعمل الـ type infre في الـ frontend

## كيف أستخدم tRPC ؟

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Making typesafe APIs easy with tRPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

ننصحك بمشاهدة هذا[a killer talk at Next.js Conf](https://www.youtube.com/watch?v=2LYM8gf184U) من [trashh_dev](https://twitter.com/trashh_dev)

مع tRPCتكتب Function في الـ backend والتي يمكن مناداتها من الـ frontend

```ts:server/trpc/router/user.ts
const userRouter = t.router({
  getById: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
```

في نهاية الأمر تتحول tRPC procedure الي backend عادي فيقوم بفحص الـ input ويمرر الـ request إذا كان صحيحاًويعيد رسالة خطأ إذا كانت المدخلات غير صحيحة.
بعد التأكد من صحة البيانات يتم نداء function والتي إما لجلب بيانات ([query](https://trpc.io/docs/v10/react-queries)) أو أن تغير في البانات ([mutation](https://trpc.io/docs/v10))
أنت

```ts:server/trpc/router/_app.ts
const appRouter = t.router({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

لاحظ أننا نقوم بعمل export فقط لـ router's type أي أننا لا نستخدم اي من الـ server code في الـ client
الان دعنا ننادي الـ procedure من الـ frontend ، tRPC توفر wrapper لمكتبة `@tanstack/react-query` مما يسمح لك بإستخدام المكتبة بكامل قوتها.

```tsx:pages/users/[id].tsx
import { useRouter } from "next/router";

const UserPage = () => {
  const { query } = useRouter();
  const userQuery = trpc.user.getById.useQuery(query.id);

  return (
    <div>
      <h1>{userQuery.data?.name}</h1>
    </div>
  );
};
```

ستلاحظ على الفور مدى جودة الإكمال التلقائي والـ typesafety. بمجرد كتابة "trpc." ، ستظهر `router` الخاصة بك في الإكمال التلقائي ، وعندما تحدد الـ `router`،
ستظهر الـ procedures. وستحصل أيضًا على خطأ TypeScript إذا كانت المُدخلات الخاص بك لا يتطابق مع الـ schema الذي حددته مسبقا.

## كيف اُنادي API خارجي ؟

باستخدام الـ API العادية ، يمكنك استدعاء الـ End point الخاصة بك باستخدام أي عميل HTTP مثل `curl` أو` Postman` أو `fetch` أو مباشرة من متصفحك.
مع tRPC ، الأمر مختلف بعض الشيء. إذا كنت ترغب في الاتصال بالـ procedure بدون عميل tRPC ، فهناك طريقتان موصى بهما للقيام بذلك:

### Expose a single procedure externally

إذا أردت أن تُتيح procedure للـ Apis الخارجية الق نظرة علي [server side calls](https://trpc.io/docs/v10/server-side-calls)، مما سيسمح لك بعمل Next.js Api إعتيادية

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter, createCaller } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  const ctx = await createTRPCContext({ req, res });
  const caller = createCaller(ctx);
  try {
    const { id } = req.query;
    const user = await caller.user.getById(id);
    res.status(200).json(user);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occurred
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // Another error occurred
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default userByIdHandler;
```

### تحول كل الـ Procedures الي REST endpoint ؟

إذا كنت ترغب في كشف كل الـ ؛قخؤثيعقثس ، الق نظرة علي [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master).

### It's just HTTP Requests

tRPC communicates over HTTP, so it is also possible to call your tRPC procedures using "regular" HTTP requests. However, the syntax can be cumbersome due to the [RPC protocol](https://trpc.io/docs/v10/rpc) that tRPC uses. If you're curious, you can check what tRPC requests and responses look like in your browser's network tab, but we suggest doing this only as an educational exercise and sticking to one of the solutions outlined above.

## Comparison to a Next.js API endpoint

دعنا نقارن " Next.js Endpoint" بـ "tRPC procedure". لنفترض أننا نريد جلب "Object" مستخدم معين من قاعدة بياناتنا وإعادته إلى الواجهة الأمامية.
يمكننا كتابة Next.js API Endpoint مثل هذا:

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  const examples = await prisma.example.findFirst({
    where: {
      id,
    },
  });

  res.status(200).json(examples);
};

export default userByIdHandler;
```

```ts:pages/users/[id].tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);
};
```

قارن هذا بمثال tRPC أعلاه ويمكنك رؤية بعض مزايا tRPC:

- بدلاً من تحديد عنوان url لكل مسار ، والذي يمكن أن يصبح مزعجًا إذا حاولت نقل شيء ما ، فإن الـ `router` بأكمله عبارة عن `Object` مع الإكمال التلقائي.
- لست بحاجة إلى التحقق من HTTP method التي تم استخدامها.
- لا تحتاج إلى التحقق من أن الطلب أو الـ `query` ، لأن Zod يعتني بذلك.
- بدلاً من إنشاء الـ responde object ، يمكنك إرجاع أخطاء او قيمة أو Object كما تفعل في أي function.

## snippets مفيدة

### تفعيل CORS

```ts:pages/api/trpc/[trpc].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "~/server/trpc/router/_app";
import { createContext } from "~/server/trpc/context";
import cors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Enable cors
  await cors(req, res);

  // Create and call the tRPC handler
  return createNextApiHandler({
    router: appRouter,
    createContext,
  })(req, res);
};

export default handler;
```

### Optimistic updates

الـ Optimistic updates هي تحديثات تحديث واجهة المستخدم قبل أن ينتهي الـ Request مما يُحسن تجربة المستخدم، لكن التطبيقات التي تُفضل دقة المعلومات يجب أن تتجنب الـ Optimistic updates، للمزيد من المعلومات إقرا [React Query docs](https://tanstack.com/query/v4/docs/framework/react/guides/optimistic-updates).

```tsx
const MyComponent = () => {
  const listPostQuery = trpc.post.list.useQuery();

  const utils = trpc.useContext();
  const postCreate = trpc.post.create.useMutation({
    async onMutate(newPost) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.post.list.cancel();

      // Get the data from the queryCache
      const prevData = utils.post.list.getData();

      // Optimistically update the data with our new post
      utils.post.list.setData(undefined, (old) => [...old, newPost]);

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.post.list.setData(undefined, ctx.prevData);
    },
    onSettled() {
      // Sync with server once mutation has settled
      utils.post.list.invalidate();
    },
  });
};
```

### عينة من Integration Test

إقرأ [Vitest](https://vitest.dev)

```ts
import { type inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest";

import { appRouter, type AppRouter } from "~/server/router/_app";
import { createContextInner } from "~/server/router/context";

test("example router", async () => {
  const ctx = await createContextInner({ session: null });
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;
  const input: Input = {
    text: "test",
  };

  const example = await caller.example.hello(input);

  expect(example).toMatchObject({ greeting: "Hello test" });
});
```

## Useful Resources

| Resource               | Link                                                    |
| ---------------------- | ------------------------------------------------------- |
| tRPC Docs              | https://www.trpc.io                                     |
| Bunch of tRPC Examples | https://github.com/trpc/trpc/tree/next/examples         |
| React Query Docs       | https://tanstack.com/query/v4 |
