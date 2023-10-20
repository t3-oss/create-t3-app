import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState } from "react";

const commands = [
  {
    command: "npm create t3-app@latest",
    manager: "npm",
  },
  {
    command: "yarn create t3-app",
    manager: "yarn",
  },
  {
    command: "pnpm create t3-app@latest",
    manager: "pnpm",
  },
  {
    command: "bunx create-t3-app@latest",
    manager: "bunx",
  },
];

export default function ClipboardSelect() {
  const [coolDown, setCoolDown] = useState(false);

  const handleCopyToClipboard = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const checkStyles = {
    strokeDasharray: 450,
    strokeDashoffset: -30,
  };

  return (
    <div className="flex items-center gap-2">
      <Menu as="div">
        <div className="relative">
          <Menu.Button className="relative flex cursor-pointer items-center justify-center rounded-lg border bg-t3-purple-200/50 p-2 text-left focus:outline-none hover:bg-t3-purple-200/75 dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:hover:border-t3-purple-200/50 sm:text-sm">
            <svg
              className={`h-[1em] w-[1em] ${coolDown && "hidden"}`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <svg
              className={`animate-draw h-[1em] w-[1em] ${
                !coolDown && "hidden"
              }`}
              style={checkStyles}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter={"transition ease-out duration-100"}
            enterFrom={"transform opacity-0 -translate-y-1"}
            enterTo={"transform opacity-100 -translate-y-0"}
          >
            <Menu.Items
              className={clsx(
                "focus-none shadow-l t3-scrollbar absolute right-0 mt-1 max-h-60 w-fit min-w-[6em] overflow-auto rounded-lg border bg-default text-base focus:outline-none focus-visible:outline-none dark:border-t3-purple-200/20 sm:text-sm",
              )}
            >
              {commands.map(({ command, manager }) => (
                <Menu.Item key={manager}>
                  {({ active }) => {
                    return (
                      <button
                        className={`${
                          active && "bg-violet-500 text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => {
                          handleCopyToClipboard(command)
                            .then(() => {
                              setCoolDown(true);
                              setTimeout(() => {
                                setCoolDown(false);
                              }, 1000);
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        {manager}
                      </button>
                    );
                  }}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
    </div>
  );
}
