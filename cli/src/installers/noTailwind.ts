import type { Installer } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";

export const noTailwindInstaller: Installer = async ({ projectDir }) => {
  const noTwAssetDir = path.join(PKG_ROOT, "template/addons/no-tailwind");

  const noTwCssSrc = path.join(noTwAssetDir, "index.module.css");
  const noTwCssDest = path.join(projectDir, "src/pages/index.module.css");

  await fs.copy(noTwCssSrc, noTwCssDest);
};
