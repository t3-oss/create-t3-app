import "react-diff-view/style/index.css";
import "~/styles/globals.css";
import "~/styles/prismjs.css";
import { Github } from "lucide-react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Upgrade T3 App",
  description: "A tool to upgrade your create-t3-app instance",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-screen">
      <body className={cn(inter.variable, "font-sans")}>
        <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
          <div className="container flex grow flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Upgrade <span className="text-purple-400">T3</span> App
            </h1>
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="pb-5">
      <a
        href="https://github.com/t3-oss/create-t3-app/tree/next/upgrade"
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <Github className="h-8 w-8" /> Open Source by Andrei Filip on GitHub
      </a>
    </footer>
  );
}
