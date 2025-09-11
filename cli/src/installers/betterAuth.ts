import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import  { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import  { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const betterAuthInstaller: Installer = ({
  projectDir,
  packages,
  databaseProvider,
  appRouter,
}) => {
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;

  const deps: AvailableDependencies[] = ["better-auth"];
  if (usingPrisma) deps.push("@auth/prisma-adapter");
  if (usingDrizzle) deps.push("@auth/drizzle-adapter");

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const isAppRouter = appRouter ?? true; // Default to app router if not specified

  const apiHandlerFile = isAppRouter
    ? "src/app/api/auth/[...all]/route.ts"
    : "src/pages/api/auth/[...all].ts";

  const apiHandlerSrc = path.join(extrasDir, apiHandlerFile);
  const apiHandlerDest = path.join(projectDir, apiHandlerFile);

  const authConfigSrc = path.join(
    extrasDir,
    "src/server/better-auth/config",
    usingPrisma
      ? "with-prisma.ts"
      : usingDrizzle
        ? "with-drizzle.ts"
        : "base.ts"
  );
  const authConfigDest = path.join(
    projectDir,
    "src/server/better-auth/config.ts"
  );

  const authIndexSrc = path.join(extrasDir, "src/server/better-auth/index.ts");
  const authIndexDest = path.join(
    projectDir,
    "src/server/better-auth/index.ts"
  );

  // Better Auth client and server helpers
  const betterAuthClientSrc = path.join(
    extrasDir,
    "src/server/better-auth/client.ts"
  );
  const betterAuthClientDest = path.join(
    projectDir,
    "src/server/better-auth/client.ts"
  );
  const betterAuthServerSrc = path.join(
    extrasDir,
    "src/server/better-auth/server.ts"
  );
  const betterAuthServerDest = path.join(
    projectDir,
    "src/server/better-auth/server.ts"
  );

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(authConfigSrc, authConfigDest);
  fs.copySync(authIndexSrc, authIndexDest);
  fs.copySync(betterAuthClientSrc, betterAuthClientDest);
  fs.copySync(betterAuthServerSrc, betterAuthServerDest);

  // Update Better Auth adapter provider according to selected DB
  try {
    if (fs.pathExistsSync(authConfigDest)) {
      const content = fs.readFileSync(authConfigDest, "utf8");

      // Map CLI database provider to adapter provider strings
      const providerForDrizzle = (db: string) => {
        switch (db) {
          case "postgres":
            return "pg";
          case "mysql":
          case "planetscale":
            return "mysql";
          case "sqlite":
            return "sqlite";
          default:
            return "pg";
        }
      };

      const providerForPrisma = (db: string) => {
        switch (db) {
          case "postgres":
            return "postgresql";
          case "mysql":
          case "planetscale":
            return "mysql";
          case "sqlite":
            return "sqlite";
          default:
            return "postgresql";
        }
      };

      const providerValue = usingPrisma
        ? providerForPrisma(databaseProvider)
        : usingDrizzle
          ? providerForDrizzle(databaseProvider)
          : undefined;

      if (providerValue) {
        const updated = content.replace(
          /(provider:\s*")[^"]+("\s*,?)/,
          `$1${providerValue}$2`
        );
        fs.writeFileSync(authConfigDest, updated, "utf8");
      }
    }
  } catch {
    // Non-fatal: leave default provider from template
  }
};
