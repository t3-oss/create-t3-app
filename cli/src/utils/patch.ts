import { AvailablePackages } from "~/installers/index.js";
import { applyPatch } from "~/utils/git.js";

export class Patch {
  file: string;
  blockedBy: AvailablePackages[];

  constructor(file: string, blockedBy: AvailablePackages[] = []) {
    this.file = file;
    this.blockedBy = blockedBy;
  }

  async apply(projectDir: string) {
    await applyPatch(projectDir, this.file);
  }
}
