import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

import { signIn, signOut, useSession } from "next-auth/react";

const AuthShowcase: React.FC = () => {
  const { data: secretMessage, isLoading } = trpc.useQuery([
    "auth.getSecretMessage",
  ]);

  const { data: sessionData } = useSession();

  return (
    <div>
      {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p>{secretMessage}</p>}
      <button onClick={sessionData ? () => signOut() : () => signIn()}>
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

interface TechnologyCardProps {
  name: string;
  description: string;
  documentation: string;
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>
          Create <span>T3</span> App
        </h1>
        <div>
          <h3>This stack uses:</h3>
          <ul>
            <TechnologyCard
              name="NextJS"
              description="The React framework for production"
              documentation="https://nextjs.org/"
            />
            <TechnologyCard
              name="TypeScript"
              description="Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale"
              documentation="https://www.typescriptlang.org/"
            />
            <TechnologyCard
              name="TailwindCSS"
              description="Rapidly build modern websites without ever leaving your HTML"
              documentation="https://tailwindcss.com/"
            />
            <TechnologyCard
              name="tRPC"
              description="End-to-end typesafe APIs made easy"
              documentation="https://trpc.io/"
            />
            <TechnologyCard
              name="Next-Auth"
              description="Authentication for Next.js"
              documentation="https://next-auth.js.org/"
            />
            <TechnologyCard
              name="Prisma"
              description="Build data-driven JavaScript & TypeScript apps in less time"
              documentation="https://www.prisma.io/docs/"
            />
          </ul>
        </div>
        <AuthShowcase />
      </div>
    </>
  );
};

export default Home;

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <li>
      <a href={documentation} target="_blank" rel="noreferrer">
        <strong>{name}</strong> - {description}
      </a>
    </li>
  );
};
