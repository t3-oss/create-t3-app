import path from "path";
import fs from "fs-extra";

export const createProject = (projectName: string) => {
  const srcDir = `${path.resolve(__dirname)}/../../template`;
  const projectDir = `./${projectName}`;

  if (fs.existsSync(projectDir)) {
    throw new Error(`${projectName} already exists.`);
  }

  fs.copy(srcDir, projectDir);

  console.log(`${projectName} created successfully.`);
};
