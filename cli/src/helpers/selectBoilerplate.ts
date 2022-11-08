import type { InstallerOptions } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";
import Handlebars from "handlebars";

type SelectBoilerplateProps = Required<
  Pick<InstallerOptions, "projectDir" | "packages">
>;
// This generates the _app.tsx file that is used to render the app
export const selectAppFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const withTRPC = packages.trpc.inUse;
  const withNextAuth = packages.nextAuth.inUse;

  const appFileDir = path.join(PKG_ROOT, "template/page-studs/_app/base.hbs");

  const studFile = fs.readFileSync(appFileDir, "utf-8");

  const template = Handlebars.compile(studFile);

  const appDest = path.join(projectDir, "src/pages/_app.tsx");
  fs.writeFileSync(appDest, template({ withTRPC, withNextAuth }));
};

// This selects the proper index.tsx to be used that showcases the chosen tech
export const selectIndexFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const withTRPC = packages.trpc.inUse;
  const withTailwind = packages.tailwind.inUse;
  const withNextAuth = packages.nextAuth.inUse;

  const indexFileDir = path.join(
    PKG_ROOT,
    "template/page-studs/index",
    withTailwind ? "with-tw.hbs" : "base.hbs",
  );

  const studFile = fs.readFileSync(indexFileDir, "utf-8");

  const template = Handlebars.compile(studFile);

  const appDest = path.join(projectDir, "src/pages/index.tsx");
  fs.writeFileSync(appDest, template({ withTRPC, withNextAuth }));
};
