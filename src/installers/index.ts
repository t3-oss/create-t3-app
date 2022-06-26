import type { Packages } from "../index";
import type { PackageManager } from "../utils/getUserPkgManager";
import { nextAuthInstaller } from "./next-auth";
import { prismaInstaller } from "./prisma";
import { tailwindInstaller } from "./tailwind";
import { trpcInstaller } from "./trpc";

export type Installer = (
  projectDir: string,
  packageManager: PackageManager,
  packages: Packages,
) => Promise<void>;

export const installers = {
  tailwind: tailwindInstaller,
  trpc: trpcInstaller,
  prisma: prismaInstaller,
  nextAuth: nextAuthInstaller,
};
