import type { OuterHeaders, Sidebar } from "../../../config";

export const SIDEBAR_FR: Sidebar["fr"] = {
  "Create T3 App": [
    { text: "Introduction", link: "fr/introduction" },
    { text: "Pourquoi CT3A?", link: "fr/why" },
    { text: "Installation", link: "fr/installation" },
    { text: "Structure des dossiers", link: "fr/folder-structure" },
    { text: "FAQ", link: "fr/faq" },
    { text: "Collection T3", link: "fr/t3-collection" },
    { text: "Autres recommandations", link: "fr/other-recs" },
  ],
  Usage: [
    { text: "Premiers pas", link: "fr/usage/first-steps" },
    { text: "Next.js", link: "fr/usage/next-js" },
    { text: "TypeScript", link: "fr/usage/typescript" },
    { text: "tRPC", link: "fr/usage/trpc" },
    { text: "Prisma", link: "fr/usage/prisma" },
    { text: "NextAuth.js", link: "fr/usage/next-auth" },
    {
      text: "Variables d'environnement",
      link: "fr/usage/env-variables",
    },
    { text: "Tailwind CSS", link: "fr/usage/tailwind" },
  ],
  Deployment: [
    { text: "Vercel", link: "fr/deployment/vercel" },
    { text: "Netlify", link: "fr/deployment/netlify" },
    { text: "Docker", link: "fr/deployment/docker" },
  ],
};

export const SIDEBAR_HEADER_MAP_FR: Record<OuterHeaders, string> = {
  "Create T3 App": "Create T3 App",
  Usage: "Utilisation",
  Deployment: "Déploiement",
};
