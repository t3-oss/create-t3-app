export const validateImportAlias = (input: string) => {
  if (input.startsWith(".") || input.startsWith("/")) {
    return "Import alias can't start with '.' or '/'";
  }
  return;
};
