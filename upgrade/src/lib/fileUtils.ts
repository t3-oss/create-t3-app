import { exec } from "child_process";
import fs from "fs";
import path from "path";
import {
  arrangements,
  extractVersionsAndFeatures,
  getFeaturesString,
  getT3Versions,
  type Features,
} from "./utils";

export interface DiffLocation {
  currentVersion: string;
  upgradeVersion: string;
  features: Features;
}

export const executeCommand = (command: string, options?: { cwd: string }) => {
  if (options?.cwd) {
    exec(`cd ${options.cwd}`);
  }
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        console.error(error);
        reject(error);
        return;
      }
      resolve(stdout);
      console.log(stdout);
    });
  });
};

export const getDiffPath = ({
  currentVersion,
  upgradeVersion,
  features,
}: DiffLocation) => {
  const featuresString = getFeaturesString(features);
  return path.join(
    process.cwd(),
    "diffs",
    `diff-${currentVersion}-${upgradeVersion}${
      featuresString ? `-${featuresString}` : ""
    }.patch`
  );
};

export const getExistingDiffsMap = () => {
  const existingDiffs = fs.readdirSync(path.join(process.cwd(), "diffs"));

  const diffsMap: { [key: string]: boolean } = existingDiffs.reduce(
    (acc, diff) => {
      const versionsAndFeatures = extractVersionsAndFeatures(diff);

      if (!versionsAndFeatures) {
        return acc;
      }

      const { currentVersion, upgradeVersion, features } = versionsAndFeatures;

      const featuresString = getFeaturesString(features);

      return {
        ...acc,
        [`${currentVersion}..${upgradeVersion}${
          featuresString ? `-${featuresString}` : ""
        }`]: true,
      };
    },
    {}
  );

  return diffsMap;
};

export const getMissingDiffs = async (count: number) => {
  const t3Versions = await getT3Versions();
  const sortedT3Versions = t3Versions.sort((a, b) => {
    const aParts = a.split(".").map(Number);
    const bParts = b.split(".").map(Number);

    for (let i = 0; i < aParts.length; i++) {
      const aPart = aParts[i] as number;
      const bPart = bParts[i] as number;
      if (aPart > bPart) {
        return 1;
      } else if (aPart < bPart) {
        return -1;
      }
    }

    return 0;
  });

  const existingDiffsMap = getExistingDiffsMap();
  const newDiffsMap: { [key: string]: boolean } = {};

  const features = ["nextAuth", "prisma", "trpc", "tailwind"];

  for (let i = 0; i < sortedT3Versions.length; i++) {
    const currentVersion = sortedT3Versions[i] as string;
    for (let j = i + 1; j < sortedT3Versions.length; j++) {
      const upgradeVersion = sortedT3Versions[j] as string;
      const combinations = arrangements(features);

      const noFeaturesDiff = `${currentVersion}..${upgradeVersion}`;
      if (!existingDiffsMap[noFeaturesDiff]) {
        newDiffsMap[noFeaturesDiff] = true;
      }

      for (const combination of combinations) {
        const features: Features = {
          nextAuth: combination.includes("nextAuth"),
          prisma: combination.includes("prisma"),
          trpc: combination.includes("trpc"),
          tailwind: combination.includes("tailwind"),
        };

        const key = `${currentVersion}..${upgradeVersion}-${getFeaturesString(
          features
        )}`;

        if (existingDiffsMap[key]) {
          continue;
        }

        newDiffsMap[key] = true;
      }
    }
  }

  console.log(`Found ${Object.keys(newDiffsMap).length} new diffs`);

  const start = 0;
  const end = Math.min(count, Object.keys(newDiffsMap).length);

  return Object.keys(newDiffsMap).slice(start, end);
};
