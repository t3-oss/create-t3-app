export const removeTrailingSlash = (input: string) => {
  if (input.length > 1 && input.endsWith("/")) {
    input = input.slice(0, -1);
  }

  return input;
};
