import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function MyApp(appProps: AppProps<{ session: Session }>) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = appProps;
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
