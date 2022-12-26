import type { Sidebar, SidebarHeaders } from "../../../config";

export const SIDEBAR_AR: Sidebar["ar"] = {
  "Create T3 App": [
    { text: "مُقدمة", link: "ar/introduction" },
    { text: "لماذا CT3A؟", link: "ar/why" },
    { text: "التثبيت", link: "ar/installation" },
    { text: "بِنية المجلد", link: "ar/folder-structure" },
    { text: "أسئلة شائعة", link: "ar/faq" },
    { text: "تطبيقات صُنعت بواسطة T3", link: "ar/t3-collection" },
    { text: "ترشيحات أُخري", link: "ar/other-recs" },
  ],
  Usage: [
    { text: "الخُطوات الأُولي", link: "ar/usage/first-steps" },
    { text: "Next.js", link: "ar/usage/next-js" },
    { text: "TypeScript", link: "ar/usage/typescript" },
    { text: "tRPC", link: "ar/usage/trpc" },
    { text: "Prisma", link: "ar/usage/prisma" },
    { text: "NextAuth.js", link: "ar/usage/next-auth" },
    {
      text: "Environment Variables",
      link: "ar/usage/env-variables",
    },
    { text: "Tailwind CSS", link: "ar/usage/tailwind" },
  ],
  Deployment: [
    { text: "Vercel", link: "ar/deployment/vercel" },
    { text: "Docker", link: "ar/deployment/docker" },
  ],
};

export const SIDEBAR_HEADER_MAP_AR: SidebarHeaders = {
  "Create T3 App": "Create T3 App",
  Usage: "كيفية الإستخدام؟",
  Deployment: "نَشر تطبيقك",
};
