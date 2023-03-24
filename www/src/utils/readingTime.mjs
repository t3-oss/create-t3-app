import { visit } from "unist-util-visit";
import getReadingTime from "reading-time";

export const remarkReadingTime = () => {
  return (tree, file) => {
    let text = "";

    visit(tree, ["text", "code"], (node) => {
      text += node.value;
    });

    file.data.astro.frontmatter.readingTime = getReadingTime(text).text;
  };
};
