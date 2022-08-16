import type { Installer } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";

export const nextAuthInstaller: Installer = async ({
  projectDir,
  runPkgManagerInstall,
  packages,
}) => {
  await runPkgManagerInstall({
    packages: [
      // FIXME: temp fix for `next-auth@^4.11` requiring `next@12.2.5` as a peer dependency
      "next-auth@~4.10.3",
      packages?.prisma.inUse ? "@next-auth/prisma-adapter" : "",
    ],
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

  await Promise.all([
    fs.copy(apiHandlerSrc, apiHandlerDest),
    fs.copy(getServerAuthSessionSrc, getServerAuthSessionDest),
    fs.copy(restrictedApiSrc, restrictedApiDest),
    fs.copy(nextAuthDefinitionSrc, nextAuthDefinitionDest),
  ]);
};
