import { installPkgs } from "../helpers/getPkgManager";
import fs from "fs-extra";
import path from "path";
import { execa } from "../helpers/execa";
import type { Installer } from "../index";

export const prismaInstaller: Installer = async (
  projectDir,
  packageManager,
  packages
) => {
  await Promise.all([
    installPkgs(packageManager, true, projectDir, ["prisma"]),
    installPkgs(packageManager, false, projectDir, ["@prisma/client"]),
  ]);

  const prismaAssetDir = path.join(
    __dirname,
    "../../",
    "template/addons/prisma"
  );

  const schemaSrc = path.join(
    prismaAssetDir,
    packages?.nextAuth.inUse ? "auth-schema.prisma" : "schema.prisma"
  );
  const schemaDest = path.join(projectDir, "prisma/schema.prisma");

  const clientSrc = path.join(prismaAssetDir, "client.ts");
  const clientDest = path.join(projectDir, "src/server/db/client.ts");

  const sampleApiRouteSrc = path.join(prismaAssetDir, "sample-api.ts");
  const sampleApiRouteDest = path.join(projectDir, "src/pages/api/examples.ts");

  await Promise.all([
    fs.copy(schemaSrc, schemaDest),
    fs.copy(clientSrc, clientDest),
    fs.copy(sampleApiRouteSrc, sampleApiRouteDest),
  ]);

  if (packageManager === "npm") {
    await execa("npx prisma generate");
  } else {
    await execa(`${packageManager} prisma generate`, { cwd: projectDir });
  }
};
