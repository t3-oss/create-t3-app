import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const orpcInstaller: Installer = ({ projectDir, packages }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "@tanstack/react-query",
      "@tanstack/react-query-next-experimental",
      "@orpc/server",
      "@orpc/client",
      "@orpc/react-query",
    ],
    devMode: false,
  });

  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;
  const usingDb = usingPrisma === true || usingDrizzle === true;

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const routeHandlerFile = "src/app/api/orpc/[[...rest]]/route.ts";

  const apiHandlerSrc = path.join(extrasDir, routeHandlerFile);
  const apiHandlerDest = path.join(projectDir, routeHandlerFile);

  const orpcFile =
    usingAuth && usingDb
      ? "with-auth-db.ts"
      : usingAuth
        ? "with-auth.ts"
        : usingDb
          ? "with-db.ts"
          : "base.ts";
  const orpcSrc = path.join(extrasDir, "src/server/api", "orpc-app", orpcFile);
  const orpcDest = path.join(projectDir, "src/server/api/procedures.ts");

  const rootRouterSrc = path.join(extrasDir, "src/server/api/orpc-index.ts");
  const rootRouterDest = path.join(projectDir, "src/server/api/index.ts");

  const providerFileSrc = path.join(
    extrasDir,
    "src/app/providers/with-orpc.tsx"
  );
  const providerFileDest = path.join(projectDir, "src/app/providers.tsx");

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
    "src/server/api/routers/orpc-post",
    exampleRouterFile
  );
  const exampleRouterDest = path.join(
    projectDir,
    "src/server/api/routers/post.ts"
  );

  const copySrcDest: [string, string][] = [
    [apiHandlerSrc, apiHandlerDest],
    [orpcSrc, orpcDest],
    [rootRouterSrc, rootRouterDest],
    [providerFileSrc, providerFileDest],
    [exampleRouterSrc, exampleRouterDest],
  ];

  const orpcDir = path.join(extrasDir, "src/orpc");
  copySrcDest.push(
    [
      path.join(orpcDir, "client.ts"),
      path.join(projectDir, "src/orpc/client.ts"),
    ],
    [
      path.join(orpcDir, "context.ts"),
      path.join(projectDir, "src/orpc/context.ts"),
    ],
    [
      path.join(orpcDir, "query-client.ts"),
      path.join(projectDir, "src/orpc/query-client.ts"),
    ],
    [
      path.join(
        extrasDir,
        "src/app/_components",
        packages?.tailwind.inUse ? "post-orpc-tw.tsx" : "post-orpc.tsx"
      ),
      path.join(projectDir, "src/app/_components/post.tsx"),
    ]
  );
  copySrcDest.forEach(([src, dest]) => {
    fs.copySync(src, dest);
  });
};
