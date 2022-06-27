import type { PackageManager } from "../utils/getUserPkgManager";
import { nextAuthInstaller } from "./next-auth";
import { prismaInstaller } from "./prisma";
import { tailwindInstaller } from "./tailwind";
import { trpcInstaller } from "./trpc";

export type AvailablePackages = "nextAuth" | "prisma" | "tailwind" | "trpc";

export type Packages = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

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
