import { envVariablesInstaller } from "~/installers/envVars.js";
import { tailwindInstaller } from "~/installers/tailwind.js";
import { type PackageManager } from "~/utils/getUserPkgManager.js";
import { basehubInstaller } from "./basehub.js";
import { creativeStackInstaller } from "./creativeStack.js";

export const creativeStackPackages = [
  "three",
  "@react-three/drei",
  "@react-three/fiber",
  "leva",
  "maath",
  "three-stdlib",
] as const;

// Turning this into a const allows the list to be iterated over for programatically creating prompt options
// Should increase extensability in the future
export const availablePackages = [
  "tailwind",
  "basehub",
  "envVariables",
  "creativeStack",
] as const;

export type AvailablePackages = (typeof availablePackages)[number];

export type CreativeStackPackages = (typeof creativeStackPackages)[number];
export interface InstallerOptions {
  projectDir: string;
  pkgManager: PackageManager;
  noInstall: boolean;
  packages?: PkgInstallerMap;
  appRouter?: boolean;
  projectName: string;
  scopedAppName: string;
}

export type Installer = (opts: InstallerOptions) => void;

export type PkgInstallerMap = {
  [pkg in AvailablePackages | "creativeStack"]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const buildPkgInstallerMap = (
  packages: AvailablePackages[]
): PkgInstallerMap => ({
  tailwind: {
    inUse: packages.includes("tailwind"),
    installer: tailwindInstaller,
  },
  basehub: {
    inUse: packages.includes("basehub"),
    installer: basehubInstaller,
  },
  creativeStack: {
    inUse: packages.includes("creativeStack"),
    installer: creativeStackInstaller,
  },
  envVariables: {
    inUse: true,
    installer: envVariablesInstaller,
  },
});
