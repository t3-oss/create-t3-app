import type { Installer } from "~/installers/index.js";
import { deletePatches, generatePatches } from "~/utils/git.js";
import fs from "fs-extra";
import { Patch } from "~/utils/patch.js";

export const nextAuthInstaller: Installer = async ({
  projectDir,
  packagesInUse,
}): Promise<void> => {
  await generatePatches("nextAuth", projectDir);
  const patchesFolder = `${projectDir}/patches`;

  if (packagesInUse.includes("prisma")) {
    await generatePatches("nextAuth+prisma", projectDir);
  }

  if (packagesInUse.includes("trpc")) {
    await generatePatches("nextAuth+trpc", projectDir);
  }

  // We can apply every patch on nextAuth because they don't conflict with anything.
  // (other packages that conflict with nextAuth)
  const patches = fs.readdirSync(patchesFolder).map((file) => new Patch(file));

  for (const patch of patches) {
    await patch.apply(projectDir);
  }

  await deletePatches(projectDir);
};
