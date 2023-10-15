/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { env } from "./src/env.mjs";

// Warn if local development URL doesn't match with the active port
const nextAuthPort = new URL(env.NEXTAUTH_URL).port;
if (env.NODE_ENV === "development" && nextAuthPort !== String(env.PORT)) {
  throw new Error(
    [
      `❗ NEXTAUTH_URL (${env.NEXTAUTH_URL}) doesn't match with PORT (${env.PORT}).`,
      `Either update your the URL in your .env file or make sure to run your dev server on port ${nextAuthPort}.`,
    ].join(" ")
  );
}

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
