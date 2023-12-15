import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const creativeStackInstaller: Installer = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "three",
      "@react-three/drei",
      "@react-three/fiber",
      "leva",
      "three-stdlib",
    ],
    devMode: false,
  });
  addPackageDependency({
    projectDir,
    dependencies: ["@types/three"],
    devMode: true,
  });
};
