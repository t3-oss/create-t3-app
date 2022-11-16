import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import rehypeExternalLinks from "rehype-external-links";
import remarkCodeTitles from "remark-code-titles";

/**
 * @link https://astro.build/config
 */
export default defineConfig({
  site: `https://create.t3.gg`,
  markdown: {
    remarkPlugins: [remarkCodeTitles],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noreferrer noopener"],
        },
      ],
      "rehype-slug",
      [
        "rehype-autolink-headings",
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
    extendDefaultPlugins: true,
  },
  integrations: [
    react(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
