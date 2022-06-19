import { type PackageManager } from "../helpers/getPkgManager";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs-extra";
import path from "path";

const execa = promisify(exec);

export const tailwindInstaller = async (
  projectDir: string,
  pkgManager: PackageManager
) => {
  await execa(`${pkgManager} install -D tailwindcss postcss autoprefixer`, {
    cwd: projectDir,
  });

  const twAssetDir = path.join(__dirname, "../../", "template/addons/tailwind");

  const twConfig = path.join(twAssetDir, "tailwind.config.js");
  const twDest = path.join(projectDir, "tailwind.config.js");
  await fs.copy(twConfig, twDest);

  const postcssConfig = path.join(twAssetDir, "postcss.config.js");
  const postcssDest = path.join(projectDir, "postcss.config.js");
  await fs.copy(postcssConfig, postcssDest);

  const cssFile = path.join(twAssetDir, "globals.css");
  const cssDest = path.join(projectDir, "src/styles/globals.css");
  await fs.copy(cssFile, cssDest);

  const indexFile = path.join(twAssetDir, "..", "page-examples/tailwind.tsx");
  const indexDest = path.join(projectDir, "src/pages/index.tsx");
  await fs.copy(indexFile, indexDest);
};
