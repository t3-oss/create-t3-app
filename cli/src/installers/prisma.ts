import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { type DatabaseProvider, type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { addPackageScript } from "~/utils/addPackageScript.js";

// Provider-specific dependency map
interface ProviderDependencies {
  adapter: AvailableDependencies;
  driver?: AvailableDependencies;
  types: AvailableDependencies[];
}

const providerDependencyMap: Record<DatabaseProvider, ProviderDependencies> = {
  postgres: {
    adapter: "@prisma/adapter-pg",
    driver: "pg",
    types: ["@types/pg"],
  },
  mysql: {
    adapter: "@prisma/adapter-mariadb",
    types: ["@types/node"],
  },
  sqlite: {
    adapter: "@prisma/adapter-better-sqlite3",
    types: ["@types/better-sqlite3"],
  },
  planetscale: {
    adapter: "@prisma/adapter-planetscale",
    driver: "@planetscale/database",
    types: ["@types/node"],
  },
};

export const prismaInstaller: Installer = ({
  projectDir,
  packages,
  pkgManager,
  databaseProvider,
}) => {
  // Install base Prisma v7 packages
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

  // Install dotenv-cli as dev dependency
  addPackageDependency({
    projectDir,
    dependencies: ["dotenv-cli"],
    devMode: true,
  });

  // Get provider-specific dependencies
  const providerDeps = providerDependencyMap[databaseProvider];

  // Install provider-specific adapter package
  addPackageDependency({
    projectDir,
    dependencies: [providerDeps.adapter],
    devMode: false,
  });

  // Install provider-specific driver package (if required)
  if (providerDeps.driver) {
    addPackageDependency({
      projectDir,
      dependencies: [providerDeps.driver],
      devMode: false,
    });
  }

  // Install provider-specific TypeScript types
  addPackageDependency({
    projectDir,
    dependencies: providerDeps.types,
    devMode: true,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  // Copy universal prisma.config.ts to project root
  const prismaConfigSrc = path.join(extrasDir, "config/prisma.config.ts");
  const prismaConfigDest = path.join(projectDir, "prisma.config.ts");
  fs.copySync(prismaConfigSrc, prismaConfigDest);

  const schemaBaseName = packages?.betterAuth.inUse
    ? "with-better-auth"
    : packages?.nextAuth.inUse
      ? "with-auth"
      : "base";
  const schemaSrc = path.join(
    extrasDir,
    "prisma/schema",
    `${schemaBaseName}${
      databaseProvider === "planetscale" ? "-planetscale" : ""
    }.prisma`
  );
  let schemaText = fs.readFileSync(schemaSrc, "utf-8");
  if (databaseProvider !== "sqlite") {
    schemaText = schemaText.replace(
      'provider = "sqlite"',
      `provider = "${
        {
          mysql: "mysql",
          postgres: "postgresql",
          planetscale: "mysql",
        }[databaseProvider]
      }"`
    );
    if (["mysql", "planetscale"].includes(databaseProvider)) {
      schemaText = schemaText.replace("// @db.Text", "@db.Text");
    }
  }
  const schemaDest = path.join(projectDir, "prisma/schema.prisma");
  fs.mkdirSync(path.dirname(schemaDest), { recursive: true });
  fs.writeFileSync(schemaDest, schemaText);

  // Select and copy correct db client template based on provider
  const dbClientTemplateMap: Record<DatabaseProvider, string> = {
    postgres: "src/server/db/db-prisma-postgres.ts",
    mysql: "src/server/db/db-prisma-mysql.ts",
    sqlite: "src/server/db/db-prisma-sqlite.ts",
    planetscale: "src/server/db/db-prisma-planetscale.ts",
  };

  const clientSrc = path.join(extrasDir, dbClientTemplateMap[databaseProvider]);
  const clientDest = path.join(projectDir, "src/server/db.ts");

  addPackageScript({
    projectDir,
    scripts: {
      "with-env": "dotenv -e .env --",
      postinstall: `SKIP_ENV_VALIDATION=1 ${pkgManager} run with-env prisma generate`,
      "db:push": `${pkgManager} run with-env prisma db push`,
      "db:studio": `${pkgManager} run with-env prisma studio`,
      "db:generate": `${pkgManager} run with-env prisma migrate dev`,
      "db:migrate": `${pkgManager} run with-env prisma migrate deploy`,
    },
  });

  fs.copySync(clientSrc, clientDest);
};
