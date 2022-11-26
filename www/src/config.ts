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
  pl: "🇵🇱 Polski",
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

type OuterHeaders = "Create T3 App" | "Usage" | "Deployment";
export type Sidebar = {
  [TCode in KnownLanguageCode]: {
    [THeader in OuterHeaders]?: {
      text: string;
      link: `${TCode}/${string}`;
    }[];
  };
};
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
  pl: {
    "Create T3 App": [
      { text: "Wstęp", link: "pl/introduction" },
      { text: "Dlaczego CT3A?", link: "pl/why" },
      { text: "Instalacja", link: "pl/installation" },
      { text: "Struktura Projektu", link: "pl/folder-structure" },
      { text: "FAQ", link: "pl/faq" },
      { text: "Kolekcja T3", link: "pl/t3-collection" },
      { text: "Inne Rekomendacje", link: "pl/other-recs" },
    ],
    Usage: [
      { text: "Pierwsze Kroki", link: "pl/usage/first-steps" },
      { text: "Next.js", link: "pl/usage/next-js" },
      { text: "TypeScript", link: "pl/usage/typescript" },
      { text: "tRPC", link: "pl/usage/trpc" },
      { text: "Prisma", link: "pl/usage/prisma" },
      { text: "NextAuth.js", link: "pl/usage/next-auth" },
      {
        text: "Zmienne Środowiskowe",
        link: "pl/usage/env-variables",
      },
      { text: "Tailwind CSS", link: "pl/usage/tailwind" },
    ],
    Deployment: [
      { text: "Vercel", link: "pl/deployment/vercel" },
      { text: "Docker", link: "pl/deployment/docker" },
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
  Record<OuterHeaders, string>
> = {
  pl: {
    "Create T3 App": "Crete T3 App",
    Usage: "Korzystanie Z Narzędzia",
    Deployment: "Deployment",
  },
  // Translate the sidebar's "outer headers" here
  // sv: {
  //   "Create T3 App": "Create T3 App",
  //   Usage: "Användarguide",
  //   Deployment: "Deployment",
  // },
};
