---
title: tRPC
description: Cách sử dụng tRPC
layout: ../../../layouts/docs.astro
lang: vi
---

tRPC cho phép chúng ta viết API có tính toàn vẹn của kiểu dữ liệu (typesafe) mà không cần qua các bước tạo code (code generation) hoặc runtime bloat. Nó sử dụng inference của TypeScript để suy ra định nghĩa kiểu của router API của bạn và cho phép bạn gọi các thủ tục API của bạn từ frontend mà vẫn đảm bảo tính toàn vẹn của kiểu dữ liệu và auto-completion. Khi sử dụng tRPC, frontend và backend của bạn gần nhau hơn bao giờ hết, cho phép bạn có trải nghiệm lập trình (developer experience) tuyệt vời.

<blockquote className="w-full relative border-l-4 italic bg-t3-purple-200 dark:text-t3-purple-50 text-zinc-900 dark:bg-t3-purple-300/20 p-2 rounded-md text-sm my-3 border-neutral-500 quote">
  <div className="relative w-fit flex items-center justify-center p-1">
    <p className="mb-4 text-lg">
      <span aria-hidden="true">&quot;</span>Tôi tạo tRPC để cho phép mọi người lập trình nhanh hơn bằng cách loại bỏ API layer truyền thống, trong khi vẫn đảm bảo rằng ứng dụng của chúng ta sẽ không bị phá vỡ khi chúng ta lập trình ứng dụng một cách nhanh chóng.<span aria-hidden="true">&quot;</span>
    </p>
  </div>
  <cite className="flex items-center justify-end pr-4 pb-2">
    <img
      alt="Avatar of @alexdotjs"
      className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
      src="https://avatars.githubusercontent.com/u/459267?v=4"
    />
    <div className="flex flex-col items-start not-italic">
      <span className=" text-sm font-semibold">Alex - cha đẻ của tRPC</span>
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

## Làm sao để tôi sử dụng tRPC?

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2LYM8gf184U" title="Making typesafe APIs easy with tRPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Contributor của tRPC, [trashh_dev](https://twitter.com/trashh_dev), đã có [một bài giảng tuyệt vời tại Next.js Conf](https://www.youtube.com/watch?v=2LYM8gf184U) về tRPC. Chúng tôi khuyên bạn nên tham khảo qua video trước nếu bạn chưa từng sử dụng tRPC.

Với tRPC, bạn viết các hàm TypeScript trên backend, và sau đó gọi chúng từ frontend. Một tRPC procedure đơn giản có thể được định nghĩa như sau:

```ts:server/api/routers/user.ts
const userRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
```

Đây là một tRPC procedure (tương đương với một route handler trong backend truyền thống), nó bắt đầu bằng cách kiểm tra đầu vào bằng thư viện Zod (đồng thời cũng là thư viện validation mà chúng tôi sử dụng cho [biến môi trường](./env-variables)) - trong trường hợp này, nó đảm bảo rằng đầu vào là một chuỗi. Nếu đầu vào không phải là một chuỗi, nó sẽ báo lỗi ngay.

Sau đó, chúng ta có một hàm resolver, có thể là [query](https://trpc.io/docs/client/react/useQuery), [mutation](https://trpc.io/docs/v11/client/react/useMutation), hoặc một [subscription](https://trpc.io/docs/v11/subscriptions). Trong ví dụ của chúng tôi, hàm resolver này gọi tới cơ sở dữ liệu bằng cách sử dụng [prisma](./prisma) client và trả về người dùng có `id` khớp với id mà chúng tôi đã truyền vào.

Bạn định nghĩa các procedures trong `routers` mà đại diện cho một tập hợp các procedures liên quan với nhau và có cùng namespace. Bạn có thể có một router cho `users`, một cho `posts`, và một router khác cho `messages`. Sau đó, các router này có thể được gộp lại thành một `appRouter` duy nhất:

```ts:server/api/root.ts
const appRouter = createTRPCRouter({
  users: userRouter,
  posts: postRouter,
  messages: messageRouter,
});

export type AppRouter = typeof appRouter;
```

Chú ý rằng chúng ta chỉ cần xuất (export) kiểu dữ liệu của router của chúng ta, điều này có nghĩa là chúng ta chẳng cần phải import bất kỳ một đoạn code server nào ở phía client.

Bây giờ, chúng ta sẽ thử gọi một procedure của chúng ta trên frontend. tRPC có cung cấp một wrapper cho `@tanstack/react-query` cho phép bạn sử dụng toàn bộ sức mạnh của các hooks mà nó cung cấp, nhưng với lợi ích thêm là các cuộc gọi API của bạn sẽ được tự động định kiểu và suy ra. Chúng ta có thể gọi các procedures của chúng ta từ frontend như sau:

```tsx:pages/users/[id].tsx
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const UserPage = () => {
  const { query } = useRouter();
  const userQuery = api.users.getById.useQuery(query.id);

  return (
    <div>
      <h1>{userQuery.data?.name}</h1>
    </div>
  );
};
```

Bạn sẽ nhận thấy ngay lập tức việc autocompletion và tính toàn vẹn kiểu dữ liệu làm cho việc lập trình trở nên tuyệt vời hơn bao giờ hết. Ngay khi bạn viết `api.`, các routers của bạn sẽ xuất hiện trong autocomplete, và khi bạn chọn một router, các procedures của nó cũng sẽ xuất hiện. Bạn cũng sẽ nhận được một lỗi TypeScript nếu đầu vào của bạn không khớp với validator mà bạn đã định nghĩa ở phía backend.

## Xử lý lỗi

Mặc định, `create-t3-app` đã thiết lập một [error formatter](https://trpc.io/docs/v11/server/error-formatting) cho phép bạn suy ra các lỗi Zod nếu bạn nhận được lỗi validation ở phía backend.

Ví dụ:

```tsx
function MyComponent() {
  const { mutate, error } = api.post.create.useMutation();

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      mutate({ title: formData.get('title') });
    }}>
      <input name="title" />
      {error?.data?.zodError?.fieldErrors.title && (
        {/** `mutate` trả về lỗi trên `title` */}
        <span className="mb-8 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </span>
      )}

      ...
    </form>
  );
}
```

## Các file

tRPC yêu cầu rất nhiều boilerplate mà `create-t3-app` đã thiết lập cho bạn. Hãy cùng chúng tôi đi qua các file đã được tạo:

### 📄 `pages/api/trpc/[trpc].ts`

Đây được gọi là điểm xuất phát cho API của bạn và để thêm vào các router của tRPC. Thông thường, bạn sẽ không phải lo lắng với file này nhiều, nhưng nếu cần thiết, ví dụ như khi bạn muốn sử dụng các middleware như CORS hoặc tương tự, hãy biết rằng hàm `createNextApiHandler` là một [Next.js API handler](https://nextjs.org/docs/api-routes/introduction) nhận vào một đối tượng [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) và [response](https://developer.mozilla.org/en-US/docs/Web/API/Response). Điều này có nghĩa là bạn có thể bọc `createNextApiHandler` trong bất kỳ middleware nào bạn muốn. Xem [ví dụ](#sử-dụng-cors) dưới đây để biết cách thêm CORS.

### 📄 `server/api/trpc.ts`

File này được chia thành hai phần: khởi tạo context và khởi tạo tRPC:

1. Đây là nơi chúng ta định nghĩa context mà tRPC procedures sẽ có thể truy cập. Context là nơi mà tất cả các procedures của tRPC sẽ có thể truy cập để sử dụng những dữ liệu được "đựng" trong đó. Chính vì thế, đây là nơi tuyệt vời để đặt các thứ như kết nối cơ sở dữ liệu, thông tin xác thực, v.v. Trong `create-t3-app`, chúng tôi sử dụng hai hàm, để cho phép sử dụng một tập con của context khi chúng ta không có đối tượng request.

- `createInnerTRPCContext`: Đây là nơi bạn định nghĩa context mà không phụ thuộc vào request, ví dụ như kết nối cơ sở dữ liệu. Bạn có thể sử dụng hàm này cho [integration testing](#sample-integration-test) hoặc [ssg-helpers](https://trpc.io/docs/v10/client/nextjs/server-side-helpers) khi bạn không có đối tượng request.

- `createTRPCContext`: Đây là nơi bạn định nghĩa context mà phụ thuộc vào request, ví dụ như thông tin phiên người dùng. Bạn yêu cầu phiên người dùng bằng cách sử dụng đối tượng `opts.req`, và sau đó chuyển phiên người dùng xuống hàm `createInnerTRPCContext` để tạo context cuối cùng.

2. Chúng ta khởi tạo tRPC và định nghĩa các procedures có thể tái sử dụng và [middlewares](https://trpc.io/docs/v11/server/middlewares). Theo quy ước, bạn không nên xuất toàn bộ đối tượng `t` mà thay vào đó, tạo các procedures và middlewares để có thể tái sử dụng chúng.

Chúng tôi sử dụng `superjson` để làm [data transformer](https://trpc.io/docs/v10/server/data-transformers). Điều này có nghĩa là dữ liệu của bạn sẽ được bảo toàn khi chúng đến client, vì vậy nếu bạn gửi một đối tượng `Date`, client sẽ trả về một đối tượng `Date` và không phải là một chuỗi, như là trường hợp với hầu hết các APIs.

### 📄 `server/api/routers/*.ts`

Đây là nơi bạn định nghĩa các routes và procedures của API của bạn. Theo quy ước, bạn nên [tạo các routers riêng biệt](https://trpc.io/docs/v11/server/routers) cho các procedures liên quan.

### 📄 `server/api/root.ts`

Ở đây chúng ta thực hiện [gộp](https://trpc.io/docs/v11/server/merging-routers) tất cả các routers con được định nghĩa trong `routers/**` thành một router duy nhất.

### 📄 `utils/api.ts`

Đây là điểm xuất phát cho tRPC ở phía frontend. Đây là nơi bạn sẽ import **type definition** của router và tạo client tRPC của bạn cùng với các hooks react-query. Vì chúng tôi đã sử dụng `superjson` làm data transformer ở phía backend, chúng tôi cần sử dụng nó ở phía frontend. Điều này sẽ giúp cho việc dữ liệu được chuyển đổi từ backend sẽ được giải mã ở phía frontend.

Bạn sẽ định nghĩa các [links](https://trpc.io/docs/v11/client/links) ở đây, điều này xác định luồng request từ client đến server. Chúng tôi sử dụng [`httpBatchLink`](https://trpc.io/docs/v11/client/links/httpBatchLink) mà cho phép [request batching](https://cloud.google.com/compute/docs/api/how-tos/batch), cũng như một [`loggerLink`](https://trpc.io/docs/v10/links/loggerLink) mà xuất ra các log request hữu ích trong quá trình phát triển.

Cuối cùng, chúng tôi xuất ra một [helper type](https://trpc.io/docs/client/vanilla/infer-types) mà bạn có thể sử dụng để suy ra kiểu dữ liệu của bạn ở phía frontend.

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/x4mu-jOiA0Q" title="How tRPC really works" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Một contributor khác của Create T3 App, [Christopher Ehrlich](https://twitter.com/ccccjjjjeeee), đã làm một video về [luồng dữ liệu trong tRPC](https://www.youtube.com/watch?v=x4mu-jOiA0Q). Video này được khuyến khích nếu bạn đã sử dụng tRPC nhưng vẫn còn mơ hồ về cách nó hoạt động.

## Làm sao để gọi API từ bên ngoài?

Với các API thông thường, bạn có thể gọi các endpoint của mình bằng bất kỳ HTTP client nào như `curl`, `Postman`, `fetch` hoặc trực tiếp từ trình duyệt của bạn. Với tRPC, điều này hơi khác. Nếu bạn muốn gọi các procedures mà không cần sử dụng client tRPC, có hai cách được khuyến nghị:

### Khởi tạo một external procedure

Nếu bạn muốn khởi tạo một procedure mà bạn có thể gọi từ bên ngoài, bạn có thể đang tìm kiếm [server side calls](https://trpc.io/docs/server/server-side-calls). Điều này sẽ cho phép bạn tạo một endpoint Next.js thông thường, nhưng sử dụng phần resolver của procedure tRPC của bạn.

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter, createCaller } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Tạo context và caller
  const ctx = await createTRPCContext({ req, res });
  const caller = createCaller(ctx);
  try {
    const { id } = req.query;
    const user = await caller.user.getById(id);
    res.status(200).json(user);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // Một lỗi tRPC đã xảy ra
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // Một lỗi khác đã xảy ra
    console.error(cause);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

export default userByIdHandler;
```

### Khởi tạo tất cả các procedures như các REST endpoints

Nếu bạn muốn khởi tạo tất cả các procedures mà bạn có thể gọi từ bên ngoài, bạn có thê tham khảo các plugins xây dựng bởi cộng đồng [trpc-openapi](https://github.com/jlalmes/trpc-openapi/tree/master). Bằng cách cung cấp một số thông tin meta-data cho các procedures của bạn, bạn có thể tạo ra một API REST tương thích với OpenAPI từ router tRPC của bạn.

### Đây chỉ là các HTTP Requests

tRPC sử dụng giao thức HTTP, vì vậy bạn đều có thể gọi các procedures của tRPC bằng các HTTP requests thông thường. Tuy nhiên, cú pháp có thể khá phức tạp do tRPC sử dụng [kiểu định nghĩa giao thức RPC](https://trpc.io/docs/rpc) riêng biệt. Nếu bạn muốn tìm hiểu, bạn có thể kiểm tra các request và responses của tRPC trong tab mạng của trình duyệt của bạn, nhưng chúng tôi khuyến khích bạn nên làm điều này với mục đích học hỏi và sử dụng một trong các giải pháp được đề cập ở trên.

## So sánh với Next.js API endpoint

Hãy so sánh một endpoint Next.js API với một procedure tRPC. Ví dụ chúng ta muốn lấy một đối tượng user từ cơ sở dữ liệu và trả nó cho frontend. Chúng ta có thể viết một endpoint Next.js API như sau:

```ts:pages/api/users/[id].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";

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

So sánh với ví dụ tRPC ở trên và bạn có thể thấy một số lợi ích của tRPC:

- Thay vì phải tạo ra một URL cho mỗi route, điều này có thể trở nên khó khăn khi gỡ lỗi nếu bạn chuyển đổi điều gì đó, với tRPC, router của bạn là một đối tượng với autocomplete.
- Bạn không cần phải xác định phương thức HTTP nào đã được sử dụng.
- Bạn không cần phải xác định rằng request query hoặc body chứa dữ liệu đúng, vì Zod sẽ xử lý điều này.
- Thay vì tạo ra một response, bạn có thể throws lỗi và trả về một giá trị hoặc đối tượng như bạn làm trong bất kỳ hàm TypeScript nào khác.
- Gọi procedure ở phía frontend sẽ cung cấp đầy đủ autocompletion và tính toàn vẹn kiểu dữ liệu.

## Các snippet hữu ích

Dưới đây là một số snippet mà có thể hữu ích cho bạn.

### Sử dụng CORS

Nếu bạn cần sử dụng API của bạn từ một domain khác, ví dụ như trong một monorepo bao gồm một app React Native, bạn có thể cần phải sử dụng CORS:

```ts:pages/api/trpc/[trpc].ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import cors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Sử dụng CORS
  await cors(req, res);

  // Tạo và gọi handler tRPC
  return createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
  })(req, res);
};

export default handler;
```

### Cập nhật tối ưu (Optimistic updates)

Cập nhật tối ưu (optimistic updates) là khi chúng ta cập nhật UI trước khi cuộc gọi API hoàn tất. Điều này cho phép người dùng có trải nghiệm tốt hơn vì họ không phải chờ cuộc gọi API hoàn tất trước khi UI phản ánh kết quả hành động của họ. Tuy nhiên, các ứng dụng có giá trị dữ liệu chính xác cao nên tránh sử dụng cập nhật tối ưu vì chúng không biểu hiện của trạng thái backend. Bạn có thể đọc thêm trên [tài liệu của React Query](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates).

```tsx
const MyComponent = () => {
  const listPostQuery = api.post.list.useQuery();

  const utils = api.useUtils();
  const postCreate = api.post.create.useMutation({
    async onMutate(newPost) {
      // Hủy bỏ cuộc gọi API (để chúng không ghi đè lên cập nhật tối ưu của chúng ta)
      await utils.post.list.cancel();

      // Lấy dữ liệu từ cache
      const prevData = utils.post.list.getData();

      // Cập nhật dữ liệu tối ưu với bài viết mới
      utils.post.list.setData(undefined, (old) => [...old, newPost]);

      // Trả về dữ liệu trước đó để chúng ta có thể quay lại nó nếu điều gì đó sai
      return { prevData };
    },
    onError(err, newPost, ctx) {
      // Nếu cuộc gọi mutation thất bại, sử dụng giá trị từ onMutate
      utils.post.list.setData(undefined, ctx.prevData);
    },
    onSettled() {
      // Đồng bộ với server một lần mutation đã hoàn tất
      utils.post.list.invalidate();
    },
  });
};
```

### Ví dụ về tích hợp kiểm thử

Dưới đây là một ví dụ về kiểm thử sử dụng [Vitest](https://vitest.dev) để kiểm tra xem router tRPC của bạn đang hoạt động như mong đợi, phân tích kiểu đầu vào đúng, và dữ liệu trả về phù hợp với kỳ vọng.

```ts
import { type inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest";

import { appRouter, type AppRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

test("example router", async () => {
  const ctx = await createInnerTRPCContext({ session: null });
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;
  const input: Input = {
    text: "test",
  };

  const example = await caller.example.hello(input);

  expect(example).toMatchObject({ greeting: "Hello test" });
});
```

Nếu procedure của bạn được bảo vệ, bạn có thể truyền vào một đối tượng `session` giả khi bạn tạo context:

```ts
test("protected example router", async () => {
  const ctx = await createInnerTRPCContext({
    session: {
      user: { id: "123", name: "John Doe" },
      expires: "1",
    },
  });
  const caller = appRouter.createCaller(ctx);

  // ...
});
```

## Tài liệu hữu ích

| Tài liệu             | Đường dẫn                                       |
| -------------------- | ----------------------------------------------- |
| Tài liệu tRPC        | https://www.trpc.io                             |
| Ví dụ về tRPC        | https://github.com/trpc/trpc/tree/next/examples |
| Tài liệu React Query | https://tanstack.com/query/latest/docs          |
