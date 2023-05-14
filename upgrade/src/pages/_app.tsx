import { type AppType } from "next/dist/shared/lib/utils";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import "react-diff-view/style/index.css";
import "@/styles/prismjs.css";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
