"use client";

import {
  markEdits,
  tokenize as tokennizeReactDiffView,
  type HunkData,
} from "react-diff-view";
import { refractor } from "refractor";
import ts from "refractor/lang/typescript";

export const tokenize = (hunks: HunkData[]) => {
  if (!hunks) {
    return undefined;
  }

  refractor.register(ts);

  try {
    return tokennizeReactDiffView(hunks, {
      highlight: true,
      enhancers: [markEdits(hunks, { type: "block" })],
      language: "typescript",
      refractor,
    });
  } catch (e) {
    return undefined;
  }
};
