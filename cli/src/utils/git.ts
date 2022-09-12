import { execa } from "execa";
import { TEMPLATE_URL } from "~/consts.js";
import { AvailablePackages } from "~/installers/index.js";
import { logger } from "~/utils/logger.js";

export const cloneScaffoldAndReturnPath = async (
  projectName: string,
): Promise<void> => {
  try {
    await execa("git", ["clone", TEMPLATE_URL, projectName]);
  } catch (error) {
    // TODO: A ton of things can go wrong here (like proxy errors, etc).
    console.error(error);
  }
};

export const generatePatches = async (
  packageName: AvailablePackages,
  path: string,
): Promise<void> => {
  try {
    // git checkout pkg/{packageName}
    await execa("git", ["checkout", `pkg/${packageName}`], {
      cwd: path,
    });

    // git format-patch main -o patches -U1
    // Creates a patch file of every commit that is not in main
    // `-o patches` specifies the output directory (patches)
    // `-U1` specifies the number of lines of context to include in the patch (1)
    await execa("git", ["format-patch", "main", "-o", "patches", "-U1"], {
      cwd: path,
    });

    // git checkout main
    await execa("git", ["checkout", "main"], {
      cwd: path,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const applyPatch = async (path: string, patchName: string) => {
  // git apply {path}/patches/{patchName}
  // Applies the patch file at {path}/patches/{patchName}
  try {
    await execa("git", ["am", `patches/${patchName}`], {
      cwd: path,
    });
  } catch (error) {
    logger.error(error);
  }
};
