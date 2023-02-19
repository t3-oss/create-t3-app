import type { InstallerOptions } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";

type SelectBoilerplateProps = Required<
  Pick<InstallerOptions, "projectDir" | "packages">
>;
// This generates the _app.tsx file that is used to render the app
export const selectAppFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const appFileDir = path.join(PKG_ROOT, "template/extras/src/pages/_app");

  const usingTRPC = packages.trpc.inUse;
  const usingNextAuth = packages.nextAuth.inUse;

  let appFile = "";
  if (usingNextAuth && usingTRPC) {
    appFile = "with-auth-trpc.tsx";
  } else if (usingNextAuth && !usingTRPC) {
    appFile = "with-auth.tsx";
  } else if (!usingNextAuth && usingTRPC) {
    appFile = "with-trpc.tsx";
  }

  if (appFile !== "") {
    const appSrc = path.join(appFileDir, appFile);
    const appDest = path.join(projectDir, "src/pages/_app.tsx");
    fs.copySync(appSrc, appDest);
  }
};

// This selects the proper index.tsx to be used that showcases the chosen tech
export const selectIndexFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const indexFileDir = path.join(PKG_ROOT, "template/extras/src/pages/index");

  let packageList = "";
  if (packages.nextAuth.inUse) packageList += "-auth";
  if (packages.prisma.inUse) packageList += "-prisma";
  if (packages.trpc.inUse) packageList += "-trpc";
  if (packages.tailwind.inUse) packageList += "-tw";

  if (packageList !== "") {
    const indexFile = `with${packageList}.tsx`;
    const indexSrc = path.join(indexFileDir, indexFile);
    const indexDest = path.join(projectDir, "src/pages/index.tsx");
    fs.copySync(indexSrc, indexDest);
  }
};
