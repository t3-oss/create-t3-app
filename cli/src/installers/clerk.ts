import { type Installer } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const clerkInstaller: Installer = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["@clerk/nextjs"],
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const middlewareSrc = path.join(extrasDir, "src/middleware/with-clerk.ts");
  const middlewareDest = path.join(projectDir, "src/middleware.ts");

  fs.copySync(middlewareSrc, middlewareDest);
};
