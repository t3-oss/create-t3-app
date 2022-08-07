import type { NextPage, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/common/get-server-auth-session";

const ProtectedPage: NextPage = () => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>You're only seeing this page because you're authenticated.</p>
    </div>
  );
};

export default ProtectedPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  }

  // You can send the session object as a prop
  return { props: {} };
};
