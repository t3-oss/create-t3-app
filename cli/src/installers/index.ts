import type { PackageManager } from "~/utils/getUserPkgManager.js";
import { envVariablesInstaller } from "~/installers/envVars.js";
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
  "envVariables",
] as const;
export type AvailablePackages = typeof availablePackages[number];

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
  "@trpc/client": "10.0.0-proxy-alpha.69",
  "@trpc/server": "10.0.0-proxy-alpha.69",
  "@trpc/react": "10.0.0-proxy-alpha.69",
  "@trpc/next": "10.0.0-proxy-alpha.69",
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

export type Installer = (opts: InstallerOptions) => void;

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
  envVariables: {
    inUse: packages.includes("prisma") || packages.includes("nextAuth"),
    installer: envVariablesInstaller,
  },
});
