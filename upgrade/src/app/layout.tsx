import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "react-diff-view/style/index.css";

import "~/styles/globals.css";
import "~/styles/prismjs.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body>
        <div className={inter.className}>{children}</div>
      </body>
    </html>
  );
}
