import { tailwindInstaller } from "./tailwind";
import { trpcInstaller } from "./trpc";
import { prismaInstaller } from "./prisma";
import { nextAuthInstaller } from "./next-auth";

export const installers = {
  tailwind: tailwindInstaller,
  trpc: trpcInstaller,
  prisma: prismaInstaller,
  nextAuth: nextAuthInstaller,
};
