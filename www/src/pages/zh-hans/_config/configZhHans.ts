import type { Sidebar, SidebarHeaders } from "../../../config";

export const SIDEBAR_ZH_HANS: Sidebar["zh-hans"] = {
  "Create T3 App": [
    { text: "简介", link: "zh-hans/introduction" },
    { text: "为什么选择 CT3A?", link: "zh-hans/why" },
    { text: "安装", link: "zh-hans/installation" },
    { text: "文件夹结构", link: "zh-hans/folder-structure" },
    { text: "常见疑问", link: "zh-hans/faq" },
    { text: "T3 合集", link: "zh-hans/t3-collection" },
    { text: "其他推荐", link: "zh-hans/other-recs" },
  ],
  Usage: [
    { text: "第一步", link: "zh-hans/usage/first-steps" },
    { text: "Next.js", link: "zh-hans/usage/next-js" },
    { text: "TypeScript", link: "zh-hans/usage/typescript" },
    { text: "tRPC", link: "zh-hans/usage/trpc" },
    { text: "Prisma", link: "zh-hans/usage/prisma" },
    { text: "NextAuth.js", link: "zh-hans/usage/next-auth" },
    {
      text: "环境变量",
      link: "zh-hans/usage/env-variables",
    },
    { text: "Tailwind CSS", link: "zh-hans/usage/tailwind" },
  ],
  Deployment: [
    { text: "Vercel", link: "zh-hans/deployment/vercel" },
    { text: "Netlify", link: "zh-hans/deployment/netlify" },
    { text: "Docker", link: "zh-hans/deployment/docker" },
  ],
};

export const SIDEBAR_HEADER_MAP_ZH_HANS: SidebarHeaders = {
  "Create T3 App": "Create T3 App",
  Usage: "用法",
  Deployment: "部署",
};
