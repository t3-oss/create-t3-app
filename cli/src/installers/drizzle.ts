import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const drizzleInstaller: Installer = ({
  projectDir,
  packages,
  scopedAppName,
}) => {
  addPackageDependency({
    projectDir,
    dependencies: ["drizzle-kit", "dotenv-cli", "mysql2"],
    devMode: true,
  });
  addPackageDependency({
    projectDir,
    dependencies: ["drizzle-orm", "@planetscale/database"],
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const configFile = path.join(extrasDir, "config/drizzle.config.ts");
  const configDest = path.join(projectDir, "drizzle.config.ts");

  const schemaSrc = path.join(
    extrasDir,
    "src/server/db",
    packages?.nextAuth.inUse
      ? "drizzle-schema-auth.ts"
      : "drizzle-schema-base.ts"
  );
  const schemaDest = path.join(projectDir, "src/server/db/schema.ts");

  // Replace placeholder table prefix with project name
  let schemaContent = fs.readFileSync(schemaSrc, "utf-8");
  schemaContent = schemaContent.replace(
    "project1_${name}",
    `${scopedAppName}_\${name}`
  );
  let configContent = fs.readFileSync(configFile, "utf-8");
  configContent = configContent.replace("project1_*", `${scopedAppName}_*`);

  const clientSrc = path.join(extrasDir, "src/server/db/index-drizzle.ts");
  const clientDest = path.join(projectDir, "src/server/db/index.ts");

  // add db:push script to package.json
  const packageJsonPath = path.join(projectDir, "package.json");

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    "db:push": "dotenv drizzle-kit push:mysql",
    "db:studio": "dotenv drizzle-kit studio",
  };

  fs.copySync(configFile, configDest);
  fs.mkdirSync(path.dirname(schemaDest), { recursive: true });
  fs.writeFileSync(schemaDest, schemaContent);
  fs.writeFileSync(configDest, configContent);
  fs.copySync(clientSrc, clientDest);
  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  });
};
