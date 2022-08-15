import Algolia from "algoliasearch";
import { marked } from "marked";
import { readFile } from "node:fs/promises";

//import dotenv
import * as dotenv from "dotenv";

const env = dotenv.config().parsed;
const client = Algolia(
  env.ALGOLIA_APP_ID as string,
  env.ALGOLIA_API_KEY as string,
);
const index = client.initIndex(env.ALGOLIA_INDEX_NAME);
// scan directories in /src/pages for .md files, extract the title and description from between the two sets of ---, and add all pages to Algolia
require("glob")
  .sync("../src/pages/**/*.md")
  .map(async (file) => {
    const content = await readFile(file, "utf8");
    const title = content.match(/title: (.*)/)[1];
    const description = content.match(/description: (.*)/)[1];
    if (title && description) {
      console.log(`adding ${title} to Algolia`);
      index.saveObject({
        objectID: file,
        title,
        description,
        content: marked(content),
        url: file.replace(/\.\/src\//, "").replace(/\.md$/, ""),
      });
    }
  });
