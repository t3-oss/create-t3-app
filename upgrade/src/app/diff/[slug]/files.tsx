"use client";

import { type File as FileData } from "gitdiff-parser";
import { Fragment, useMemo, useState } from "react";
import { type ViewType, parseDiff } from "react-diff-view";
import { Decoration, Diff, Hunk } from "react-diff-view";
import { tokenize } from "~/lib/clientUtils";
import { cn } from "~/lib/utils";

export function Files(props: { diffText: string; viewType: ViewType }) {
  const files = parseDiff(props.diffText ?? "");
  const [expandedDiffs, setExpandedDiffs] = useState<boolean[]>(
    Array.from({ length: files.length }, () => false),
  );

  return (
    <div className="mt-4 w-full space-y-4">
      {files.map((file, index) => (
        <div
          key={`${file.newPath}-${index}`}
          className="rounded-xl bg-muted shadow-lg"
        >
          <FileComponent
            viewType={props.viewType}
            file={file}
            isExpanded={expandedDiffs[index] ?? true}
            setIsExpanded={(a) => {
              expandedDiffs[index] = a;
              setExpandedDiffs([...expandedDiffs]);
            }}
          />
        </div>
      ))}
    </div>
  );
}

const FileComponent = ({
  viewType,
  file,
  isExpanded,
  setIsExpanded,
}: {
  viewType: ViewType;
  file: FileData;
  isExpanded: boolean;
  setIsExpanded: (a: boolean) => void;
}) => {
  const { oldRevision, newRevision, type, hunks, oldPath, newPath } = file;

  const tokens = useMemo(() => tokenize(hunks), [hunks]);

  return (
    <div
      key={`${oldRevision}-${newRevision}`}
      className="rounded-lg border shadow-lg"
    >
      <button
        className={cn(
          "flex w-full flex-row justify-between p-4 font-mono",
          isExpanded && "border-b-2",
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-row gap-4">
          <div className="my-auto rounded-[4px] border px-1">
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

        <div className="my-auto rounded border px-1">
          {isExpanded ? "Collapse" : "Expand"}
        </div>
      </button>
      {isExpanded && (
        <Diff viewType={viewType} diffType={type} hunks={hunks} tokens={tokens}>
          {(hunks) =>
            hunks.map((hunk, i) => (
              <Fragment key={`hunk-${hunk.content}-${i}`}>
                <Decoration className="bg-primary/60 text-secondary">
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
