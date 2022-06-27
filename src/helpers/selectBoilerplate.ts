import type { PkgInstallerMap } from "../installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "../consts.js";

// This generates the _app.tsx file that is used to render the app
export const selectAppFile = async (
  projectDir: string,
  packages: PkgInstallerMap,
) => {
  const appFileDir = path.join(PKG_ROOT, "template/page-studs/_app");

  const usingTrpc = packages.trpc.inUse;
  const usingNextAuth = packages.nextAuth.inUse;

  let appFile = "";
  if (usingNextAuth && usingTrpc) {
    appFile = "with-auth-trpc.tsx";
  } else if (usingNextAuth && !usingTrpc) {
    appFile = "with-auth.tsx";
  } else if (!usingNextAuth && usingTrpc) {
    appFile = "with-trpc.tsx";
  }

  if (appFile !== "") {
    const appSrc = path.join(appFileDir, appFile);
    const appDest = path.join(projectDir, "src/pages/_app.tsx");
    await fs.copy(appSrc, appDest);
  }
};

// This selects the proper index.tsx to be used that showcases the chosen tech
export const selectIndexFile = async (
  projectDir: string,
  packages: PkgInstallerMap,
) => {
  const indexFileDir = path.join(PKG_ROOT, "template/page-studs/index");

  const usingTrpc = packages.trpc.inUse;
  const usingTw = packages.tailwind.inUse;

  let indexFile = "";
  if (usingTrpc && usingTw) {
    indexFile = "with-trpc-tw.tsx";
  } else if (usingTrpc && !usingTw) {
    indexFile = "with-trpc.tsx";
  } else if (!usingTrpc && usingTw) {
    indexFile = "with-tw.tsx";
  }

  if (indexFile !== "") {
    const indexSrc = path.join(indexFileDir, indexFile);
    const indexDest = path.join(projectDir, "src/pages/index.tsx");
    await fs.copy(indexSrc, indexDest);
  }
};
