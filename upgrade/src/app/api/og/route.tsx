import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const inter = await getFont({
      family: "Inter",
      weights: [400, 700] as const,
    });
    // get current version and upgrade version from the search params
    const currentVersion = searchParams.get("currentVersion");
    const upgradeVersion = searchParams.get("upgradeVersion");
    const additions = searchParams.get("additions");
    const removals = searchParams.get("removals");
    const total = Number(additions) + Number(removals);

    const greenSquares = Math.floor((Number(additions) * 5) / total);
    const redSquares = Math.floor((Number(removals) * 5) / total);
    const graySquares = 5 - greenSquares - redSquares;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(180deg, rgba(9,11,16,1) 0%, rgba(13,19,28,1) 100%)",
            fontFamily: "Inter",
          }}
        >
          <div tw="flex w-full flex-col justify-between p-8">
            <h1 tw="text-center font-extrabold text-white mx-auto text-8xl">
              Upgrade <span tw="text-purple-400">T3</span> App
            </h1>
            {currentVersion && upgradeVersion && additions && removals && (
              <div tw="flex flex-col items-center justify-center text-2xl">
                <p tw="text-white">
                  From{" "}
                  <span tw="font-black text-purple-400 mx-1">
                    {currentVersion}
                  </span>{" "}
                  to{" "}
                  <span tw="font-black text-purple-400 mx-1">
                    {upgradeVersion}
                  </span>
                </p>
                <div tw="flex items-center" style={{ gap: "5px" }}>
                  <span tw="text-green-500">+{additions}</span>
                  <span tw="text-red-500">-{removals}</span>
                  <div tw="flex h-4 w-[100px]" style={{ gap: "5px" }}>
                    {Array.from({ length: greenSquares }).map((_, i) => (
                      <div key={i} tw="flex-1 bg-green-500" />
                    ))}
                    {Array.from({ length: redSquares }).map((_, i) => (
                      <div key={i} tw="flex-1 bg-red-500" />
                    ))}
                    {Array.from({ length: graySquares }).map((_, i) => (
                      <div key={i} tw="flex-1 bg-gray-500" />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 627,
        fonts: [
          { name: "Inter", data: inter[700], weight: 700 },
          { name: "Inter", data: inter[400], weight: 400 },
        ],
      },
    );
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

/** https://github.com/juliusmarminge/jumr.dev/blob/main/app/og-image/get-fonts.ts */

async function getFont<TWeights extends readonly number[]>({
  family,
  weights,
  text,
}: {
  family: string;
  weights: TWeights;
  text?: string;
}): Promise<Record<TWeights[number], ArrayBuffer>> {
  const API = `https://fonts.googleapis.com/css2?family=${family}:wght@${weights.join(
    ";",
  )}${text ? `&text=${encodeURIComponent(text)}` : ""}`;

  const css: string = (await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text()) as string;

  const fonts = css
    .split("@font-face {")
    .splice(1)
    .map((font) => {
      const u = font.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
      const w = font.match(/font-weight: (\d+)/);
      return u?.[1] && w?.[1] ? { url: u[1], weight: parseInt(w[1]) } : null;
    })
    .filter(
      (font): font is { url: string; weight: TWeights[number] } => !!font,
    );

  const promises = fonts.map(async (font) => {
    const res = await fetch(font.url);
    return [font.weight, await res.arrayBuffer()];
  });

  // Object.fromEntries is typed as returning any *sigh*
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.fromEntries(await Promise.all(promises));
}
