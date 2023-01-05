import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import rehypeExternalLinks from "rehype-external-links";
import remarkCodeTitles from "remark-code-titles";
import remarkCodeExtra from "remark-code-extra";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import sitemap from "@astrojs/sitemap";
/**
 * @link https://astro.build/config
 */
export default defineConfig({
  site: `https://create.t3.gg`,
  markdown: {
    remarkPlugins: [remarkCodeTitles, remarkCodeExtra, {
      transform: (node) => node && ({
        after: [
          {
            type: 'element',
            tagName: 'div',
            properties: {
              class: 'rounded border border-t3-purple-200 dark:border-t3-purple-400/30'
            }
          }
        ]
      })
    }
  ],
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
    extendDefaultPlugins: true,
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
