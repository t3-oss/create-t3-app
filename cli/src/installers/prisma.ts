import type { PackageJson } from "type-fest";
import type { Installer } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const prismaInstaller: Installer = ({ projectDir, packages }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["prisma"],
    devMode: true,
  });
  addPackageDependency({
    projectDir,
    dependencies: ["@prisma/client"],
    devMode: false,
  });

  const prismaAssetDir = path.join(PKG_ROOT, "template/addons/prisma");

  const schemaSrc = path.join(
    prismaAssetDir,
    packages?.nextAuth.inUse ? "auth-schema.prisma" : "schema.prisma",
  );
  const schemaDest = path.join(projectDir, "prisma/schema.prisma");

  const clientSrc = path.join(prismaAssetDir, "client.ts");
  const clientDest = path.join(projectDir, "src/server/db/client.ts");

  const sampleApiRouteSrc = path.join(prismaAssetDir, "sample-api.ts");
  const sampleApiRouteDest = path.join(projectDir, "src/pages/api/examples.ts");

  // add postinstall script to package.json
  const packageJsonPath = path.join(projectDir, "package.json");

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts!.postinstall = "prisma generate"; //eslint-disable-line @typescript-eslint/no-non-null-assertion

  fs.copySync(schemaSrc, schemaDest);
  fs.copySync(clientSrc, clientDest);
  fs.copySync(sampleApiRouteSrc, sampleApiRouteDest);
  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  });
};
