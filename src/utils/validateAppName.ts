//Validate a string against allowed package.json names
export const validateAppName = (input: string) => {
  if (
    /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(input)
  ) {
    return true;
  } else {
    return "App name must be lowercase, alphanumeric, and only use -, _, and @";
  }
};
