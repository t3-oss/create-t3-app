import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${GeistSans.variable}`}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
