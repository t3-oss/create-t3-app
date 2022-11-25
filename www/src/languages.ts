import type { KnownLanguageCode } from "./config";
export { KNOWN_LANGUAGES, type KnownLanguageCode } from "./config";

export const langPathRegex = /\/([a-z]{2}-?[A-Z]{0,2})\//;

export function getLanguageFromURL(pathname: string) {
  const langCodeMatch = pathname.match(langPathRegex);
  const langCode = langCodeMatch ? langCodeMatch[1] : "en";
  return langCode as KnownLanguageCode;
}
