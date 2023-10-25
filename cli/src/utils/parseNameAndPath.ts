import pathModule from "path";

import { removeTrailingSlash } from "./removeTrailingSlash.js";

/**
 * Parses the appName and its path from the user input.
 *
 * Returns a tuple of of `[appName, path]`, where `appName` is the name put in the "package.json"
 * file and `path` is the path to the directory where the app will be created.
 *
 * If `appName` is ".", the name of the directory will be used instead. Handles the case where the
 * input includes a scoped package name in which case that is being parsed as the name, but not
 * included as the path.
 *
 * For example:
 *
 * - dir/@mono/app => ["@mono/app", "dir/app"]
 * - dir/app => ["app", "dir/app"]
 */
export const parseNameAndPath = (rawInput: string) => {
  const input = removeTrailingSlash(rawInput);

  const paths = input.split("/");

  let appName = paths[paths.length - 1]!;

  // If the user ran `npx create-t3-app .` or similar, the appName should be the current directory
  if (appName === ".") {
    const parsedCwd = pathModule.resolve(process.cwd());
    appName = pathModule.basename(parsedCwd);
  }

  // If the first part is a @, it's a scoped package
  const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));
  if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
    appName = paths.slice(indexOfDelimiter).join("/");
  }

  const path = paths.filter((p) => !p.startsWith("@")).join("/");

  return [appName, path] as const;
};
