import { nextAuthInstaller } from "~/installers/nextAuth.js";
import { prismaInstaller } from "~/installers/prisma.js";
import { CliFlags } from "~/cli/index.js";
import { tailwindInstaller } from "~/installers/tailwind.js";
import { trpcInstaller } from "~/installers/trpc.js";
import { BlockedPatches } from "~/utils/patch.js";

// Turning this into a const allows the list to be iterated over for programatically creating prompt options
// Should increase extensability in the future
export const availablePackages = [
  "nextAuth",
  "prisma",
  "tailwind",
  "trpc",
] as const;
export type AvailablePackages = typeof availablePackages[number];
export type BranchNames =
  | `${AvailablePackages}`
  | `${AvailablePackages}+${AvailablePackages}`
  | `${AvailablePackages}+${AvailablePackages}+${AvailablePackages}`;
export type Branches =
  | AvailablePackages
  | `${BlockedPatches["package"]}+${BlockedPatches["blockedBy"][number]}`;

export interface InstallerOptions {
  projectDir: string;
  packagesInUse: AvailablePackages[];
}

export type Installer = (opts: InstallerOptions) => Promise<void>;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const flagsToPackagesInUse = (flags: CliFlags): AvailablePackages[] => {
  const packagesInUse: AvailablePackages[] = [];

  for (const pkg of availablePackages) {
    if (!flags[pkg]) continue;
    packagesInUse.push(pkg);
  }

  return packagesInUse;
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
