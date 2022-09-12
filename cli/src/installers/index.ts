import type { PackageManager } from "~/utils/getUserPkgManager.js";
import { nextAuthInstaller } from "~/installers/nextAuth.js";
import { prismaInstaller } from "~/installers/prisma.js";
import { tailwindInstaller } from "~/installers/tailwind.js";
import { trpcInstaller } from "~/installers/trpc.js";

// Turning this into a const allows the list to be iterated over for programatically creating prompt options
// Should increase extensability in the future
export const availablePackages = [
  "nextAuth",
  "prisma",
  "tailwind",
  "trpc",
] as const;
export type AvailablePackages = typeof availablePackages[number];

export type Patch = {
  file: string;
  package: AvailablePackages;
  blockedBy: AvailablePackages[];
};

export const blockedPatches: Patch[] = [
  {
    file: "0002-feat-prisma-updates-env-schema.patch",
    package: "prisma",
    blockedBy: ["nextAuth"],
  },
  {
    file: "0006-feat-prisma-adds-schema.patch",
    package: "prisma",
    blockedBy: ["nextAuth"],
  },
  {
    file: "0005-feat-tailwind-updates-index.tsx.patch",
    package: "tailwind",
    blockedBy: ["trpc"],
  },
  {
    file: "0005-feat-trpc-finishes-setup.patch",
    package: "trpc",
    blockedBy: ["nextAuth"],
  },
];

const isPatchBlocked = (patchFile: string) => {
  return blockedPatches.some(
    (patch) => patch.file === patchFile && patch.blockedBy.length > 0,
  );
};

/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.10.2",
  "@next-auth/prisma-adapter": "^1.0.4",

  // Prisma
  prisma: "^4.1.0",
  "@prisma/client": "^4.1.0",

  // TailwindCSS
  tailwindcss: "^3.1.6",
  autoprefixer: "^10.4.7",
  postcss: "^8.4.14",

  // tRPC
  "@trpc/client": "10.0.0-proxy-alpha.70",
  "@trpc/server": "10.0.0-proxy-alpha.70",
  "@trpc/react": "10.0.0-proxy-alpha.70",
  "@trpc/next": "10.0.0-proxy-alpha.70",
  "@tanstack/react-query": "^4.2.3",
  superjson: "^1.9.1",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;

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
