import path from "path";
import { fileURLToPath } from "url";

// With the move to TSUP as a build tool, this keeps path routes in other files (installers, loaders, etc) in check more easily.
// Path is in relation to a single index.js file inside ./dist
const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

//export const PKG_ROOT = path.dirname(require.main.filename);

export const TITLE_TEXT = `________  _______ __________  ___  ______  ____  ________  ___   ___  ___ 
/ ___/ _ \/ __/ _ /_  __/ __/ / _ )/ __/  |/  / |/ /_  __/ / _ | / _ \/ _ \
/ /__/ , _/ _// __ |/ / / _/  / _  |\ \/ /|_/ /    / / /   / __ |/ ___/ ___/
\___/_/|_/___/_/ |_/_/ /___/ /____/___/_/  /_/_/|_/ /_/   /_/ |_/_/  /_/    
`;
export const DEFAULT_APP_NAME = "my-bsmnt-app";
export const CREATE_BSMNT_APP = "create-bsmnt-app";
