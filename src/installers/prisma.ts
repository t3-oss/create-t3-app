import { installPkgs, type PackageManager } from "../helpers/getPkgManager";
import fs from "fs-extra";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execa = promisify(exec);

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

  const schemaFile = path.join(prismaAssetDir, "schema.prisma");
  const schemaDest = path.join(projectDir, "prisma/schema.prisma");
  await fs.copy(schemaFile, schemaDest);

  const clientFile = path.join(prismaAssetDir, "client.ts");
  const clientDest = path.join(projectDir, "src/server/prisma.ts");
  await fs.copy(clientFile, clientDest);

  if (pkgManager === "npm") {
    await execa("npx prisma generate");
  } else {
    await execa(`${pkgManager} prisma generate`, { cwd: projectDir });
  }
};
