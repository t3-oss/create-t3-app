import chalk from "chalk";
import prompts from "prompts";

import createProject from "./helpers/create";

const questions = [
  {
    type: "text",
    name: "name",
    message: "What is your project named?",
  },
  {
    type: "select",
    name: "language",
    message: "Do you want to use JavaScript or TypeScript?",
    choices: [
      {
        title: "JavaScript",
        value: "javascript",
      },
      {
        title: "TypeScript",
        value: "typescript",
      },
    ],
    initial: 0,
  },
];

(async () => {
  const response: { name: string; language: string } = await prompts(
    questions as any
  );
  const { name, language } = response;

  if (language === "javascript") {
    console.log(
      chalk.bold.underline(
        "Wrong answer. Using",
        chalk.blue("TypeScript ") + "instead.\n\n"
      )
    );
  } else {
    console.log(`Good choice!`);
  }

  createProject(name);

  process.exit(0);
})();
