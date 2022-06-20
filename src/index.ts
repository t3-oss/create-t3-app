#!/usr/bin/env node
import prompts, { type PromptObject } from "prompts";
import { logger } from "./helpers/logger";
import { createProject } from "./helpers/create";
import { installers } from "./installers";

const DEFAULT_PROJECT_NAME = "my-t3-app";

type AvailablePackages = "tailwind" | "trpc" | "prisma" | "nextAuth";
export type Packages = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: (...args: any) => Promise<void>;
  };
};

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
        title: "TypeScript",
        value: "typescript",
      },
      {
        title: "JavaScript",
        value: "javascript",
      },
    ],
    format: (language: string) => {
      if (language === "javascript") {
        logger.error("Wrong answer, using TypeScript instead...");
      } else {
        logger.success("Good choice! Using TypeScript!");
      }
      return;
    },
  },
  {
    name: "useTailwind",
    type: "toggle",
    message: "Would you like to use Tailwind?",
    initial: true,
    active: "Yes",
    inactive: "No",
  },
  {
    name: "useTrpc",
    type: "toggle",
    message: "Would you like to use tRPC?",
    initial: true,
    active: "Yes",
    inactive: "No",
  },
  {
    name: "usePrisma",
    type: "toggle",
    message: "Would you like to use Prisma?",
    initial: true,
    active: "Yes",
    inactive: "No",
  },
  {
    name: "useNextAuth",
    // only show this prompt if usePrisma is true
    type: (prev) => (prev ? "toggle" : null),
    message: "Would you like to use Next Auth?",
    initial: true,
    active: "Yes",
    inactive: "No",
  },
];

(async () => {
  logger.error("Welcome to the create-t3-app !");

  // FIXME: Look into if the type can be inferred
  const { name, useTailwind, useTrpc, usePrisma, useNextAuth } = (await prompts(
    promts
  )) as {
    name: string;
    useTailwind: boolean;
    useTrpc: boolean;
    usePrisma: boolean;
    useNextAuth: boolean | undefined;
  };
  const useNextAuthBool = !!useNextAuth;

  const packages: Packages = {
    tailwind: { inUse: useTailwind, installer: installers.tailwind },
    trpc: { inUse: useTrpc, installer: installers.trpc },
    prisma: { inUse: usePrisma, installer: installers.prisma },
    nextAuth: { inUse: useNextAuthBool, installer: installers.nextAuth },
  };

  await createProject(name, packages);

  process.exit(0);
})();
