#!/usr/bin/env node

import prompts, { type PromptObject } from "prompts";
import { logger } from "./helpers/logger";

import createProject from "./helpers/create";

const DEFAULT_PROJECT_NAME = "my-t3-app";

const promts: PromptObject[] = [
  {
    name: "name",
    type: "text",
    message: "What will your project be called?",
    format: (name: string) => {
      if (name === "") {
        logger.warn(`Using default name: ${DEFAULT_PROJECT_NAME}`);
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
        logger.error("Wrong answer, using TypeScript instead...");
      } else {
        logger.success("Good choice! Using TypeScript!");
      }
      return;
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
  logger.error("Welcome to the create-t3-app !");

  const { name, packages } = await prompts(promts) as { name: string, packages: string[]};

  // TODO: It should probably be createProject's responsiblity to interpret the `packages` array
  const usingPrisma = packages.some((p: string) => p === "prisma");
  const usingNextAuth = packages.some((p: string) => p === "next-auth");

  await createProject(name, usingPrisma, usingNextAuth);

  process.exit(0);
})();
