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
  lang?: string;
  isMdx?: boolean;
};

export const KNOWN_LANGUAGES = {
  Arabic: "ar",
  English: "en",
  Polish: "pl",
  Russian: "ru",
  Spanish: "es",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/t3-oss/create-t3-app/tree/next/www`;

export const COMMUNITY_INVITE_URL = `https://t3.gg/discord`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "create-t3-app",
  appId: "0LE5592BV4",
  apiKey: "892c4647b96fe1b3d0b7d8de1c5b5e40",
};

export type Sidebar = Record<
  typeof KNOWN_LANGUAGE_CODES[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  ar: {
    "Create T3 App": [
      { text: "Introduction (Translate these!!)", link: "ar/introduction" },
      { text: "Why CT3A?", link: "ar/why" },
      { text: "Installation", link: "ar/installation" },
      { text: "Folder Structure", link: "ar/folder-structure" },
      { text: "FAQ", link: "ar/faq" },
      { text: "T3 Collection", link: "ar/t3-collection" },
      { text: "Other Recommendations", link: "ar/other-recs" },
    ],
    Usage: [
      { text: "First Steps", link: "ar/usage/first-steps" },
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
  },
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
  es: {
    "Create T3 App": [
      { text: "Introduction (Translate these!!)", link: "ar/introduction" },
      { text: "Why CT3A?", link: "ar/why" },
      { text: "Installation", link: "ar/installation" },
      { text: "Folder Structure", link: "ar/folder-structure" },
      { text: "FAQ", link: "ar/faq" },
      { text: "T3 Collection", link: "ar/t3-collection" },
      { text: "Other Recommendations", link: "ar/other-recs" },
    ],
    Usage: [
      { text: "First Steps", link: "ar/usage/first-steps" },
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
  },
  pl: {
    "Create T3 App": [
      { text: "Introduction (Translate these!!)", link: "pl/introduction" },
      { text: "Why CT3A?", link: "pl/why" },
      { text: "Installation", link: "pl/installation" },
      { text: "Folder Structure", link: "pl/folder-structure" },
      { text: "FAQ", link: "pl/faq" },
      { text: "T3 Collection", link: "pl/t3-collection" },
      { text: "Other Recommendations", link: "pl/other-recs" },
    ],
    Usage: [
      { text: "First Steps", link: "pl/usage/first-steps" },
      { text: "Next.js", link: "pl/usage/next-js" },
      { text: "TypeScript", link: "pl/usage/typescript" },
      { text: "tRPC", link: "pl/usage/trpc" },
      { text: "Prisma", link: "pl/usage/prisma" },
      { text: "NextAuth.js", link: "pl/usage/next-auth" },
      {
        text: "Environment Variables",
        link: "pl/usage/env-variables",
      },
      { text: "Tailwind CSS", link: "pl/usage/tailwind" },
    ],
    Deployment: [
      { text: "Vercel", link: "pl/deployment/vercel" },
      { text: "Docker", link: "pl/deployment/docker" },
    ],
  },
  ru: {
    "Create T3 App": [
      { text: "Introduction (Translate these!!)", link: "ru/introduction" },
      { text: "Why CT3A?", link: "ru/why" },
      { text: "Installation", link: "ru/installation" },
      { text: "Folder Structure", link: "ru/folder-structure" },
      { text: "FAQ", link: "ru/faq" },
      { text: "T3 Collection", link: "ru/t3-collection" },
      { text: "Other Recommendations", link: "ru/other-recs" },
    ],
    Usage: [
      { text: "First Steps", link: "ru/usage/first-steps" },
      { text: "Next.js", link: "ru/usage/next-js" },
      { text: "TypeScript", link: "ru/usage/typescript" },
      { text: "tRPC", link: "ru/usage/trpc" },
      { text: "Prisma", link: "ru/usage/prisma" },
      { text: "NextAuth.js", link: "ru/usage/next-auth" },
      {
        text: "Environment Variables",
        link: "ru/usage/env-variables",
      },
      { text: "Tailwind CSS", link: "ru/usage/tailwind" },
    ],
    Deployment: [
      { text: "Vercel", link: "ru/deployment/vercel" },
      { text: "Docker", link: "ru/deployment/docker" },
    ],
  },
};
