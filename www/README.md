# create-t3-app Documentation Site

Based on the [Astro Starter Kit: Docs Site](https://github.com/withastro/astro/tree/latest/examples/docs). New to Astro?

- Check out [their documentation](https://docs.astro.build).
- Jump into their [Discord server](https://astro.build/chat).
- Deploy a site to production with the guide, [Deploy an Astro Website](https://docs.astro.build/guides/deploy).

## Outline

- [Features](#features)
- [Run Site Locally](#run-site-locally)
- [Command Cheat Sheet](#command-cheat-sheet)
- [Customize This Theme](#customize-this-theme)
  - [Site Metadata](#site-metadata)
  - [CSS Styling](#css-styling)
  - [Page Metadata](#page-metadata)
  - [Sidebar Navigation](#sidebar-navigation)
  - [Multiple Languages Support](#multiple-languages-support)

## Features

- ✅ **Full Markdown support**
- ✅ **Responsive mobile-friendly design**
- ✅ **Sidebar navigation**
- ✅ **Search (powered by Algolia)**
- ✅ **Multi-language i18n**
- ✅ **Automatic table of contents**
- ✅ **Automatic list of contributors**
- ✅ (and, best of all) **dark mode**

## Run Site Locally

```bash
git clone https://github.com/t3-oss/create-t3-app.git
cd create-t3-app/www
bun i
bun dev
```

## Command Cheat Sheet

All commands are run from the root of the project, from a terminal.

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## Customize This Theme

### Site Metadata

`src/config.ts` contains several data objects that describe metadata about your site like title, description, default language, and Open Graph details. You can customize these to match your project.

### CSS Styling

The theme's look and feel is controlled by a few key variables that you can customize yourself. You'll find them in the `public/theme.css` CSS file. If you've never worked with CSS variables before, give [MDN's guide on CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) a quick read.

This theme uses a "cool blue" accent color by default. To customize this for your project, change the `--theme-accent` variable to whatever color you'd like:

```diff
/* public/theme.css */

:root {
  color-scheme: light;
-  --theme-accent: hsla(var(--color-blue), 1);
+  --theme-accent: hsla(var(--color-red), 1);   /* or: hsla(#FF0000, 1); */
```

### Page Metadata

Astro uses frontmatter in Markdown pages to choose layouts and pass properties to those layouts. If you are using the default layout, you can customize the page in many different ways to optimize SEO and other things.

```markdown
---
title: Example title
description: Really cool docs example that uses Astro
layout: ../../layouts/MainLayout.astro
---

# Page content...
```

This uses the `title` and `description` properties to set the document title, meta title, meta description, and Open Graph description. See `src/components/HeadSEO.astro` for more SEO related properties.

### Sidebar Navigation

The sidebar navigation is controlled by the `SIDEBAR` variable in your `src/config.ts` file. You can customize the sidebar by modifying this object. A default, starter navigation has already been created for you.

```ts
// src/config.ts

export const SIDEBAR = {
  en: [
    { text: "Section Header", header: true },
    { text: "Introduction", link: "en/introduction" },
    { text: "Page 2", link: "en/page-2" },
    { text: "Page 3", link: "en/page-3" },

    { text: "Another Section", header: true },
    { text: "Page 4", link: "en/page-4" },
  ],
};
```

Note the top-level `en` key: This is needed for multi-language support. You can change it to whatever language you'd like, or add new languages as you go. More details on this below.

### Multiple Languages Support

The Astro docs template supports multiple languages out of the box. The default theme only shows `en` docs. But you can enable multi-language support features. To add a second language to your project, you'll want to extend the layout, `src/pages/[lang]/...`:

```diff
 📂 src/pages
 ┣ 📂 en
 ┃ ┣ 📜 page-1.md
 ┃ ┣ 📜 page-2.md
 ┃ ┣ 📜 page-3.astro
+ ┣ 📂 es
+ ┃ ┣ 📜 page-1.md
+ ┃ ┣ 📜 page-2.md
+ ┃ ┣ 📜 page-3.astro
```

You'll also need to add the new language name to the `KNOWN_LANGUAGES` map in your `src/config.ts` file. This will enable your new language switcher in the site header.

```diff
// src/config.ts

export const KNOWN_LANGUAGES = {
  English: 'en',
+  Spanish: 'es',
};
```

Last step: you'll need to add a new entry to your sidebar, to create the table of contents for that language. While duplicating every page might not sound ideal to everyone, this extra control allows you to create entirely custom content for every language.

> Make sure the sidebar `link` value points to the correct language!

```diff
// src/config.ts

export const SIDEBAR = {
  en: [
    { text: 'Section Header', header: true, },
    { text: 'Introduction', link: 'en/introduction' },
    // ...
  ],
+  es: [
+    { text: 'Encabezado de sección', header: true, },
+    { text: 'Introducción', link: 'es/introduction' },
+    // ...
+  ],
};

// ...
```

If you plan to use Spanish as the default language, you just need to modify the redirect path in `src/pages/index.astro` (or you can remove the script and write a landing page in Spanish instead):

```diff
<script>
- window.location.pathname = `/en/introduction`;
+ window.location.pathname = `/es/introduction`;
</script>
```

What if I don't plan to support multiple languages? Totally fine! Not all projects need (or can support) that. If that single language is not English, you can just replace `en` in directory layouts and configurations with the preferred language such as `es`.
