import clsx, { type ClassValue } from "clsx";
import fetch from "node-fetch";
import {
  markEdits,
  tokenize as tokennizeReactDiffView,
  type HunkData,
} from "react-diff-view";
import refractor from "refractor";
import ts from "refractor/lang/typescript";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export const tokenize = (hunks: HunkData[]) => {
  if (!hunks) {
    return undefined;
  }

  refractor.register(ts);

  try {
    return tokennizeReactDiffView(hunks, {
      highlight: true,
      enhancers: [markEdits(hunks, { type: "block" })],
      language: "typescript",
      refractor,
    });
  } catch (e) {
    return undefined;
  }
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export type VersionsGroupedByMajor = Array<{
  major: string;
  versions: string[];
}>;

export const getT3Versions = async () => {
  const response = await fetch(
    "https://api.github.com/repos/t3-oss/create-t3-app/releases"
  );

  const responseSchema = z.array(z.object({ tag_name: z.string() }));
  const parsed = responseSchema.safeParse(await response.json());

  if (!parsed.success) {
    return [];
  }

  return parsed.data
    .map((release) => release.tag_name.split("@")[1] ?? "")
    .filter((v) => v !== "");
};

export const getT3VersionsGroupedByMajor = async () => {
  const actualVersions = await getT3Versions();

  const versionsGroupedByMajor: VersionsGroupedByMajor = [];

  actualVersions.forEach((version) => {
    const [major] = version.split(".");
    if (!major) return;

    const majorGroup = versionsGroupedByMajor.find(
      (group) => group.major === major
    );

    if (majorGroup) {
      majorGroup.versions.push(version);
    } else {
      versionsGroupedByMajor.push({
        major,
        versions: [version],
      });
    }
  });

  return versionsGroupedByMajor.sort(
    (a, b) => Number(b.major) - Number(a.major)
  );
};

export interface Features {
  nextAuth?: boolean;
  prisma?: boolean;
  trpc?: boolean;
  tailwind?: boolean;
}

export const getFeaturesString = (features: Features) => {
  return Object.entries(features)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join("-");
};

export const getFeatureUrl = (feature: string) => {
  if (feature === "nextAuth") {
    return "https://next-auth.js.org/";
  } else if (feature === "prisma") {
    return "https://www.prisma.io/";
  } else if (feature === "trpc") {
    return "https://trpc.io/";
  } else if (feature === "tailwind") {
    return "https://tailwindcss.com/";
  }
};

type VersionsRegex = {
  currentVersion: string;
  upgradeVersion: string;
};

export const extractVersionsAndFeatures = (slug: string) => {
  const regex =
    /(?<currentVersion>\d+\.\d+\.\d+).*(?<upgradeVersion>\d+\.\d+\.\d+)/;
  const match =
    (slug.match(regex) as RegExpMatchArray & {
      groups: VersionsRegex;
    }) || null;

  if (!match) {
    return null;
  }
  const { currentVersion, upgradeVersion } = match.groups;

  return {
    currentVersion: currentVersion,
    upgradeVersion: upgradeVersion,
    features: {
      nextAuth: slug.includes("nextAuth"),
      prisma: slug.includes("prisma"),
      trpc: slug.includes("trpc"),
      tailwind: slug.includes("tailwind"),
    },
  };
};

export const arrangements = (array: string[]) => {
  const result: string[][] = [[]];

  for (const element of array) {
    const length = result.length;
    for (let i = 0; i < length; i++) {
      const subset = result[i]?.slice() ?? [];
      subset.push(element);
      result.push(subset);
    }
  }

  return result
    .filter((subset) => subset.length > 0)
    .map((subset) => subset.sort().join("-"));
};
