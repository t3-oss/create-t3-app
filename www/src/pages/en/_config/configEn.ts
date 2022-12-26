import type { Sidebar } from "../../../config";

export const SIDEBAR_EN: Sidebar["en"] = {
  "Create T3 App": [
    { text: "Introduction", link: "en/introduction" },
    { text: "Why CT3A?", link: "en/why" },
    { text: "Installation", link: "en/installation" },
    { text: "Folder Structure", link: "en/folder-structure" },
    { text: "FAQ", link: "en/faq" },
    { text: "T3 Collection", link: "en/t3-collection" },
    { text: "Other Recommendations", link: "en/other-recs" },
  ],
  Usage: [
    { text: "First Steps", link: "en/usage/first-steps" },
    { text: "Next.js", link: "en/usage/next-js" },
    { text: "TypeScript", link: "en/usage/typescript" },
    { text: "tRPC", link: "en/usage/trpc" },
    { text: "Prisma", link: "en/usage/prisma" },
    { text: "NextAuth.js", link: "en/usage/next-auth" },
    {
      text: "Environment Variables",
      link: "en/usage/env-variables",
    },
    { text: "Tailwind CSS", link: "en/usage/tailwind" },
  ],
  Deployment: [
    { text: "Vercel", link: "en/deployment/vercel" },
    { text: "Netlify", link: "en/deployment/netlify" },
    { text: "Docker", link: "en/deployment/docker" },
  ],
};
