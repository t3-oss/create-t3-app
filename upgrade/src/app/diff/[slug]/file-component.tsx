"use client";

import { type File as FileData } from "gitdiff-parser";
import { Fragment, useMemo } from "react";
import { Decoration, Diff, Hunk, type ViewType } from "react-diff-view";
import { tokenize } from "~/lib/clientUtils";

const FileComponent = ({
  file,
  isExpanded,
  setIsExpanded,
  viewType,
}: {
  file: FileData;
  isExpanded: boolean;
  setIsExpanded: (a: boolean) => void;
  viewType: ViewType;
}) => {
  const { oldRevision, newRevision, type, hunks, oldPath, newPath } = file;

  const tokens = useMemo(() => tokenize(hunks), [hunks]);

  return (
    <div key={`${oldRevision}-${newRevision}`}>
      <button
        className={`flex w-full flex-row justify-between p-4 font-mono ${
          isExpanded ? "border-b-2" : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-row gap-4">
          <div className="my-auto rounded-[4px] border border-gray-500 px-1 text-gray-500">
            {type === "modify"
              ? "CHANGED"
              : type === "add"
              ? "ADDED"
              : type === "delete"
              ? "DELETED"
              : "UNKNOWN"}
          </div>
          <h1>
            {oldPath === "/dev/null"
              ? newPath
              : newPath === "/dev/null"
              ? oldPath
              : oldPath === newPath
              ? newPath
              : oldPath + " → " + newPath}
          </h1>
        </div>

        <div className="my-auto rounded-[4px] border border-gray-500 px-1 text-gray-500">
          {isExpanded ? "Collapse" : "Expand"}
        </div>
      </button>
      {isExpanded && (
        <Diff viewType={viewType} diffType={type} hunks={hunks} tokens={tokens}>
          {(hunks) =>
            hunks.map((hunk, i) => (
              <Fragment key={`hunk-${hunk.content}-${i}`}>
                <Decoration className="bg-gray-100 text-gray-400">
                  <span className="pl-20">{hunk.content}</span>
                </Decoration>
                <Hunk hunk={hunk} />
              </Fragment>
            ))
          }
        </Diff>
      )}
    </div>
  );
};

export default FileComponent;
