import type { Installer } from "~/installers/index.js";
import { applyPatch, generatePatches } from "~/utils/git.js";
import fs from "fs-extra";

export const nextAuthInstaller: Installer = async ({
  projectDir,
}): Promise<void> => {
  await generatePatches("nextAuth", projectDir);

  const patchesFolder = `${projectDir}/patches`;
  const patches = fs.readdirSync(patchesFolder);

  // We can apply every patch on nextAuth because they don't conflict with anything.
  // (other packages that conflict with nextAuth)
  for (const patch of patches) {
    await applyPatch(projectDir, patch);
  }
};
