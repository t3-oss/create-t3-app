import type { OuterHeaders, Sidebar } from "../../../config";

export const SIDEBAR_PT: Sidebar["pt"] = {
  "Create T3 App": [
    { text: "Introdução", link: "pt/introduction" },
    { text: "Por que o CT3A?", link: "pt/why" },
    { text: "Instalação", link: "pt/installation" },
    { text: "Estrutura de Pastas", link: "pt/folder-structure" },
    { text: "Perguntas Frequentes", link: "pt/faq" },
    { text: "Coleção T3", link: "pt/t3-collection" },
    { text: "Outras Recomendações", link: "pt/other-recs" },
  ],
  Usage: [
    { text: "Primeiros Passos", link: "pt/usage/first-steps" },
    { text: "Next.js", link: "pt/usage/next-js" },
    { text: "TypeScript", link: "pt/usage/typescript" },
    { text: "tRPC", link: "pt/usage/trpc" },
    { text: "Prisma", link: "pt/usage/prisma" },
    { text: "NextAuth.js", link: "pt/usage/next-auth" },
    {
      text: "Variáveis de Ambiente",
      link: "pt/usage/env-variables",
    },
    { text: "Tailwind CSS", link: "pt/usage/tailwind" },
  ],
  Deployment: [
    { text: "Vercel", link: "pt/deployment/vercel" },
    { text: "Docker", link: "pt/deployment/docker" },
  ],
};

export const SIDEBAR_HEADER_MAP_PT: Record<OuterHeaders, string> = {
  "Create T3 App": "Create T3 App",
  Usage: "Uso",
  Deployment: "Deploy",
};
