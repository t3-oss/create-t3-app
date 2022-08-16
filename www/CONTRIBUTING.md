## Contributing

### Pages

Pages are created in markdown, located at `/src/pages`, sorted by language (currently only `en`)

`index.astro` - Landing page

### Table of Contents

`/src/config` contains an exported object array named `SIDEBAR`, with each array keyed by its language code.

e.g.

```typescript
export const SIDEBAR = {
  en: [
    { text: "Create-T3-App", header: true },
    { text: "Introduction", link: "en/introduction" },
    { text: "Why?", link: "en/why" },
    ...
}
```

TODO

- [] Complete all 'Usage' pages with an intro to the library/product, and anything relating specifically to create-t3-app
- [] Apply for and integrate [Algolia DocSearch](https://docsearch.algolia.com/) when the above has been completed (scraper for Algolia written in `/lib/updateAlgolia.ts` - likely needs to be refactored)
- [] Create/complete Examples
- [] Create complete Showcase/Awesome-Create-T3-App-Collection
