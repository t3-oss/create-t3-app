import figlet from "figlet";
import gradient from "gradient-string";
import { TITLE_TEXT } from "../consts.js";

// colors brought in from vscode poimandres theme
const poimandresTheme = {
  blue: "#add7ff",
  cyan: "#89ddff",
  green: "#5de4c7",
  magenta: "#fae4fc",
  red: "#d0679d",
  yellow: "#fffac2",
};

export const renderTitle = () => {
  const text = figlet.textSync(TITLE_TEXT, { font: "Small" });
  const t3Gradient = gradient(Object.values(poimandresTheme));
  console.log("\n", t3Gradient.multiline(text));
};
