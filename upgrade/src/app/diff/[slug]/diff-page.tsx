"use client";

import FileComponent from "./file-component";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { parseDiff, type ViewType } from "react-diff-view";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { getFeatureUrl, type DiffLocation } from "~/lib/utils";

const DiffPage = ({
  diffText,
  versionsAndFeatures,
}: {
  diffText: string;
  versionsAndFeatures: DiffLocation;
}) => {
  const [viewType, setViewType] = useState<ViewType>("split");

  const files = parseDiff(diffText ?? "");

  const [expandedDiffs, setExpandedDiffs] = useState<boolean[]>(
    Array.from({ length: files.length }, () => true),
  );

  const downloadDiffFile = () => {
    const element = document.createElement("a");
    const file = new Blob([diffText], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = "t3-upgrade.patch";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <main className="min-h-screen bg-gray-200 py-4">
      <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
        Changes from {versionsAndFeatures?.currentVersion} to{" "}
        {versionsAndFeatures?.upgradeVersion}
      </h1>
      <div className="my-4 flex w-full flex-col items-center justify-center gap-4">
        <Button onClick={() => downloadDiffFile()}>Download .patch file</Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"link"}>How to apply the patch?</Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Applying the upgrade patch
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-5">
              <p>
                To apply the patch, you can use the following command:
                <p>
                  <code>git apply --reject ./t3-upgrade.patch</code>
                </p>
              </p>

              <p>
                This will create a new file with the changes that could not be
                applied. You can then use wiggle to apply the changes manually:
                <p>
                  <code>wiggle -r ./package.json ./package.json.rej</code>
                </p>
              </p>

              <p>
                This will apply the changes to the file, create a file called
                package.json.porig with the original file. In case of conflicts,
                it will add the conflict markers to the file. You can then
                resolve the conflicts manually.
              </p>

              <p>
                Remeber to place your patch file in the project directory, or
                use the correct file path.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="mx-2 my-3 grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {Object.entries(versionsAndFeatures.features).map(
          ([feature, enabled]) => (
            <li
              key={feature}
              className="col-span-1 flex rounded-md border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div
                className={`flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white ${
                  enabled ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {enabled ? <CheckIcon /> : <XIcon />}
              </div>
              <button
                className="flex flex-1 items-center justify-between truncate rounded-r-md px-4 py-2 text-left"
                onClick={() => window.open(getFeatureUrl(feature), "_blank")}
              >
                <div className="flex-1 truncate text-sm">
                  <span className="font-medium text-gray-900 hover:text-gray-600">
                    {feature}
                  </span>
                </div>
                <div className="shrink-0 pr-2">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open website</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </li>
          ),
        )}
      </ul>

      <div className="flex flex-col items-center">
        <div className="flex">
          <button
            className={`${
              viewType === "split" ? "bg-gray-300" : "bg-gray-200"
            } rounded-l-xl border-y border-l border-gray-300 px-4 py-2 transition-all`}
            onClick={() => setViewType("split")}
          >
            Split
          </button>
          <button
            className={`${
              viewType === "unified" ? "bg-gray-300" : "bg-gray-200"
            } rounded-r-xl border-y border-r border-gray-300 px-4 py-2 transition-all`}
            onClick={() => setViewType("unified")}
          >
            Unified
          </button>
        </div>
      </div>

      {files.map((file, index) => (
        <div
          key={`${file.newPath}-${index}`}
          className="m-2 my-4 rounded-xl bg-white shadow-lg"
        >
          <FileComponent
            file={file}
            isExpanded={expandedDiffs[index] ?? true}
            setIsExpanded={(a) => {
              expandedDiffs[index] = a;
              setExpandedDiffs([...expandedDiffs]);
            }}
            viewType={viewType}
          />
        </div>
      ))}
    </main>
  );
};

export default DiffPage;
