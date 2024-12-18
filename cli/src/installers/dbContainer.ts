import fs from "fs";
import path from "path";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { parseNameAndPath } from "~/utils/parseNameAndPath.js";

// Sanitizes a project name to ensure it adheres to Docker container naming conventions.
const sanitizeName = (name: string): string => {
  return name
    .replace(/[^a-zA-Z0-9_.-]/g, "_") // Replace invalid characters with underscores
    .toLowerCase(); // Convert to lowercase for consistency
};

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
  // for configuration with postgresql and mysql when project is created with '.' project name
  const [projectNameParsed] =
    projectName === "." ? parseNameAndPath(projectDir) : [projectName];

  // Sanitize the project name for Docker container usage
  const sanitizedProjectName = sanitizeName(projectNameParsed);

  fs.writeFileSync(
    scriptDest,
    scriptText.replaceAll("project1", sanitizedProjectName)
  );
  fs.chmodSync(scriptDest, "755");
};
