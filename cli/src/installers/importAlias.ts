import fs from "fs";
import glob from "glob";
import path from "path";
import type { Installer } from "~/installers/index.js";

export const importAliasInstaller: Installer = ({
  projectDir,
  importAlias,
}) => {
  const normalizedImportAlias = importAlias
    .replace(/\*/g, "") // remove any wildcards (~/* -> ~/)
    .replace(/[^\/]$/, "$&/"); // ensure trailing slash (@ -> ~/)

  // update import alias in any files if not using the default
  if (importAlias !== "~/") {
    const files = glob.sync("**/*", {
      cwd: projectDir,
      dot: true,
      nonull: true,
      ignore: ["node_modules/**", ".git/**"],
    });

    files.map((file) => {
      const filePath = path.join(projectDir, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.writeFileSync(
          filePath,
          fs
            .readFileSync(filePath, "utf8")
            .replace(`~/`, normalizedImportAlias),
        );
      }
    });
  }
};
