// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Create T3 App",
  tagline: "Create web application with the T3 stack",
  url: "https://create.t3.gg",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "t3-oss",
  projectName: "create-t3-app",
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/t3-oss/create-t3-app/tree/main/www/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
        title: "Create T3 App",
        logo: {
          alt: "My Site Logo",
          src: "img/t3-logo.png",
        },
        items: [
          {
            to: "docs/intro",
            label: "Docs",
          },
          {
            to: "docs/faq",
            label: "FAQ",
          },
          {
            to: "docs/t3-collection",
            label: "T3 Collection",
          },
          {
            href: "https://github.com/t3-oss/create-t3-app",
            label: "GitHub",
            position: "right",
            className: "navbar-external-link",
          },
          {
            href: "https://t3.gg/discord",
            label: "Discord",
            position: "right",
            className: "navbar-external-link",
          },
        ],

        // copyright: `Copyright © ${new Date().getFullYear()} T3-OSS. Built with Docusaurus.`,
      },
    },

  plugins: [
    async function myPlugin() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          postcssOptions.plugins.push(require("tailwindcss"));
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
};

module.exports = config;
