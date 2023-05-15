"use client";

import WheresMyVersion from "./wheres-my-version.mdx";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type Features, type VersionsGroupedByMajor } from "~/lib/utils";

const prettyFeatureNameMap: Record<keyof Features, string> = {
  nextAuth: "NextAuth.js",
  prisma: "Prisma",
  trpc: "tRPC",
  tailwind: "Tailwind CSS",
};

const UpgradePanel: React.FC<{
  versionOptions: VersionsGroupedByMajor;
}> = ({ versionOptions }) => {
  const router = useRouter();

  const [fetchingDiff, setFetchingDiff] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<string>();
  const [upgradeVersion, setUpgradeVersion] = useState<string>();
  const [features, setFeatures] = useState<Features>({
    nextAuth: false,
    prisma: false,
    trpc: false,
    tailwind: false,
  });

  const upgradeVersionOptions = useMemo(() => {
    if (!currentVersion) return versionOptions;
    const [major, minor, patch] = currentVersion.split(".");

    // filter out versions that are older than the current version
    const filteredVersions = versionOptions
      .filter((option) => Number(option.major) >= Number(major))
      .reduce<VersionsGroupedByMajor>((acc, option) => {
        if (Number(option.major) === Number(major)) {
          acc.push({
            major: option.major,
            versions: (
              versionOptions.find((v) => v.major === option.major)?.versions ??
              []
            ).filter((version) => {
              const [, versionMinor, versionPatch] = version.split(".");
              if (Number(versionMinor) > Number(minor)) return true;
              if (
                Number(versionMinor) === Number(minor) &&
                Number(versionPatch) > Number(patch)
              )
                return true;
              return false;
            }),
          });
        } else {
          acc.push({
            major: option.major,
            versions:
              versionOptions.find((v) => v.major === option.major)?.versions ??
              [],
          });
        }

        return acc;
      }, []);

    // if only one major version is available and it has no versions, return empty object
    if (
      filteredVersions.length === 1 &&
      (filteredVersions[0]?.versions.length ?? []) === 0
    )
      return [];

    return filteredVersions;
  }, [currentVersion, versionOptions]);

  const noUpgradeAvailable = upgradeVersionOptions.length === 0;

  const goToDiff = () => {
    if (!currentVersion || !upgradeVersion) return;
    const activeFeatures = Object.keys(features).filter(
      (feature) => features[feature as keyof typeof features],
    );
    const featuresString = activeFeatures.join("-");

    const url = `/diff/${currentVersion}..${upgradeVersion}${
      featuresString ? `-${featuresString}` : ""
    }`;

    setFetchingDiff(true);
    router.push(url);
    setFetchingDiff(false);
  };

  useEffect(() => {
    if (noUpgradeAvailable) {
      setUpgradeVersion(undefined);
    } else {
      setUpgradeVersion(upgradeVersionOptions[0]?.versions[0] ?? undefined);
    }
  }, [noUpgradeAvailable, upgradeVersionOptions]);

  return (
    <div className="w-full max-w-lg space-y-8">
      <div className="w-full space-y-2">
        <Label className="text-base">I use the following packages:</Label>
        <div className="flex justify-between">
          {Object.keys(features).map((feature) => (
            <div className="flex items-center space-x-2" key={feature}>
              <Checkbox
                id={feature}
                checked={features[feature as keyof typeof features]}
                onCheckedChange={(value) =>
                  value !== "indeterminate"
                    ? setFeatures((prev) => ({
                        ...prev,
                        [feature]: value,
                      }))
                    : null
                }
              />
              <Label htmlFor={feature} className="">
                {prettyFeatureNameMap[feature as keyof Features]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="relative flex flex-1 gap-4">
          <div className="w-full space-y-1">
            <div className="flex gap-1">
              <Label className="text-base">I am on</Label>
              <HoverCard>
                <HoverCardTrigger>
                  <Info className="h-4 w-4" />
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-max"
                  align="start"
                  sideOffset={10}
                >
                  <WheresMyVersion />
                </HoverCardContent>
              </HoverCard>
            </div>
            <Select onValueChange={(value) => setCurrentVersion(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent className="h-80">
                {versionOptions
                  .filter((option) => option.versions.length > 0)
                  .map((option) => (
                    <SelectGroup key={option.major}>
                      <SelectLabel>{`${option.major}.x`}</SelectLabel>
                      {option.versions.map((minorVersion) => (
                        <SelectItem key={minorVersion} value={minorVersion}>
                          {minorVersion}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-1">
            <Label className="text-base">I want to upgrade to</Label>
            <Select
              onValueChange={(value) => setUpgradeVersion(value)}
              disabled={!!noUpgradeAvailable}
              defaultValue={
                noUpgradeAvailable
                  ? undefined
                  : upgradeVersionOptions[0]?.versions[0]
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    noUpgradeAvailable
                      ? "No upgrade available"
                      : "Select version"
                  }
                />
              </SelectTrigger>
              <SelectContent className="h-80">
                {upgradeVersionOptions
                  .filter((option) => option.versions.length > 0)
                  .map((option) => (
                    <SelectGroup key={option.major}>
                      <SelectLabel>{`${option.major}.x`}</SelectLabel>
                      {option.versions.map((minorVersion) => (
                        <SelectItem key={minorVersion} value={minorVersion}>
                          {minorVersion}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          disabled={!currentVersion || !upgradeVersion || fetchingDiff}
          onClick={() => void goToDiff()}
        >
          {fetchingDiff ? "Loading..." : "Upgrade"}
        </Button>
      </div>
    </div>
  );
};

export default UpgradePanel;
