interface LinkInterface {
  href: string;
  label: string;
}

type SitemapKeys = "home";

export const SITEMAP: Record<SitemapKeys, LinkInterface> = {
  home: {
    href: "/",
    label: "Home",
  },
};
