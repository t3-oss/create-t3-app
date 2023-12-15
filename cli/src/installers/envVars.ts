import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";

export const envVariablesInstaller: Installer = ({ projectDir, packages }) => {
  const usingAuth = packages?.nextAuth.inUse;

  const envContent = getEnvContent(!!usingAuth);

  const envFile = usingAuth ? "with-auth.js" : "";

  if (envFile !== "") {
    const envSchemaSrc = path.join(
      PKG_ROOT,
      "template/extras/src/env",
      envFile
    );
    const envSchemaDest = path.join(projectDir, "src/env.js");
    fs.copySync(envSchemaSrc, envSchemaDest);
  }

  const envDest = path.join(projectDir, ".env");
  const envExampleDest = path.join(projectDir, ".env.example");

  fs.writeFileSync(envDest, envContent, "utf-8");
  fs.writeFileSync(envExampleDest, exampleEnvContent + envContent, "utf-8");
};

const getEnvContent = (usingAuth: boolean) => {
  let content = `
# When adding additional environment variables, the schema in "/src/env.js"
# should be updated accordingly.
`
    .trim()
    .concat("\n");

  if (usingAuth)
    content += `
# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
# NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
`;

  return content;
};

const exampleEnvContent = `
# Since the ".env" file is gitignored, you can use the ".env.example" file to
# build a new ".env" file when you clone the repo. Keep this file up-to-date
# when you add new variables to \`.env\`.

# This file will be committed to version control, so make sure not to have any
# secrets in it. If you are cloning this repo, create a copy of this file named
# ".env" and populate it with your secrets.
`
  .trim()
  .concat("\n\n");
