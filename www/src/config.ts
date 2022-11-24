export const SITE = {
  title: "Create T3 App",
  description: "The best way to start a full-stack, typesafe Next.js app.",
  defaultLanguage: "en_US",
};

export const OPEN_GRAPH = {
  image: {
    src: "images/og-image.png",
    alt: "Create T3 App: The best way to start a full-stack, typesafe Next.js app.",
  },
  twitter: "t3dotgg",
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
  title: string;
  description: string;
  layout: string;
  image?: { src: string; alt: string };
  dir?: "ltr" | "rtl";
  ogLocale?: string;
  lang?: KnownLanguageCode;
  isMdx?: boolean;
};

export const KNOWN_LANGUAGES = {
  en: "🇺🇸 English",
  ar: "العربية 🇪🇬",
  // Add more languages here
  // sv: "🇸🇪 Svenska",
} as const;
export type KnownLanguageCode = keyof typeof KNOWN_LANGUAGES;

export const GITHUB_EDIT_URL = `https://github.com/t3-oss/create-t3-app/tree/next/www`;

export const COMMUNITY_INVITE_URL = `https://t3.gg/discord`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "create-t3-app",
  appId: "0LE5592BV4",
  apiKey: "892c4647b96fe1b3d0b7d8de1c5b5e40",
};

export type Sidebar = Record<
  KnownLanguageCode,
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  en: {
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
      { text: "Docker", link: "en/deployment/docker" },
    ],
  },
  ar: {
    "Create T3 App": [
      { text: "مُقدمة", link: "ar/introduction" },
      { text: "لماذا CT3A ؟", link: "ar/why" },
      { text: "التثبيت", link: "ar/installation" },
      { text: "بِنية المشروع", link: "ar/folder-structure" },
      { text: "إسئلة شائعة", link: "ar/faq" },
      { text: "مشروعات صُنعت براسطة T3", link: "ar/t3-collection" },
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
        text: "الـ Environment Variables",
        link: "ar/usage/env-variables",
      },
      { text: "Tailwind CSS", link: "ar/usage/tailwind" },
    ],
    Deployment: [
      { text: "Vercel", link: "ar/deployment/vercel" },
      { text: "Docker", link: "ar/deployment/docker" },
    ],
  },
  // For Translations:
  // Keep the "outer headers" in English so we can match them.
  // Translate the "inner headers" to the language you're translating to.
  // Omit any files you haven't translated, they'll fallback to English.
  // Example:
  // sv: {
  //   "Create T3 App": [
  //     { text: "Introduktion", link: "sv/introduction" },
  //     { text: "Installation", link: "sv/installation" },
  //   ],
  //   Usage: [{ text: "Miljövariabler", link: "sv/usage/env-variables" }],
  // },
};
export const SIDEBAR_HEADER_MAP: Record<
  Exclude<KnownLanguageCode, "en">,
  Record<keyof Sidebar["en"], string>
> = {
  // Translate the sidebar's "outer headers" here
  ar: {
    "Create T3 App": "إنشاء تطبيق T3.",
    Usage: "كيفية الإستخدام؟",
    Deployment: "نَشر المشروع",
  },
  // Translate the sidebar's "outer headers" here
  // sv: {
  //   "Create T3 App": "Create T3 App",
  //   Usage: "Användarguide",
  //   Deployment: "Deployment",
  // },
};
