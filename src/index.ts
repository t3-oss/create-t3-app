#!/usr/bin/env node

import chalk from "chalk";
import prompts from "prompts";

import createProject from "./helpers/create";

const promptOne = {
  type: "text",
  name: "name",
  message: "What will your project be called?",
};

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

const promptFour = {
  type: "toggle",
  name: "useNextAuth",
  message: "Would you like to use next-auth?",
  initial: true,
  active: "Yes",
  inactive: "No",
};

(async () => {
  console.log(chalk.red("Welcome to the create-t3-app !"));

  const { name }: { name: string } = await prompts(promptOne as any);
  const { language }: { language: string } = await prompts(promptTwo as any);

  if (language === "javascript") {
    console.log(
      `\n Wrong answer... Using ${chalk.blue("TypeScript")} instead. \n\n`
    );
  } else {
    console.log(`\n Good choice! Using ${chalk.blue(language)} \n\n`);
  }

  const { usingPrisma }: { usingPrisma: boolean } = await prompts(
    promptThree as any
  );

  let usingNextAuth = false;

  if (usingPrisma) {
    const { useNextAuth } = await prompts(promptFour as any);
    usingNextAuth = useNextAuth;
  }

  await createProject(name, usingPrisma, usingNextAuth);

  process.exit(0);
})();
