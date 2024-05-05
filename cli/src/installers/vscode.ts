import fs from "fs-extra";

import { type Installer } from "~/installers/index.js";

export const vscodeInstaller: Installer = ({ projectDir }) => {
  fs.copySync("cli/template/extras/config/.vscode", projectDir + "/.vscode");
};
