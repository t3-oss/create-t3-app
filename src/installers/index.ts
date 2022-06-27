import type { PackageManager } from "../utils/getUserPkgManager";
import { nextAuthInstaller } from "./next-auth";
import { prismaInstaller } from "./prisma";
import { tailwindInstaller } from "./tailwind";
import { trpcInstaller } from "./trpc";

// Turning this into a const allows the list to be iterated over for programatically creating prompt options
// Should increase extensability in the future
export const availablePackages = [
  "nextAuth",
  "prisma",
  "tailwind",
  "trpc",
] as const;

export type AvailablePackages = typeof availablePackages[number];

export type Installer = (
  projectDir: string,
  packageManager: PackageManager,
  packages: PkgInstallerMap,
) => Promise<void>;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const buildPkgInstallerMap = (
  packages: AvailablePackages[],
): PkgInstallerMap => ({
  nextAuth: {
    inUse: packages.includes("nextAuth"),
    installer: nextAuthInstaller,
  },
  prisma: {
    inUse: packages.includes("prisma"),
    installer: prismaInstaller,
  },
  tailwind: {
    inUse: packages.includes("tailwind"),
    installer: tailwindInstaller,
  },
  trpc: {
    inUse: packages.includes("trpc"),
    installer: trpcInstaller,
  },
});
