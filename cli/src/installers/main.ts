import { dbContainerInstaller } from "./dbContainer.js";
import {
  dependencyVersionMap,
  type AvailableDependencies,
} from "./dependencyVersionMap.js";
import { drizzleInstaller } from "./drizzle.js";
import { envVariablesInstaller } from "./envVars.js";
import { dynamicEslintInstaller } from "./eslint.js";
import {
  availablePackages,
  buildPkgInstallerMap,
  databaseProviders,
  InstallerOptions,
  type AvailablePackages,
  type DatabaseProvider,
  type Installer,
  type PkgInstallerMap,
} from "./index.js";
import { nextAuthInstaller } from "./nextAuth.js";
import { prismaInstaller } from "./prisma.js";
import { tailwindInstaller } from "./tailwind.js";
import { trpcInstaller } from "./trpc.js";

export {
  dbContainerInstaller,
  dependencyVersionMap,
  type AvailableDependencies,
  drizzleInstaller,
  envVariablesInstaller,
  dynamicEslintInstaller,
  availablePackages,
  buildPkgInstallerMap,
  databaseProviders,
  InstallerOptions,
  type AvailablePackages,
  type DatabaseProvider,
  type Installer,
  type PkgInstallerMap,
  nextAuthInstaller,
  prismaInstaller,
  tailwindInstaller,
  trpcInstaller,
};
