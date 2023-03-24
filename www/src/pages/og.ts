import satori from "satori";
import OpenGraph from "../components/openGraph";
import { type APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";
import { getFont } from "../utils/ogFont";
import { SITE_URL } from "../utils/siteUrl";
import { SITE } from "../config";

const removeEndingSlash = (str: string) => str.replace(/\/$/, "");

export const get: APIRoute = async (request) => {
  const params = request.url.searchParams;
  const title = params.get("title") ?? SITE.title;
  const description = params.get("description") ?? SITE.description;
  const readingTime = params.get("readingTime") ?? "";
  const pagePath = params.get("pagePath") ?? "";
  const inter = await getFont({
    family: "Inter",
    weights: [400, 700] as const,
  });

  const svg = await satori(
    OpenGraph({
      title,
      description,
      readingTime,
      imageBase: SITE_URL,
      pageUrl:
        SITE_URL.replace(/^https?:\/\//, "") + removeEndingSlash(pagePath),
    }),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: inter[400], weight: 400 },
        { name: "Inter", data: inter[700], weight: 700 },
      ],
      debug: import.meta.env.DEBUG_OG ?? false,
    },
  );

  const resvg = new Resvg(svg, {});
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
};
