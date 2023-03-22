import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import rehypeExternalLinks from "rehype-external-links";
import remarkCodeTitles from "remark-code-titles";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

/** @link https://astro.build/config */
export default defineConfig({
  site: `https://create.t3.gg/`,
  output: "server",
  adapter: vercel(),
  markdown: {
    remarkPlugins: [remarkCodeTitles],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noreferrer noopener"],
          content: {
            type: "text",
            value: "↗",
          },
        },
      ],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            class: "heading-link heading-link--hidden---effects",
            "data-heading-link": true,
          },
          behavior: "wrap",
        },
      ],
    ],
    shikiConfig: {
      theme: "rose-pine",
      wrap: true,
    },
  },
  integrations: [
    react(),
    tailwind({ config: { applyBaseStyles: false } }),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    sitemap(),
    mdx(),
  ],
});
