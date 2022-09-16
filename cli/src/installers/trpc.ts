import type { Installer } from "~/installers/index.js";
import { deletePatches, generatePatches } from "~/utils/git.js";
import fs from "fs-extra";
import { Patch } from "~/utils/patch.js";

export const trpcInstaller: Installer = async ({
  projectDir,
  packagesInUse,
}) => {
  if (packagesInUse.includes("nextAuth")) {
    // We are applying those commits in the nextAuth installer.
    return;
  }

  await generatePatches("trpc", projectDir);
  const patchesFolder = `${projectDir}/patches`;

  if (packagesInUse.includes("tailwind")) {
    await generatePatches("trpc+tailwind", projectDir);
  }

  const patches = fs
    .readdirSync(patchesFolder)
    .map((file) => new Patch(file, packagesInUse));

  for (const patch of patches) {
    await patch.apply(projectDir);
  }

  await deletePatches(projectDir);
};
