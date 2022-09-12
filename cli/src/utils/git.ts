import { execa } from "execa";
import { TEMPLATE_URL } from "~/consts.js";

export const cloneScaffoldAndReturnPath = async (
  projectName: string,
): Promise<void> => {
  try {
    await execa("git", ["clone", TEMPLATE_URL, projectName]);
  } catch (error) {
    // TODO: A ton of things can go wrong here (like proxy errors, etc).
    console.error(error);
  }
};
