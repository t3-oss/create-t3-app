import type { Installer, AvailableDependencies } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const nextAuthInstaller: Installer = ({ projectDir, packages }) => {
  const deps: AvailableDependencies[] = ["next-auth"];
  if (packages?.prisma.inUse) deps.push("@next-auth/prisma-adapter");

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const nextAuthAssetDir = path.join(PKG_ROOT, "template/addons/next-auth");

  const apiHandlerSrc = path.join(
    nextAuthAssetDir,
    packages?.prisma.inUse ? "api-handler-prisma.ts" : "api-handler.ts",
  );
  const apiHandlerDest = path.join(
    projectDir,
    "src/pages/api/auth/[...nextauth].ts",
  );

  const getServerAuthSessionSrc = path.join(
    nextAuthAssetDir,
    "get-server-auth-session.ts",
  );
  const getServerAuthSessionDest = path.join(
    projectDir,
    "src/server/common/get-server-auth-session.ts",
  );

  const restrictedApiSrc = path.join(nextAuthAssetDir, "restricted.ts");
  const restrictedApiDest = path.join(
    projectDir,
    "src/pages/api/restricted.ts",
  );

  const nextAuthDefinitionSrc = path.join(nextAuthAssetDir, "next-auth.d.ts");
  const nextAuthDefinitionDest = path.join(
    projectDir,
    "src/types/next-auth.d.ts",
  );

  // FIXME: temp fix for next-auth with node 18
  // see: https://github.com/nextauthjs/next-auth/issues/4575
  const npmrcSrc = path.join(nextAuthAssetDir, "_npmrc");
  const npmrcDest = path.join(projectDir, ".npmrc");
  const yarnrcSrc = path.join(nextAuthAssetDir, "_yarnrc");
  const yarnrcDest = path.join(projectDir, ".yarnrc");
  fs.copySync(npmrcSrc, npmrcDest);
  fs.copySync(yarnrcSrc, yarnrcDest);

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(getServerAuthSessionSrc, getServerAuthSessionDest);
  fs.copySync(restrictedApiSrc, restrictedApiDest);
  fs.copySync(nextAuthDefinitionSrc, nextAuthDefinitionDest);
};
