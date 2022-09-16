import type { Installer } from "~/installers/index.js";
import { deletePatches, generatePatches } from "~/utils/git.js";
import fs from "fs-extra";
import { Patch } from "~/utils/patch.js";

export const tailwindInstaller: Installer = async ({
  projectDir,
  packagesInUse,
}) => {
  if (packagesInUse.includes("trpc")) {
    // We are applying those commits in the trpc installer.
    return;
  }

  await generatePatches("tailwind", projectDir);

  const patchesFolder = `${projectDir}/patches`;

  const patches = fs
    .readdirSync(patchesFolder)
    .map((file) => new Patch(file, packagesInUse));

  for (const patch of patches) {
    await patch.apply(projectDir);
  }

  await deletePatches(projectDir);
};
