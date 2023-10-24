import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { type AvailableDependencies } from "./dependencyVersionMap.js";

export const drizzleInstaller: Installer = ({
  projectDir,
  packages,
  scopedAppName,
  databaseProvider,
}) => {
  const devPackages: AvailableDependencies[] = ["drizzle-kit", "dotenv-cli"];
  if (databaseProvider === "planetscale") devPackages.push("mysql2");
  if (databaseProvider === "postgres") devPackages.push("@types/pg");
  if (databaseProvider === "sqlite") devPackages.push("@types/better-sqlite3");
  if (databaseProvider === "neon") devPackages.push("pg");

  addPackageDependency({
    projectDir,
    dependencies: devPackages,
    devMode: true,
  });
  addPackageDependency({
    projectDir,
    dependencies: [
      "drizzle-orm",
      (
        {
          planetscale: "@planetscale/database",
          mysql: "mysql2",
          postgres: "pg",
          sqlite: "better-sqlite3",
          neon: "@neondatabase/serverless",
        } as const
      )[databaseProvider],
    ],
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
  const dbType = (
    {
      postgres: "pg",
      neon: "pg",
      sqlite: "sqlite",
      mysql: "mysql",
      planetscale: "mysql",
    } as const
  )[databaseProvider];
  configContent = configContent.replace("project1_*", `${scopedAppName}_*`);
  if (databaseProvider !== "mysql" && databaseProvider !== "planetscale") {
    configContent = configContent.replace(
      "mysql2",
      {
        postgres: "pg",
        neon: "pg",
        sqlite: "better-sqlite",
      }[databaseProvider]
    );
    schemaContent = schemaContent.replace(
      "drizzle-orm/mysql-core",
      `drizzle-orm/${dbType}-core`
    );
    schemaContent = schemaContent.replaceAll(
      "mysqlTableCreator",
      `${dbType}TableCreator`
    );
    schemaContent = schemaContent.replaceAll(".onUpdateNow()", "");
    if (dbType === "sqlite") {
      schemaContent = schemaContent.replace("  varchar,\n", "");
      schemaContent = schemaContent.replace("  bigint,\n", "");
      schemaContent = schemaContent.replace("  timestamp,\n", "");
      schemaContent = schemaContent.replaceAll("varchar", "text");
      schemaContent = schemaContent.replaceAll("bigint", "int");
      schemaContent = schemaContent.replace(
        /timestamp\("([a-zA-Z\-_]+)", { mode: "date" }\)/g,
        'int("$1", { mode: "timestamp_ms" })'
      );
      schemaContent = schemaContent.replace(
        /timestamp\("([a-zA-Z\-_]+)"\)/g,
        'int("$1", { mode: "timestamp" })'
      );
      schemaContent = schemaContent.replace(
        `timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  })`,
        'int("emailVerified", { mode: "timestamp" })'
      );
      schemaContent = schemaContent.replaceAll(
        ".primaryKey().autoincrement()",
        ".primaryKey({ autoIncrement: true })"
      );
    }
    if (dbType === "pg") {
      schemaContent = schemaContent.replace("  bigint,\n", "");
      schemaContent = schemaContent.replace(
        "  int,\n",
        "  integer as int,\n  serial,\n"
      );
      schemaContent = schemaContent.replace(
        'id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),',
        'id: serial("post_id").primaryKey(),'
      );
      schemaContent = schemaContent.replace("fsp: ", "precision: ");
    }
  }

  const clientSrc = path.join(
    extrasDir,
    `src/server/db/index-drizzle/with-${databaseProvider}.ts`
  );
  const clientDest = path.join(projectDir, "src/server/db/index.ts");

  // add db:push script to package.json
  const packageJsonPath = path.join(projectDir, "package.json");

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    "db:push": `dotenv drizzle-kit push:${dbType}`,
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
