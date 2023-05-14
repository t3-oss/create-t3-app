import { generateAllMissingDiffs } from "./generateAllMissingDiffs";

generateAllMissingDiffs()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
