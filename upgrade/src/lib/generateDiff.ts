import fs from "fs";
import path from "path";
import { z } from "zod";
import { executeCommand, getDiffPath } from "./fileUtils";
import { getFeaturesString } from "./utils";

export const paramsSchema = z.object({
  currentVersion: z.string(),
  upgradeVersion: z.string(),
  features: z.object({
    nextAuth: z.boolean().optional(),
    prisma: z.boolean().optional(),
    trpc: z.boolean().optional(),
    tailwind: z.boolean().optional(),
  }),
});

type Params = z.infer<typeof paramsSchema>;

export default async function generateDiff(params: Params) {
  const { success } = paramsSchema.safeParse(params);
  if (!success) {
    return { error: "Invalid request body" };
  }
  const { currentVersion, upgradeVersion, features } =
    paramsSchema.parse(params);
  const featureFlags = Object.entries(features)
    .filter(([, value]) => value)
    .map(([key]) => `--${key}=true`)
    .join(" ");

  const diffPath = getDiffPath({ currentVersion, upgradeVersion, features });
  const featuresString = getFeaturesString(features);
  const diffDir = `/tmp/${currentVersion}..${upgradeVersion}${
    featuresString ? `-${featuresString}` : ""
  }`;
  const url = `/diff/${currentVersion}..${upgradeVersion}${
    featuresString ? `-${featuresString}` : ""
  }`;

  const currentProjectPath = path.join(diffDir, "current");
  const upgradeProjectPath = path.join(diffDir, "upgrade");

  // Make sure the directories don't exist
  await executeCommand(`rm -rf ${currentProjectPath}`);
  await executeCommand(`rm -rf ${upgradeProjectPath}`);

  // Configure git author
  await executeCommand(`
    git config --global user.email "t3-bot@example.com"
    git config --global user.name "T3 Bot"
  `);

  const getCommand = (version: string, path: string) =>
    `pnpm create t3-app@${version} ${path} --CI ${featureFlags} --noInstall`;

  if (fs.existsSync(diffPath)) {
    const differences = fs.readFileSync(diffPath, "utf8");

    return { differences, url };
  }

  try {
    await executeCommand(getCommand(currentVersion, currentProjectPath));
    await executeCommand(getCommand(upgradeVersion, upgradeProjectPath));

    // Git init the current project
    await executeCommand(`
      cd ${currentProjectPath} &&
      git init &&
      git add . &&
      git commit -m "Initial commit" &&
      cd ../
    `);

    // Move the upgrade project over the current project
    await executeCommand(
      `rsync -a --delete --exclude=.git/ ${upgradeProjectPath}/ ${currentProjectPath}/`
    );

    // Generate the diff
    await executeCommand(`
      cd ${currentProjectPath} &&
      git add . &&
      git diff --staged > ${diffPath} &&
      cd ../
    `);

    // Read the diff
    const differences = fs.readFileSync(diffPath, "utf8");

    await executeCommand(`rm -rf ${diffDir}`);

    // Send the diff back to the client
    return { differences, url };
  } catch (error) {
    return { error };
  }
}
