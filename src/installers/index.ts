import type { PackageManager } from "../utils/getUserPkgManager.js";
import { envVariblesInstaller } from "./envVars.js";
import { nextAuthInstaller } from "./next-auth.js";
import { prismaInstaller } from "./prisma.js";
import { tailwindInstaller } from "./tailwind.js";
import { trpcInstaller } from "./trpc.js";
import { trpc10Installer } from "./trpc10.js";

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
}

export type Installer = (opts: InstallerOptions) => Promise<void>;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const buildPkgInstallerMap = (
  packages: AvailablePackages[],
  useTRPC10: boolean, // TODO: Remove when tPRC 10 is released
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
    // TODO: Remove when tPRC 10 is released
    installer: useTRPC10 ? trpc10Installer : trpcInstaller,
  },
  envVaribles: {
    inUse: true,
    installer: envVariblesInstaller,
  },
});
