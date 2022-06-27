import type { PackageManager } from "../utils/getUserPkgManager";
import { nextAuthInstaller } from "./next-auth";
import { prismaInstaller } from "./prisma";
import { tailwindInstaller } from "./tailwind";
import { trpcInstaller } from "./trpc";

// Turning this into a const allows the list to be iterated over for programatically creating prompt options
export const availablePackages = [
  "nextAuth",
  "prisma",
  "tailwind",
  "trpc",
] as const;

export type AvailablePackages = typeof availablePackages[number];

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
