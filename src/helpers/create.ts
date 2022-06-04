import path from "path";
import fs from "fs-extra";
import getPkgManager from "./getPkgManager";
import chalk from "chalk";

const createProject = (projectName: string, usingPrisma: boolean) => {
  const srcDir = `${path.resolve(__dirname)}/../../${
    usingPrisma ? "template-prisma" : "template"
  }`;
  const projectDir = `./${projectName}`;

  const pkgManager = getPkgManager();

  if (fs.existsSync(projectDir)) {
    console.log(
      chalk.redBright.bold(projectName) + chalk.red(" already exists.")
    );
    process.exit(1);
  }

  fs.copySync(srcDir, projectDir);

  console.log(
    chalk.cyan.bold(projectName) + chalk.green(" created successfully.")
  );
  console.log("Next steps:");
  console.log("  cd " + chalk.cyan.bold(projectName));
  console.log(`  ${pkgManager} install`);

  if (usingPrisma) {
    console.log(`  ${pkgManager} prisma db push`);
  }

  if (pkgManager !== "npm") {
    console.log(`  ${pkgManager} dev`);
  } else {
    console.log("  npm run dev");
  }
};

export default createProject;
