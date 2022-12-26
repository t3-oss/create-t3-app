import type { OuterHeaders, Sidebar } from "../../../config";

export const SIDEBAR_RU: Sidebar["ru"] = {
  "Create T3 App": [
    { text: "Введение", link: "ru/introduction" },
    { text: "Почему CT3A?", link: "ru/why" },
    { text: "Установка", link: "ru/installation" },
    { text: "Файловая структура", link: "ru/folder-structure" },
    { text: "FAQ", link: "ru/faq" },
    { text: "T3 коллекция", link: "ru/t3-collection" },
    { text: "Дополнительные рекомендации", link: "ru/other-recs" },
  ],
  Usage: [
    { text: "Первые шаги", link: "ru/usage/first-steps" },
    { text: "Next.js", link: "ru/usage/next-js" },
    { text: "TypeScript", link: "ru/usage/typescript" },
    { text: "tRPC", link: "ru/usage/trpc" },
    { text: "Prisma", link: "ru/usage/prisma" },
    { text: "NextAuth.js", link: "ru/usage/next-auth" },
    {
      text: "Переменные среды",
      link: "ru/usage/env-variables",
    },
    { text: "Tailwind CSS", link: "ru/usage/tailwind" },
  ],
  Deployment: [
    { text: "Vercel", link: "ru/deployment/vercel" },
    { text: "Docker", link: "ru/deployment/docker" },
  ],
};

export const SIDEBAR_HEADER_MAP_RU: Record<OuterHeaders, string> = {
  "Create T3 App": "Create T3 App",
  Usage: "Использование",
  Deployment: "Развертывание",
};
