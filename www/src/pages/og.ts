import satori from "satori";
import OpenGraph from "../components/openGraph";
import { type APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";
import { getFont } from "../utils/ogFont";
import { SITE_URL } from "../utils/siteUrl";

export const get: APIRoute = async (request) => {
  const title = request.url.searchParams.get("title") ?? "Create T3 App";
  const description = request.url.searchParams.get("description") ?? "";
  const inter = await getFont({
    family: "Inter",
    weights: [400, 700] as const,
  });

  const svg = await satori(
    OpenGraph({ title: title, description: description, imageBase: SITE_URL }),
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
