import { SIDEBAR_AR, SIDEBAR_HEADER_MAP_AR } from "./pages/ar/_config/configAr";
import { SIDEBAR_EN } from "./pages/en/_config/configEn";
import { SIDEBAR_FR, SIDEBAR_HEADER_MAP_FR } from "./pages/fr/_config/configFr";
import { SIDEBAR_HEADER_MAP_NO, SIDEBAR_NO } from "./pages/no/_config/configNo";
import { SIDEBAR_HEADER_MAP_PT, SIDEBAR_PT } from "./pages/pt/_config/configPt";
import { SIDEBAR_HEADER_MAP_RU, SIDEBAR_RU } from "./pages/ru/_config/configRu";
import {
  SIDEBAR_HEADER_MAP_ZH_HANS,
  SIDEBAR_ZH_HANS,
} from "./pages/zh-hans/_config/configZhHans";

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
  // Add more languages here
  // sv: "Svenska",
  ar: "العربية",
  en: "English",
  fr: "Français",
  pt: "Português",
  ru: "Русский",
  no: "Norsk",
  "zh-hans": "简体中文",
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

export type OuterHeaders = "Create T3 App" | "Usage" | "Deployment";
export type Sidebar = {
  [TCode in KnownLanguageCode]: {
    [THeader in OuterHeaders]?: {
      text: string;
      link: `${TCode}/${string}`;
    }[];
  };
};
export const SIDEBAR: Sidebar = {
  // For Translations:
  // Keep the "outer headers" in English so we can match them.
  // Translate the "inner headers" to the language you're translating to.
  // Omit any files you haven't translated, they'll fallback to English.
  // Example:
  // SIDEBAR_SV: {
  //   "Create T3 App": [
  //     { text: "Introduktion", link: "sv/introduction" },
  //     { text: "Installation", link: "sv/installation" },
  //   ],
  //   Usage: [{ text: "Miljövariabler", link: "sv/usage/env-variables" }],
  // },
  ar: SIDEBAR_AR,
  en: SIDEBAR_EN,
  fr: SIDEBAR_FR,
  no: SIDEBAR_NO,
  pt: SIDEBAR_PT,
  ru: SIDEBAR_RU,
  "zh-hans": SIDEBAR_ZH_HANS,
};

export type SidebarHeaders = Record<OuterHeaders, string>;
export const SIDEBAR_HEADER_MAP: Record<
  Exclude<KnownLanguageCode, "en">,
  SidebarHeaders
> = {
  // Translate the sidebar's "outer headers"
  // export const SIDEBAR_HEADER_MAP_SV: SidebarHeaders = {
  //   "Create T3 App": "Create T3 App",
  //   Usage: "Användarguide",
  //   Deployment: "Deployment",
  // },
  ar: SIDEBAR_HEADER_MAP_AR,
  fr: SIDEBAR_HEADER_MAP_FR,
  no: SIDEBAR_HEADER_MAP_NO,
  pt: SIDEBAR_HEADER_MAP_PT,
  ru: SIDEBAR_HEADER_MAP_RU,
  "zh-hans": SIDEBAR_HEADER_MAP_ZH_HANS,
};
