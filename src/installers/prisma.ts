import { installPkgs, type PackageManager } from "../helpers/getPkgManager";
import fs from "fs-extra";
import path from "path";
import { execa } from "../helpers/execa";

export const prismaInstaller = async (
  projectDir: string,
  pkgManager: PackageManager
) => {
  await Promise.all([
    installPkgs(pkgManager, true, projectDir, ["prisma"]),
    installPkgs(pkgManager, false, projectDir, ["@prisma/client"]),
  ]);

  const prismaAssetDir = path.join(
    __dirname,
    "../../",
    "template/addons/prisma"
  );

  const schemaSrc = path.join(prismaAssetDir, "schema.prisma");
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

  if (pkgManager === "npm") {
    await execa("npx prisma generate");
  } else {
    await execa(`${pkgManager} prisma generate`, { cwd: projectDir });
  }
};
