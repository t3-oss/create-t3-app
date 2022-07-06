import "../styles/globals.css";
import type { AppProps } from "next/dist/shared/lib/utils";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
