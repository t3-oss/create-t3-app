// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import withMdx from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { getHighlighter } from "shiki";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// await import("./src/env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default withMdx({
  options: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: { dark: "one-dark-pro" },
          getHighlighter,
        },
      ],
    ],
  },
})(nextConfig);
