// Example of a restricted route that only authenticated users can access https://next-auth.js.org/configuration/nextjs

import type { NextPage, GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { getServerAuthSession } from "../server/common/get-server-auth-session";

// If you need to use the session object,
// receive it as a prop and not from the useSession hook
const ProtectedPage: NextPage = () => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>You are only seeing this page because you are authenticated.</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default ProtectedPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession(ctx);

  // Checks if the session exists, which means the user is authenticated
  // If don't exist, keep sending the user to the index page
  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  }

  // You can send the session object as a prop
  // return { props: { session } };
  return { props: {} };
};
