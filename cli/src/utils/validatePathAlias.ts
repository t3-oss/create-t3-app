export const validatePathAlias = (input: string) => {
  if (input.startsWith(".") || input.startsWith("/")) {
    return "Path alias can't start with '.' or '/'";
  } else {
    return true;
  }
};
