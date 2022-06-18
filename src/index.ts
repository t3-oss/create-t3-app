#!/usr/bin/env node

import chalk from "chalk";
import prompts, { type PromptObject } from "prompts";

import createProject from "./helpers/create";

const DEFAULT_PROJECT_NAME = "my-t3-app";

const promts: PromptObject[] = [
  {
    name: "name",
    type: "text",
    message: "What will your project be called?",
    format: (name: string) => {
      if (name === "") {
        console.log(chalk.yellow(`Using default name: ${DEFAULT_PROJECT_NAME}`));
        return DEFAULT_PROJECT_NAME;
      }
      return name.trim();
     },
  },
  {
    name: "language",
    type: "select",
    message: "Will you be using JavaScript or TypeScript?",
    instructions: false,
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
    format: (language: string) => {
      if (language === "javascript") {
        console.log(chalk.red("Wrong answer, using TypeScript instead..."));
      } else {
        console.log(chalk.green("Good choice! Using TypeScript!"));
      }
      return "typescript";
    }
  },
  {
    name: "packages",
    type: "multiselect",
    message: "Which packages will you be using?",
    hint: "- Space to select, Return to submit",
    instructions: false,
    choices: [
      {
        title: "Next Auth",
        value: "next-auth",
      },
      {
        title: "Prisma",
        value: "prisma",
      },
    ]
  }
];

(async () => {
  console.log(chalk.red("Welcome to the create-t3-app !"));

  const { name, packages } = await prompts(promts);

  // TODO: It should probably be createProject's responsiblity to interpret the `packages` array
  const usingPrisma = packages.some((p: string) => p === "prisma");
  const usingNextAuth = packages.some((p: string) => p === "next-auth");

  await createProject(name, usingPrisma, usingNextAuth);

  process.exit(0);
})();
