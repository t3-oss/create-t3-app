import "react-diff-view/style/index.css";
import "~/styles/globals.css";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.variable,
          "min-h-screen bg-gradient-to-b from-background to-muted font-sans",
        )}
      >
        <div className="container mx-auto">
          {children}
          <footer className="flex justify-center pb-4">
            <a
              href="https://github.com/t3-oss/create-t3-app/tree/next/upgrade"
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Github className="h-8 w-8" /> Open Source by Andrei Filip on
              GitHub
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
