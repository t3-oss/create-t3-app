export async function getFont<TWeights extends readonly number[]>({
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

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

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
  return Object.fromEntries(await Promise.all(promises));
}
