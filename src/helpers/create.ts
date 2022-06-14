import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs-extra";
import getPkgManager from "./getPkgManager";
import chalk from "chalk";

const execa = promisify(exec);

const createProject = async (projectName: string, usingPrisma: boolean) => {
  const srcDir = path.join(
    __dirname,
    "../../",
    usingPrisma ? "template-prisma" : "template"
  );

  const projectDir = path.resolve(process.cwd(), projectName);

  const pkgManager = getPkgManager();

  if (fs.existsSync(projectDir)) {
    console.log(
      chalk.redBright.bold(projectName) + chalk.red(" already exists.")
    );
    process.exit(1);
  }

  await fs.copy(srcDir, projectDir);

  try {
    await execa("git init");
    console.log(`${chalk.cyan.green("Finished")} initializing git`);
  } catch (error) {
    console.log(`${chalk.red.bold("Failed: ")} could not initialize git`);
  }

  await fs.rename(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore")
  );

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
