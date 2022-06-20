import { tailwindInstaller } from "./tailwind";
import { trpcInstaller } from "./trpc";
import { prismaInstaller } from "./prisma";
import { nextAuthInstaller } from "./next-auth";

import type { PackageManager } from "../helpers/getPkgManager";
import type { Packages } from "../index";

export type Installer = (
  projectDir: string,
  packageManager: PackageManager,
  packages: Packages
) => Promise<void>;

export const installers = {
  tailwind: tailwindInstaller,
  trpc: trpcInstaller,
  prisma: prismaInstaller,
  nextAuth: nextAuthInstaller,
};
