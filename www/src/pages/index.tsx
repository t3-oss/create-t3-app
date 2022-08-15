import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import toast, { Toaster } from "react-hot-toast";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="Create web application with the T3 stack"
    >
      <main>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <img src="/img/t3-logo.png" width="80" height="80" alt="lol" />
          <div className="pt-4" />
          <h1 className="dark:text-[#E8DCFF] text-violet-500 text-5xl font-bold text-center anim-1">
            Create{" "}
            <span className="dark:text-violet-300 text-violet-400">T3</span> App
          </h1>

          <div className="pt-12 md:pt-6" />
          <code
            id="command"
            className="px-3 py-1.5 text-base text-blue-300 rounded-md cursor-pointer bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 anim-2"
            onClick={() => {
              void navigator.clipboard.writeText("npx create-t3-app@latest");

              toast.success("Copied", {
                style: {
                  background: "#262626",
                  color: "#E8DCFF",
                },
                iconTheme: {
                  primary: "#E8DCFF",
                  secondary: "#262626",
                },
              });
            }}
          >
            npx create-t3-app@latest
          </code>

          <div className="mt-4" />
          <div className="flex gap-4 font-medium dark:text-neutral-300 text-zinc-700 anim-2">
            <a
              href="https://github.com/t3-oss/create-t3-app"
              rel="noreferrer"
              target="_blank"
              className="px-3 py-1 transition-all duration-200 rounded-md hover:bg-neutral-800"
            >
              GitHub
            </a>
            <a
              href="https://init.tips"
              rel="noreferrer"
              target="_blank"
              className="px-3 py-1 transition-all duration-200 rounded-md hover:bg-neutral-800"
            >
              T3 Stack
            </a>
          </div>

          <div className="fixed cursor-pointer bottom-8">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://vercel.com?utm_source=t3-oss&utm_campaign=oss"
            >
              <img
                src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
                alt="Powered by Vercel"
                width="212"
                height="44"
              />
            </a>
          </div>
          <Toaster />
        </div>
      </main>
    </Layout>
  );
}
