/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

checkNodeVersion();

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;

function checkNodeVersion() {
  const nodeVersion = process.versions.node;
  const [major, minor] = nodeVersion.split(".").map((n) => parseInt(n));
  if (!major || !minor) {
    throw new Error(`Unable to parse Node version: ${nodeVersion}`);
  }
  if (major < 18 || (major === 18 && minor < 6) || (major === 19 && minor < 7)) {
    throw new Error(`You are running an outdated Node version. Please use at least 18.16, 19.7, or 20.0`);
  }
}
