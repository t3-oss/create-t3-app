import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/consts";
import { type Installer } from "~/installers/index";

// import defaultESlintConfig from "~/tesmplate/base/_eslintrc.cjs";
// import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const strictEsLintAndPrettier: Installer = ({
  projectDir,
  packages,
}) => {
  const usingTailwind = packages?.prisma.inUse;
  console.log(defaultESlintConfig);
  addPackageDependency({
    projectDir,
    dependencies: ["prettier", "@types/prettier"],
    devMode: true,
  });

  const eslintExtra = path.join(PKG_ROOT, "template/extras/src/.eslintrc.js");
  fs.copySync(eslintExtra, projectDir);
};

// const getEnvContent = (usingAuth: boolean, usingPrisma: boolean) => {
//   let content = `
// # When adding additional environment variables, the schema in "/src/env.mjs"
// # should be updated accordingly.
// `
//     .trim()
//     .concat("\n");
//
//   if (usingPrisma)
//     content += `
// # Prisma
// # https://www.prisma.io/docs/reference/database-reference/connection-urls#env
// DATABASE_URL="file:./db.sqlite"
// `;
//
//   if (usingAuth)
//     content += `
// # Next Auth
// # You can generate a new secret on the command line with:
// # openssl rand -base64 32
// # https://next-auth.js.org/configuration/options#secret
// # NEXTAUTH_SECRET=""
// NEXTAUTH_URL="http://localhost:3000"
//
// # Next Auth Discord Provider
// DISCORD_CLIENT_ID=""
// DISCORD_CLIENT_SECRET=""
// `;
//
//   if (!usingAuth && !usingPrisma)
//     content += `
// # Example:
// # SERVERVAR="foo"
// # NEXT_PUBLIC_CLIENTVAR="bar"
// `;
//
//   return content;
// };
//
// const exampleEnvContent = `
// # Since the ".env" file is gitignored, you can use the ".env.example" file to
// # build a new ".env" file when you clone the repo. Keep this file up-to-date
// # when you add new variables to \`.env\`.
//
// # This file will be committed to version control, so make sure not to have any
// # secrets in it. If you are cloning this repo, create a copy of this file named
// # ".env" and populate it with your secrets.
// `
//   .trim()
//
