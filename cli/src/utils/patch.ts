import { AvailablePackages } from "~/installers/index.js";
import { applyPatch } from "~/utils/git.js";

interface BlockedPatch {
  file: string;
  package: AvailablePackages;
  blockedBy: AvailablePackages[];
}

export const blockedPatches: BlockedPatch[] = [
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

export type BlockedPatches = typeof blockedPatches[number];

export class Patch {
  file: string;
  blockedBy: AvailablePackages[];

  constructor(file: string, blockedBy: AvailablePackages[] = []) {
    this.file = file;
    this.blockedBy = blockedBy;
  }

  isBlocked() {
    return blockedPatches.some((patch) => patch.file === this.file);
  }

  async apply(projectDir: string) {
    await applyPatch(projectDir, this.file);
  }
}
