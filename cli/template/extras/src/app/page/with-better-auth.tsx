import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "~/server/better-auth";
import { getSession } from "~/server/better-auth/server";
import styles from "./index.module.css";

export default async function Home() {
  const session = await getSession();

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
          <div className={styles.authContainer}>
            <p className={styles.showcaseText}>
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            {!session ? (
              <form>
                <button
                  className={styles.loginButton}
                  formAction={async () => {
                    "use server";
                    const res = await auth.api.signInSocial({
                      body: {
                        provider: "github",
                        callbackURL: "/",
                      },
                    });
                    if (!res.url)
                      throw new Error("No URL returned from signInSocial");
                    redirect(res.url);
                  }}
                >
                  Sign in with Github
                </button>
              </form>
            ) : (
              <form>
                <button
                  className={styles.loginButton}
                  formAction={async () => {
                    "use server";
                    await auth.api.signOut({ headers: await headers() });
                    redirect("/");
                  }}
                >
                  Sign out
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
