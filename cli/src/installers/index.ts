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
export type TRPCVersion = "9" | "10";
/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.12.3",
  "@next-auth/prisma-adapter": "^1.0.4",

  // Prisma
  prisma: "^4.4.0",
  "@prisma/client": "^4.4.0",

  // TailwindCSS
  tailwindcss: "^3.1.6",
  autoprefixer: "^10.4.7",
  postcss: "^8.4.14",
  prettier: "^2.7.1",
  "prettier-plugin-tailwindcss": "^0.1.13",
  superjson: "1.9.1",
} as const;

export const getDependencyVersionMap = (trpcVersion?: TRPCVersion) =>
  ({
    ...dependencyVersionMap,
    "@trpc/client": getTrpcVersion(trpcVersion),
    "@trpc/server": getTrpcVersion(trpcVersion),
    "@trpc/react": getTrpcVersion(trpcVersion),
    "@trpc/next": getTrpcVersion(trpcVersion),
    "@tanstack/react-query": "^4.10.0",
    superjson: "1.9.1",
  } as const);

export const getTrpcVersion = (version?: TRPCVersion) =>
  version === "9" ? "9.27.2" : "10.0.0-proxy-beta.17";

export type AvailableDependencies = keyof ReturnType<
  typeof getDependencyVersionMap
>;
export interface InstallerOptions {
  projectDir: string;
  pkgManager: PackageManager;
  noInstall: boolean;
  packages?: PkgInstallerMap;
  projectName?: string;
}

export type Installer = (opts: InstallerOptions) => void;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: pkg extends "trpc"
    ? { version?: TRPCVersion; inUse: boolean; installer: Installer }
    : {
        inUse: boolean;
        installer: Installer;
      };
};

export const buildPkgInstallerMap = (
  packages: AvailablePackages[],
  trpc: boolean | TRPCVersion,
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
    version: typeof trpc === "boolean" ? (trpc ? "10" : undefined) : trpc,
  },
  envVariables: {
    inUse: packages.includes("prisma") || packages.includes("nextAuth"),
    installer: envVariablesInstaller,
  },
});
