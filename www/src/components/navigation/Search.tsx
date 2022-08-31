/** @jsxImportSource react */
import { useState, useCallback, useRef } from "react";
import { ALGOLIA } from "../../config";
import "@docsearch/css";

import { createPortal } from "react-dom";
import * as docSearchReact from "@docsearch/react";

/** FIXME: This is still kinda nasty, but DocSearch is not ESM ready. */
const DocSearchModal =
  docSearchReact.DocSearchModal ||
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (docSearchReact as any).default.DocSearchModal;
const useDocSearchKeyboardEvents =
  docSearchReact.useDocSearchKeyboardEvents ||
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (docSearchReact as any).default.useDocSearchKeyboardEvents;

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [initialQuery, setInitialQuery] = useState("");

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    (e: KeyboardEvent) => {
      setIsOpen(true);
      setInitialQuery(e.key);
    },
    [setIsOpen, setInitialQuery],
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <>
      <button
        type="button"
        ref={searchButtonRef}
        onClick={onOpen}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-white dark:text-gray-700 dark:bg-t3-purple-100 bg-white/10 rounded-lg"
      >
        <div className="flex items-center justify-center text-white dark:text-slate-900 dark:stroke-slate-900">
          <svg width="24" height="24" fill="none">
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="pl-1 lg:pl-3 text-white dark:text-slate-900">
            Search
          </span>
        </div>

        <span className="border px-1 rounded-md border-white text-white dark:border-slate-900 dark:text-slate-900">
          <span className="sr-only">Press </span>

          <kbd>/</kbd>

          <span className="sr-only"> to search</span>
        </span>
      </button>

      {isOpen &&
        createPortal(
          <DocSearchModal
            initialQuery={initialQuery}
            initialScrollY={window.scrollY}
            onClose={onClose}
            indexName={ALGOLIA.indexName}
            appId={ALGOLIA.appId}
            apiKey={ALGOLIA.apiKey}
            transformItems={(items) => {
              return items.map((item) => {
                // We transform the absolute URL into a relative URL to
                // work better on localhost, preview URLS.
                const a = document.createElement("a");
                a.href = item.url;
                const hash = a.hash === "#overview" ? "" : a.hash;
                return {
                  ...item,
                  url: `${a.pathname}${hash}`,
                };
              });
            }}
          />,
          document.body,
        )}
    </>
  );
}
