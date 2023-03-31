import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react"; 
import { defineConfig } from "astro/config"; 
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import remarkCodeTitles from "remark-code-titles";

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
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    sitemap(),
    mdx(),
  ],
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
