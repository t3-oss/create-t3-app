import fs from "fs-extra";
import path from "path";
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
      "@trpc/react-query", // TODO: remove for appRouter when peerDep is resolved in trpc
    ],
    devMode: false,
  });

  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const apiHandlerFile = "src/pages/api/trpc/[trpc].ts";
  const routeHandlerFile = "src/app/api/trpc/[trpc]/route.ts";
  const srcToUse = appRouter ? routeHandlerFile : apiHandlerFile;

  const apiHandlerSrc = path.join(extrasDir, srcToUse);
  const apiHandlerDest = path.join(projectDir, srcToUse);

  const trpcFile =
    usingAuth && usingPrisma
      ? "with-auth-prisma.ts"
      : usingAuth
      ? "with-auth.ts"
      : usingPrisma
      ? "with-prisma.ts"
      : "base.ts";
  const trpcSrc = path.join(
    extrasDir,
    "src/server/api",
    appRouter ? "trpc-app" : "trpc-pages",
    trpcFile,
  );
  const trpcDest = path.join(projectDir, "src/server/api/trpc.ts");

  const rootRouterSrc = path.join(extrasDir, "src/server/api/root.ts");
  const rootRouterDest = path.join(projectDir, "src/server/api/root.ts");

  const exampleRouterFile =
    usingAuth && usingPrisma
      ? "with-auth-prisma.ts"
      : usingAuth
      ? "with-auth.ts"
      : usingPrisma
      ? "with-prisma.ts"
      : "base.ts";

  const exampleRouterSrc = path.join(
    extrasDir,
    "src/server/api/routers/example",
    exampleRouterFile,
  );
  const exampleRouterDest = path.join(
    projectDir,
    "src/server/api/routers/example.ts",
  );

  const copySrcDest: [string, string][] = [
    [apiHandlerSrc, apiHandlerDest],
    [trpcSrc, trpcDest],
    [rootRouterSrc, rootRouterDest],
    [exampleRouterSrc, exampleRouterDest],
  ];

  if (appRouter) {
    const trpcDir = path.join(extrasDir, "src/trpc");
    copySrcDest.push(
      [
        path.join(trpcDir, "server.ts"),
        path.join(projectDir, "src/trpc/server.ts"),
      ],
      [
        path.join(trpcDir, "client.ts"),
        path.join(projectDir, "src/trpc/client.ts"),
      ],
      [
        path.join(trpcDir, "shared.ts"),
        path.join(projectDir, "src/trpc/shared.ts"),
      ],
    );
  } else {
    const utilsSrc = path.join(extrasDir, "src/utils/api.ts");
    const utilsDest = path.join(projectDir, "src/utils/api.ts");
    copySrcDest.push([utilsSrc, utilsDest]);
  }

  copySrcDest.forEach(([src, dest]) => {
    fs.copySync(src, dest);
  });

  // fs.copySync(apiHandlerSrc, apiHandlerDest);
  // fs.copySync(utilsSrc, utilsDest);
  // fs.copySync(trpcSrc, trpcDest);
  // fs.copySync(rootRouterSrc, rootRouterDest);
  // fs.copySync(exampleRouterSrc, exampleRouterDest);
};
