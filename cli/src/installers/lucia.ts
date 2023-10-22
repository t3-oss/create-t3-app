import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const luciaInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
  scopedAppName,
}) => {
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;
  const usingDB = usingPrisma || usingDrizzle;

  const deps: AvailableDependencies[] = ["lucia", "@lucia-auth/oauth"];
  if (usingPrisma) deps.push("@lucia-auth/adapter-prisma");
  if (usingDrizzle) deps.push("@lucia-auth/adapter-mysql");

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const tsDefinitionFile = "lucia-auth.d.ts";

  const signInFile = appRouter
    ? "src/app/api/auth/discord/signin/route.ts"
    : "src/pages/api/auth/discord/signin.ts";
  const callbackFile = appRouter
    ? "src/app/api/auth/discord/callback/route.ts"
    : "src/pages/api/auth/discord/callback.ts";
  const logOutFile = appRouter
    ? "src/app/api/auth/logout/route.ts"
    : "src/pages/api/auth/logout.ts";

  const signInSrc = path.join(extrasDir, signInFile);
  const signInDest = path.join(projectDir, signInFile);
  const callbackSrc = path.join(extrasDir, callbackFile);
  const callbackDest = path.join(projectDir, callbackFile);
  const logOutSrc = path.join(extrasDir, logOutFile);
  const logOutDest = path.join(projectDir, logOutFile);

  const tsDefinitionSrc = path.join(extrasDir, tsDefinitionFile);
  const tsDefinitionDest = path.join(projectDir, tsDefinitionFile);

  const authConfigSrc = path.join(
    extrasDir,
    "src/server",
    appRouter ? "lucia-app" : "lucia-pages",
    usingPrisma
      ? "with-prisma.ts"
      : usingDrizzle
      ? "with-drizzle.ts"
      : "base.ts"
  );
  const authConfigDest = path.join(projectDir, "src/server/auth.ts");

  let authConfigContent = fs.readFileSync(authConfigSrc, "utf-8");
  if (usingDrizzle)
    for (const table of ["user", "key", "session"]) {
      authConfigContent = authConfigContent.replace(
        `project1_${table}`,
        `${scopedAppName}_${table}`
      );
    }
  fs.mkdirSync(path.dirname(authConfigDest), { recursive: true });
  fs.writeFileSync(authConfigDest, authConfigContent);

  const copySrcDest: [string, string][] = [
    [signInSrc, signInDest],
    [callbackSrc, callbackDest],
    [logOutSrc, logOutDest],
    [tsDefinitionSrc, tsDefinitionDest],
  ];

  if (!usingDB) {
    const sqlSchemaSrc = path.join(extrasDir, "schema.sql");
    const sqlSchemaDest = path.join(projectDir, "schema.sql");
    copySrcDest.push([sqlSchemaSrc, sqlSchemaDest]);
    addPackageDependency({
      dependencies: ["better-sqlite3", "@lucia-auth/adapter-sqlite"],
      devMode: false,
      projectDir,
    });
    addPackageDependency({
      dependencies: ["@types/better-sqlite3"],
      devMode: true,
      projectDir,
    });
  }

  copySrcDest.forEach(([src, dest]) => {
    fs.copySync(src, dest);
  });
};
