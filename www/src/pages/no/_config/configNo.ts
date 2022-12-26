import type { Sidebar, SidebarHeaders } from "../../../config";

export const SIDEBAR_NO: Sidebar["no"] = {
  "Create T3 App": [
    { text: "Introduksjon", link: "no/introduction" },
    { text: "Hvorfor CT3A?", link: "no/why" },
    { text: "Installasjon", link: "no/installation" },
    { text: "Mappestruktur", link: "no/folder-structure" },
    { text: "FAQ", link: "no/faq" },
    { text: "T3-Kolleksjonen", link: "no/t3-collection" },
    { text: "Andre Anbefalinger", link: "no/other-recs" },
  ],
  Usage: [
    { text: "Første Steg", link: "no/usage/first-steps" },
    { text: "Next.js", link: "no/usage/next-js" },
    { text: "TypeScript", link: "no/usage/typescript" },
    { text: "tRPC", link: "no/usage/trpc" },
    { text: "Prisma", link: "no/usage/prisma" },
    { text: "NextAuth.js", link: "no/usage/next-auth" },
    {
      text: "Miljøvariabler",
      link: "no/usage/env-variables",
    },
    { text: "Tailwind CSS", link: "no/usage/tailwind" },
  ],
  Deployment: [
    { text: "Vercel", link: "no/deployment/vercel" },
    { text: "Docker", link: "no/deployment/docker" },
  ],
};

export const SIDEBAR_HEADER_MAP_NO: SidebarHeaders = {
  "Create T3 App": "Create T3 App",
  Usage: "Bruk",
  Deployment: "Utrulling",
};
