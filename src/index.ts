#!/usr/bin/env node

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
  {
    type: "toggle",
    name: "usingPrisma",
    message: "Would you like to use Prisma?",
    initial: true,
    active: "Yes",
    inactive: "No",
  },
];

type Response = { name: string; language: string; usingPrisma: boolean };

(async () => {
  const response: Response = await prompts(questions as any);
  const { name, language, usingPrisma } = response;

  if (language === "javascript") {
    console.log(
      "\n" +
        chalk.bold.underline(
          "Wrong answer. Using",
          chalk.blue("TypeScript ") + "instead.\n\n"
        )
    );
  } else {
    console.log(chalk.bold.underline("\nGood choice!"));
  }

  createProject(name, usingPrisma);

  process.exit(0);
})();
