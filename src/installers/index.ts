import { tailwindInstaller } from "./tailwind";
import { trpcInstaller } from "./trpc";
import { prismaInstaller } from "./prisma";
// import { nextAuthInstaller } from "./next-auth";

import type { Packages } from "../index";
import { PackageManager } from "../helpers/getPkgManager";

export type Installer = (
  projectDir: string,
  pkgManager: PackageManager,
  packages?: Packages
) => Promise<void>;
export type Installers = {
  [pkgName in keyof Packages]: Installer;
};

export const installers: Installers = {
  tailwind: tailwindInstaller,
  trpc: trpcInstaller,
  prisma: prismaInstaller,
  nextAuth: async () => void 0,
  // nextAuth: nextAuthInstaller,
};
