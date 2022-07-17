import type { PackageManager } from "../utils/getUserPkgManager.js";
import type { CurriedRunPkgManagerInstallOptions } from "../utils/runPkgManagerInstall.js";
import { envVariblesInstaller } from "./envVars.js";
import { nextAuthInfo, nextAuthInstaller } from "./next-auth.js";
import { prismaInfo, prismaInstaller } from "./prisma.js";
import { tailwindInfo, tailwindInstaller } from "./tailwind.js";
import { trpcInfo, trpcInstaller } from "./trpc.js";

// Turning this into a const allows the list to be iterated over for programatically creating prompt options
// Should increase extensability in the future
export const availablePackages = [
  "nextAuth",
  "prisma",
  "tailwind",
  "trpc",
  "envVaribles",
] as const;

export type AvailablePackages = typeof availablePackages[number];

export interface InstallerOptions {
  projectDir: string;
  pkgManager: PackageManager;
  noInstall: boolean;
  packages?: PkgInstallerMap;
  projectName?: string;
  runPkgManagerInstall: (
    opts: CurriedRunPkgManagerInstallOptions,
  ) => Promise<void>;
}

export type Installer = (opts: InstallerOptions) => Promise<void>;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
    info?: PackageInfo;
  };
};

export type PackageInfo = {
  name: string;
  description: string;
  URL: string;
};

export const buildPkgInstallerMap = (
  packages: AvailablePackages[],
): PkgInstallerMap => ({
  nextAuth: {
    inUse: packages.includes("nextAuth"),
    installer: nextAuthInstaller,
    info: nextAuthInfo,
  },
  prisma: {
    inUse: packages.includes("prisma"),
    installer: prismaInstaller,
    info: prismaInfo,
  },
  tailwind: {
    inUse: packages.includes("tailwind"),
    installer: tailwindInstaller,
    info: tailwindInfo,
  },
  trpc: {
    inUse: packages.includes("trpc"),
    installer: trpcInstaller,
    info: trpcInfo,
  },
  envVaribles: {
    inUse: packages.includes("prisma") || packages.includes("nextAuth"),
    installer: envVariblesInstaller,
  },
});
