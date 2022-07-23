import path from "path";
import fs from "fs-extra";

export const getAllFiles = (dir: string, base = "") => {
  // modified from
  // https://gist.github.com/kethinov/6658166?permalink_comment_id=3379782#gistcomment-3379782
  // https://gist.github.com/kethinov/6658166?permalink_comment_id=2389484#gistcomment-2389484
  let fileList: string[] = [];

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fileList = [...fileList, ...getAllFiles(fullPath, file)];
    } else {
      fileList.push(path.join(base, file));
    }
  }

  return fileList;
};
