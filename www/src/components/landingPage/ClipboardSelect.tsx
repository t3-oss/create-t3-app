import clsx from "clsx";
import { useState } from "react";

interface CommandItem {
  manager: string;
  command: string;
}

const packageManagers: CommandItem[] = [
  { manager: "npm", command: "npm create t3-app@latest" },
  { manager: "pnpm", command: "pnpm create t3-app@latest" },
  { manager: "yarn", command: "yarn create t3-app" },
  { manager: "bun", command: "bun create t3-app@latest" },
];

export default function ClipboardSelect() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const active = packageManagers[selectedIdx] ?? packageManagers[0]!;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="relative overflow-hidden rounded-xl border border-t3-purple-200/20 bg-[#121118]/85 shadow-2xl backdrop-blur-md transition-all duration-200 hover:border-t3-purple-200/40">
        {/* Top bar with tabs & copy button */}
        <div className="flex items-center justify-between border-b border-t3-purple-200/10 px-2.5 py-1.5 sm:px-3 sm:py-2">
          <div className="flex items-center gap-1.5">
            {/* Terminal prompt symbol badge */}
            <div className="flex h-6 w-6 select-none items-center justify-center rounded-md border border-t3-purple-200/15 bg-t3-purple-200/5 font-mono text-xs font-semibold text-t3-purple-200/80">
              &gt;_
            </div>

            {/* Package manager tabs */}
            <div className="flex items-center gap-1">
              {packageManagers.map((item, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={item.manager}
                    type="button"
                    onClick={() => {
                      setSelectedIdx(idx);
                      setCopied(false);
                    }}
                    className={clsx(
                      "cursor-pointer rounded-lg px-2.5 py-1 font-mono text-xs font-medium transition-all duration-150 sm:text-sm",
                      isSelected
                        ? "border border-t3-purple-200/30 bg-t3-purple-200/15 text-white shadow-sm"
                        : "border border-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
                    )}
                  >
                    {item.manager}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Copy button */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex cursor-pointer items-center justify-center rounded-lg border border-transparent p-1.5 text-zinc-400 transition-colors focus:outline-none hover:border-t3-purple-200/20 hover:bg-t3-purple-200/10 hover:text-white"
            aria-label="Copy command"
            title="Copy command"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4ade80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>

        {/* Command code content */}
        <div
          onClick={handleCopy}
          className="group/code flex cursor-pointer items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5"
          title="Click to copy"
        >
          <code className="font-mono text-xs text-zinc-100 selection:bg-t3-purple-500/30 sm:text-sm">
            {active.command}
          </code>
        </div>
      </div>
    </div>
  );
}
