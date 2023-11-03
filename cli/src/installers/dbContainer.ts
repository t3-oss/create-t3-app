import fs from "fs";
import path from "path";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";

export const dbContainerInstaller: Installer = ({
  projectDir,
  databaseProvider,
  projectName,
}) => {
  const scriptSrc = path.join(
    PKG_ROOT,
    `template/extras/start-database/${databaseProvider}.sh`
  );
  const scriptText = fs.readFileSync(scriptSrc, "utf-8");
  const scriptDest = path.join(projectDir, "start-database.sh");
  fs.writeFileSync(scriptDest, scriptText.replaceAll("project1", projectName));
  fs.chmodSync(scriptDest, "755");
};
