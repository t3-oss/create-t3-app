import path from "path";

// With the move to TSUP as a build tool, this keeps path routes in other files (installers, loaders, etc) in check more easily.
// Path is in relation to a single index.js file inside ./dist
export const PKG_ROOT = path.dirname("../");

export const TITLE_TEXT = `Welcome to the create-t3-app !`;
export const DEFAULT_APP_NAME = "my-t3-app";
export const CREATE_T3_APP = "create-t3-app";
