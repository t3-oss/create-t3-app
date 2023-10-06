import gradient from "gradient-string";

import { TITLE_TEXT } from "~/consts.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";

// I don't know yet if this is the best way to do this but it works
const $t3theme = {
  blue: "#428ed6",
  cyan: "#5a98a6",
  green: "#34cfad",
  magenta: "#c362cc",
  red: "#d95096",
  yellow: "#bfb760",
};

export const renderTitle = () => {
  const t3Gradient = gradient(Object.values($t3theme));

  // resolves weird behavior where the ascii is offset
  const pkgManager = getUserPkgManager();
  if (pkgManager === "yarn" || pkgManager === "pnpm") {
    console.log("");
  }
  console.log(t3Gradient.multiline(TITLE_TEXT));
};
