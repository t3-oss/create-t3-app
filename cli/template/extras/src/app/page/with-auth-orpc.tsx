import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api } from "~/server/api";
import { auth } from "~/server/auth";
import styles from "./index.module.css";

export default async function Home() {
  const hello = await api.post.hello({ text: "from oRPC" });
  const session = await auth();

  let secretMessage;
  if (session) {
    secretMessage = await api.post.getSecretMessage();
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Create <span className={styles.pinkSpan}>T3</span> App
        </h1>
        <div className={styles.cardRow}>
          <Link
            className={styles.card}
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className={styles.cardTitle}>First Steps →</h3>
            <div className={styles.cardText}>
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className={styles.card}
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className={styles.cardTitle}>Documentation →</h3>
            <div className={styles.cardText}>
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div className={styles.showcaseContainer}>
          <p className={styles.showcaseText}>
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
          <p className={styles.showcaseText}>{secretMessage}</p>
          <div className={styles.authContainer}>
            <p className={styles.showcaseText}>
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className={styles.loginButton}
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>

        {session?.user && <LatestPost />}
      </div>
    </main>
  );
}
