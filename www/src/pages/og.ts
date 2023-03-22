import satori from "satori";
import OpenGraph from "../components/openGraph";
import { type APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";

let font: Promise<ArrayBuffer> | null = null;

const URL = import.meta.env.VERCEL_URL
  ? `https://${import.meta.env.VERCEL_URL}`
  : "http://localhost:3000";

const getFont = async () => {
  if (!font) {
    font = (await fetch(`${URL}/inter-latin-400-normal.woff`)).arrayBuffer();
  }

  return font;
};

export const get: APIRoute = async (request) => {
  const title = request.url.searchParams.get("title") ?? "Create T3 App";
  const description = request.url.searchParams.get("description") ?? "";

  const svg = await satori(
    OpenGraph({ title: title, description: description, imageBase: URL }),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          data: await getFont(),
          name: "Inter",
        },
      ],
      debug: true,
    },
  );
  const resvg = new Resvg(svg, {});
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
