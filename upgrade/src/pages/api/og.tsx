import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // get current version and upgrade version from the search params
    const currentVersion = searchParams.get("currentVersion");
    const upgradeVersion = searchParams.get("upgradeVersion");
    const additions = searchParams.get("additions");
    const removals = searchParams.get("removals");

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
            backgroundImage:
              "linear-gradient(180deg, rgb(24, 24, 27) 0%, rgb(14, 14, 16) 100%)",
          }}
        >
          <div tw="center flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#18181b] to-slate-900">
            <div tw="flex w-full flex-col justify-between gap-10 p-8 md:flex-row md:gap-0">
              <h1 tw="text-center text-4xl font-extrabold text-white">
                Upgrade <span tw="text-purple-400">T3</span> App
              </h1>
              {currentVersion && upgradeVersion && additions && removals && (
                <div tw="flex flex-col items-center justify-center md:items-end">
                  <p tw="text-white">
                    From{" "}
                    <span tw="font-black text-purple-400">
                      {currentVersion}
                    </span>{" "}
                    to{" "}
                    <span tw="font-black text-purple-400">
                      {upgradeVersion}
                    </span>
                  </p>
                  <div tw="flex space-x-2">
                    <span tw="text-green-500">+{additions}</span>
                    <span tw="text-red-500">-{removals}</span>
                    <div tw="flex h-4 w-[100px] gap-1 align-middle">
                      <div tw="flex-1 bg-red-500"></div>
                      <div tw="flex-1 bg-green-500"></div>
                      <div tw="flex-1 bg-red-500"></div>
                      <div tw="flex-1 bg-green-500"></div>
                      <div tw="flex-1 bg-red-500"></div>
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
