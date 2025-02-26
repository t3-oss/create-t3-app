import path from "path";
import fs from "fs-extra";
import { format } from "prettier";

import { _eslintTypes } from "~/../template/extras/config/_eslint-types.js";
import { _initialConfig } from "~/../template/extras/config/_eslint.js";
import { type Installer } from "~/installers/index.js";

export const dynamicEslintInstaller: Installer = ({ projectDir, packages }) => {
  const usingDrizzle = !!packages?.drizzle?.inUse;

  const configFileContents = createEslintConfig(usingDrizzle);
  const configDest = path.join(projectDir, "eslint.config.js");

  const configTypesFileContents = createEslintConfigTypes(usingDrizzle);
  const configTypesDest = path.join(projectDir, "eslint-types.d.ts");

  void formatAndWriteFile(configDest, configFileContents);
  void formatAndWriteFile(configTypesDest, configTypesFileContents);
};

function createEslintConfig(usingDrizzle: boolean): string {
  const rawConfig = getRawEslintConfig(usingDrizzle);
  const stringConfig = JSON.stringify(rawConfig);
  const configBody = stringConfig
    .replace(/"%%|%%"/g, "")
    // Add Next.js core web vitals rules
    .replace(
      '"rules":{',
      '"rules":{ ...nextPlugin.configs["core-web-vitals"].rules,'
    );

  const imports = getImports(usingDrizzle);

  // Convert config from _eslint.js to eslint.config.js
  const configFileContents = [
    '/// <reference types="./eslint-types.d.ts" />',
    "",
    ...imports,
    "",
    "export default tseslint.config(",
    configBody,
    ");",
  ].join("\n");

  return configFileContents;
}

function getRawEslintConfig(usingDrizzle: boolean) {
  const eslintConfig = _initialConfig;

  if (usingDrizzle) {
    Object.assign(eslintConfig.plugins, {
      drizzle: "%%drizzlePlugin%%",
    });

    Object.assign(eslintConfig.rules, {
      "drizzle/enforce-delete-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
    });
  }

  return eslintConfig;
}

function getImports(usingDrizzle: boolean): string[] {
  const imports = [
    createImport("nextPlugin", "@next/eslint-plugin-next"),
    createImport("tseslint", "typescript-eslint"),
  ];

  if (usingDrizzle) {
    imports.unshift(createImport("drizzlePlugin", "eslint-plugin-drizzle"));
  }

  return imports;
}

function createImport(defaultImportName: string, packageName: string): string {
  return `import ${defaultImportName} from "${packageName}";`;
}

function createEslintConfigTypes(usingDrizzle: boolean): string {
  let eslintConfigTypes = _eslintTypes;

  if (usingDrizzle) {
    eslintConfigTypes = eslintConfigTypes.concat(
      `\n
      declare module "eslint-plugin-drizzle" {
        import type { Rule } from "eslint";

        export const rules: Record<string, Rule.RuleModule>;
      }`
    );
  }

  return eslintConfigTypes;
}

async function formatAndWriteFile(
  filePath: string,
  fileContents: string
): Promise<void> {
  try {
    const formattedFileContents = await format(fileContents, {
      parser: "typescript",
    });
    await fs.writeFile(filePath, formattedFileContents, "utf-8");
  } catch (e) {
    console.error("Unable to format ESLint config file.", e);
    // Write to fs anyway.
    fs.writeFileSync(filePath, fileContents, "utf-8");
  }
}
