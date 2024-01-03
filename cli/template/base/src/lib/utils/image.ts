// in sync with next.config.js (https://nextjs.org/docs/api-reference/next/image#device-sizes)
const imageWidths = [
  16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
  3840,
] as const;

export type NextImageWidth = (typeof imageWidths)[number];

export const getNextImageSrc = ({
  src,
  width,
  quality = 75,
}: {
  src: string;
  width: NextImageWidth;
  quality?: number;
}) => {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

export const findClosestNextImageWidth = (width: number): NextImageWidth => {
  return (
    (imageWidths.find((w) => w >= width) ||
      imageWidths[imageWidths.length - 1]) ??
    3840
  );
};

export const getImageSizes = (
  desktop: number,
  tablet?: number,
  mobile?: number
) => {
  let str = "";

  if (mobile) {
    str += `(max-width: 767px) ${mobile}vw, `;
  }
  if (tablet) {
    str += `(max-width: 1024px) ${tablet}vw, `;
  }
  if (desktop) {
    str += `${desktop}vw`;
  }

  return str;
};
