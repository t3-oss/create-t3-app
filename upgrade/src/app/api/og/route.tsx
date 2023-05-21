import { ImageResponse } from "next/server";

export const runtime = "edge";

export function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

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
            backgroundImage: "linear-gradient(to bottom, #111827, #0f172a)",
          }}
        >
          <div tw="flex h-full w-full flex-col items-center justify-center">
            <div tw="flex w-full flex-row justify-between p-8">
              <h1 tw="text-center text-4xl font-extrabold text-white">
                Upgrade <span tw="text-purple-400">T3</span> App
              </h1>
              {currentVersion && upgradeVersion && additions && removals && (
                <div tw="flex flex-col items-center justify-center">
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
        </div>
      ),
      {
        width: 1200,
        height: 627,
      },
    );
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
