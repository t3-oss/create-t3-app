import type { KnownLanguageCode } from "./config";
export { KNOWN_LANGUAGES, type KnownLanguageCode } from "./config";

export const langPathRegex = /\/([a-z]{2}-?[A-Z]{0,2})\//;

export function getLanguageFromURL(pathname: string) {
  const langCodeMatch = pathname.match(langPathRegex);
  const langCode = langCodeMatch ? langCodeMatch[1] : "en";
  return langCode as KnownLanguageCode;
}

// all RTL languages according to: https://lingohub.com/academy/best-practices/rtl-language-list
const rtlLanguages = [
  "ar",
  "arc",
  "dv",
  "fa",
  "ha",
  "he",
  "khw",
  "ks",
  "ku",
  "ps",
  "ur",
  "yi",
];

export function getIsRtlFromUrl(pathname: string) {
  const language = getLanguageFromURL(pathname);
  if (rtlLanguages.indexOf(language) !== -1) {
    return true;
  }
  return false;
}
