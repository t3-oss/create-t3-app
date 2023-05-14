import { getMissingDiffs } from "./fileUtils";
import generateDiff from "./generateDiff";
import { extractVersionsAndFeatures } from "./utils";

export default async function batchRequests(count: number) {
  const missingDiffs = await getMissingDiffs(count);

  const promises = missingDiffs.map((diffLocation) => {
    const versionsAndFeatures = extractVersionsAndFeatures(diffLocation);

    if (!versionsAndFeatures) {
      return { error: "Invalid diff location", differences: undefined };
    }

    return generateDiff(versionsAndFeatures);
  });

  const responses = await Promise.all(promises);

  return {
    missingDiffs,
    diffs: responses,
  };
}
