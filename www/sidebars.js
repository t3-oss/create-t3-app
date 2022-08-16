// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: "category",
      label: "Introduction",
      items: [
        "introduction",
        "getting-started",
        "installation",
        "why",
        "faq",
        "t3-collection",
      ],
      collapsed: false,
    },
    {
      type: "category",
      label: "Configuration",
      items: ["configuration/environment-variables"],
      collapsed: false,
    },
    {
      type: "category",
      label: "TypeScript",
      items: ["typescript/typescript-usage"],
      collapsed: false,
    },
    {
      type: "category",
      label: "Next.js",
      items: ["nextjs/nextjs-usage"],
      collapsed: false,
    },
    {
      type: "category",
      label: "tRPC",
      items: ["trpc/trpc-usage"],
      collapsed: false,
    },
    {
      type: "category",
      label: "Tailwind",
      items: ["tailwind/tailwind-usage"],
      collapsed: false,
    },
    {
      type: "category",
      label: "Prisma",
      items: ["prisma/prisma-usage"],
      collapsed: false,
    },
    {
      type: "category",
      label: "Next-Auth.js",
      items: ["nextauth/nextauth-usage", "nextauth/nextauth-user-id"],
      collapsed: false,
    },
  ],
};

module.exports = sidebars;
