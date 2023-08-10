import { request } from "@octokit/request";
import { env } from "~/env.mjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const prettyFeatureNameMap: Record<keyof Features, string> = {
  nextAuth: "NextAuth.js",
  prisma: "Prisma",
  trpc: "tRPC",
  tailwind: "Tailwind CSS",
};

export interface VersionGroupedByMajor {
  major: string;
  versions: string[];
}

export type VersionsGroupedByMajor = VersionGroupedByMajor[];

export const getT3Versions = async () => {
  const releases = await request("GET /repos/{owner}/{repo}/releases", {
    owner: "t3-oss",
    repo: "create-t3-app",
    per_page: 100,
  });

  return releases.data
    .map((release) => release.tag_name.split("@")[1] ?? "")
    .filter((v) => {
      if (!v) return false;
      // ignore versions under 5.10.3
      const [majorStr, minorStr, patchStr] = v.split(".");
      const major = Number(majorStr);
      const minor = Number(minorStr);
      const patch = Number(patchStr);
      if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
        console.warn(`Failed to parse version ${v}`);
        return false;
      }

      if (major > 5) return true;
      if (major === 5 && minor > 10) return true;
      if (major === 5 && minor === 10 && patch >= 3) return true;
      return false;
    })
    .filter((v) => v !== "");
};

export const getT3VersionsGroupedByMajor = async () => {
  const actualVersions = await getT3Versions();

  const versionsGroupedByMajor: VersionsGroupedByMajor = [];

  actualVersions.forEach((version) => {
    const [major] = version.split(".");
    if (!major) return;

    const majorGroup = versionsGroupedByMajor.find(
      (group) => group.major === major,
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
    (a, b) => Number(b.major) - Number(a.major),
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

interface VersionsRegex {
  currentVersion: string;
  upgradeVersion: string;
}

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

export interface DiffLocation {
  currentVersion: string;
  upgradeVersion: string;
  features: Features;
}

export const getDiffFromGithub = async (props: DiffLocation) => {
  const featuresString = getFeaturesString(props.features);
  const path = `diffs/diff-${props.currentVersion}-${props.upgradeVersion}${
    featuresString ? `-${featuresString}` : ""
  }.patch`;

  const { data } = await request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: env.GITHUB_DIFFS_OWNER,
    repo: env.GITHUB_DIFFS_REPO,
    path,
    headers: {
      authorization: `token ${env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
  });

  if (Array.isArray(data)) {
    throw new Error("No file found");
  }

  const downloadUrl = data.download_url;
  if (!downloadUrl) {
    throw new Error("No download url found");
  }

  const response = await fetch(downloadUrl);

  if (!response.ok) {
    throw new Error("Failed to download diff");
  }

  return response.text();
};
