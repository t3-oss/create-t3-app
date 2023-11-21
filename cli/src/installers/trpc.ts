import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const trpcInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "@tanstack/react-query",
      "superjson",
      "@trpc/server",
      "@trpc/client",
      "@trpc/next",
      "@trpc/react-query",
    ],
    devMode: false,
  });

  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;
  const usingDb = usingPrisma || usingDrizzle;

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const apiHandlerFile = "src/pages/api/trpc/[trpc].ts";
  const routeHandlerFile = "src/app/api/trpc/[trpc]/route.ts";
  const srcToUse = appRouter ? routeHandlerFile : apiHandlerFile;

  const apiHandlerSrc = path.join(extrasDir, srcToUse);
  const apiHandlerDest = path.join(projectDir, srcToUse);

  const trpcFile =
    usingAuth && usingDb
      ? "with-auth-db.ts"
      : usingAuth
        ? "with-auth.ts"
        : usingDb
          ? "with-db.ts"
          : "base.ts";
  const trpcSrc = path.join(
    extrasDir,
    "src/server/api",
    appRouter ? "trpc-app" : "trpc-pages",
    trpcFile
  );
  const trpcDest = path.join(projectDir, "src/server/api/trpc.ts");

  const rootRouterSrc = path.join(extrasDir, "src/server/api/root.ts");
  const rootRouterDest = path.join(projectDir, "src/server/api/root.ts");

  const exampleRouterFile =
    usingAuth && usingPrisma
      ? "with-auth-prisma.ts"
      : usingAuth && usingDrizzle
        ? "with-auth-drizzle.ts"
        : usingAuth
          ? "with-auth.ts"
          : usingPrisma
            ? "with-prisma.ts"
            : usingDrizzle
              ? "with-drizzle.ts"
              : "base.ts";

  const exampleRouterSrc = path.join(
    extrasDir,
    "src/server/api/routers/post",
    exampleRouterFile
  );
  const exampleRouterDest = path.join(
    projectDir,
    "src/server/api/routers/post.ts"
  );

  const copySrcDest: [string, string][] = [
    [apiHandlerSrc, apiHandlerDest],
    [trpcSrc, trpcDest],
    [rootRouterSrc, rootRouterDest],
    [exampleRouterSrc, exampleRouterDest],
  ];

  if (appRouter) {
    addPackageDependency({
      dependencies: ["server-only"],
      devMode: false,
      projectDir,
    });

    const trpcDir = path.join(extrasDir, "src/trpc");
    copySrcDest.push(
      [
        path.join(trpcDir, "server.ts"),
        path.join(projectDir, "src/trpc/server.ts"),
      ],
      [
        path.join(trpcDir, "react.tsx"),
        path.join(projectDir, "src/trpc/react.tsx"),
      ],
      [
        path.join(trpcDir, "shared.ts"),
        path.join(projectDir, "src/trpc/shared.ts"),
      ],
      [
        path.join(
          extrasDir,
          "src/app/_components",
          packages?.tailwind.inUse ? "create-post-tw.tsx" : "create-post.tsx"
        ),
        path.join(projectDir, "src/app/_components/create-post.tsx"),
      ]
    );
  } else {
    const utilsSrc = path.join(extrasDir, "src/utils/api.ts");
    const utilsDest = path.join(projectDir, "src/utils/api.ts");
    copySrcDest.push([utilsSrc, utilsDest]);
  }

  copySrcDest.forEach(([src, dest]) => {
    fs.copySync(src, dest);
  });
};
