import type { prettierConfig } from "../types/editorConfig.js";
import fs from "fs/promises";
import { logger } from "../utils/logger.js";

// TODO: create configuration for .vscode using parameters of the user's choice

export async function vscodeConfig(
  projectDir: string,
  prettierConfig?: prettierConfig,
) {
  if (!prettierConfig) return;
  logger.info("Creating .vscode configuration...");
  try {
    const { printWidth, tabWidth, useTabs, semi } = prettierConfig;

    const prettierConfigFile = `${projectDir}/.vscode/prettier.json`;

    const prettierConfigContent = `{
            "printWidth": ${printWidth},
            "tabWidth": ${tabWidth},
            "useTabs": ${useTabs ? "true" : "false"},
            "semi": ${semi ? "true" : "false"}
        }`;

    await fs
      .mkdir(`${projectDir}/.vscode`, { recursive: true })
      .then(async () => {
        await fs
          .writeFile(prettierConfigFile, prettierConfigContent, {
            flag: "w",
          })
          .then(() => {
            logger.success(`Created ${prettierConfigFile} in ${projectDir}`);
          });
      });
  } catch (err) {
    console.error(err);
  }
  return true;
}
