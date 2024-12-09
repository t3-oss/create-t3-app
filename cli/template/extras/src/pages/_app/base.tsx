import { type AppType } from "next/dist/shared/lib/utils";
import { Geist } from "next/font/google";
import React from "react";

import "~/styles/globals.css";

const geist = Geist({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={geist.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
