# Contributing Guidelines for our docs

Are you a native speaker of a language other than English? We'd love to have your help!

## How to contribute

(Read the [contribution guidelines](../CONTRIBUTING.md) first for general information about contributing to this project.)

### Initial Translation

If the docs are not available in your language yet and you would like to translate them, you can do so by following these steps:

1. Copy the `pages/en` directory to a new directory with the name of your language, e.g. `pages/de` for German. (If you're not sure what the language code is, you can find it [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).)

2. File a draft PR to let others know you're working on it. This is to avoid duplicate work, and also allows for community feedback along the way.

3. File by file, translate the content of the files.

4. Update the `lang` attribute in the frontmatter of the files translated to your language. If there are any files you haven't translated yet, that's fine. Just leave the `lang: en` attribute in the frontmatter.

5. If the language you are translating into is read right-to-left (for example, Arabic or Hebrew), also add `dir: rtl` to the frontmatter.

6. Add your language to the `KNOWN_LANGUAGE` object in [config.ts](./src/config.ts). You'll now get some type errors on the `SIDEBAR` and `SIDEBAR_HEADER_MAP` objects in the same file. Follow the instructions in the comments and translate the requested entries.

7. When you're done, mark the pull request as ready for review.

### Reviewing

We aim to have 1-2 reviews on each PR before merging. This allows for some back and forth and ensures that the quality of the docs is high, and the tone is consistent.

We'd highly appreciate it if you knew someone who speaks the language you're translating into to review your PR. This can help speed up the process of getting your contribution merged.

### Maintaining

Naturally, the English docs will move faster than the translated ones. We've implemented a feature that alerts visitors if a translated version of a page is outdated. If you see that a page is outdated and you're able to update it, please do so!

We also have code owners for each language. Being a code owner means that you get notified when there is a PR that includes changes to the files of your language, so that you can review it.

Becoming a code owner is open to anyone who has contributed to a language, either by writing translations themselves or by reviewing those of others. If would like to become a code owner, either add your GitHub username to your language in [translations.yml](https://github.com/t3-oss/create-t3-app/blob/next/.github/workflows/translations.yml) or let us know in the `create-t3-translation` channel on [Discord](https://create.t3.gg/discord).
