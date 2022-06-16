#!/usr/bin/env node

import chalk from "chalk";
import prompts from "prompts";

import createProject from "./helpers/create";

const promptOne = [
  {
    type: "text",
    name: "name",
    message: "What will your project be called?",
  },
];

const promptTwo = {
  type: "select",
  name: "language",
  message: "Will you be using JavaScript or TypeScript?",
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
};

const promptThree = {
  type: "toggle",
  name: "usingPrisma",
  message: "Would you like to use Prisma?",
  initial: true,
  active: "Yes",
  inactive: "No",
};

(async () => {
  const returnValues = await Promise.all([
    prompts(promptOne as any),
    prompts(promptTwo as any),
  ]);

  const language = returnValues[1].language;
  const name = returnValues[0].name;

  console.log(language, name);

  if (language === "javascript") {
    console.log(
      "\n" +
        chalk.bold.underline(
          "Wrong answer. Using",
          chalk.blue("TypeScript ") + "instead.\n\n",
        ),
    );
  } else {
    console.log(chalk.bold.underline("\nGood choice!"));
  }

  const thirdPrompt = await prompts(promptThree as any);
  const usingPrisma = thirdPrompt.usingPrisma;

  await createProject(name, usingPrisma);

  process.exit(0);
})();
