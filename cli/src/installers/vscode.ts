import path from "path";
import fs from "fs-extra";

import { type Installer } from "~/installers/index.js";

const _vscodeSettingsPath = path.resolve(
  __dirname,
  "../../template/extras/config/.vscode"
);

export const vscodeInstaller: Installer = ({ projectDir }) => {
  fs.moveSync(_vscodeSettingsPath, path.join(projectDir, ".vscode"));
};
