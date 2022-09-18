/** @jsxImportSource react */
import { useState, useCallback, useRef } from "react";
import { ALGOLIA } from "../../config";
import "../../styles/algolia/style.css";

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
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium dark:bg-slate-700 bg-t3-purple-200/50 rounded-lg dark:text-slate-100"
      >
        <div className="flex items-center justify-center">
          <svg className="h-6 w-6" fill="none">
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="pl-1 lg:pl-3">Search</span>
        </div>

        <span className="border border-current px-1 rounded-md">
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
