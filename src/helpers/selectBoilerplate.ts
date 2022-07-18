import type {
  InstallerOptions,
  PackageInfo,
  PkgInstallerMap,
} from "../installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "../consts.js";

type SelectBoilerplateProps = Required<
  Pick<InstallerOptions, "projectDir" | "packages">
>;
// This generates the _app.tsx file that is used to render the app
export const selectAppFile = async ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const appFileDir = path.join(PKG_ROOT, "template/page-studs/_app");

  const usingTrpc = packages.trpc.inUse;
  const usingNextAuth = packages.nextAuth.inUse;

  let appFile = "";
  if (usingNextAuth && usingTrpc) {
    appFile = "with-auth-trpc.tsx";
  } else if (usingNextAuth && !usingTrpc) {
    appFile = "with-auth.tsx";
  } else if (!usingNextAuth && usingTrpc) {
    appFile = "with-trpc.tsx";
  }

  if (appFile !== "") {
    const appSrc = path.join(appFileDir, appFile);
    const appDest = path.join(projectDir, "src/pages/_app.tsx");
    await fs.copy(appSrc, appDest);
  }
};

// This selects the proper index.tsx to be used that showcases the chosen tech
export const selectIndexFile = async ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const indexFile = path.join(projectDir, "src/pages/index.tsx");
  const indexFileWithTailwind = path.join(
    PKG_ROOT,
    "template/page-studs/index-with-tw.tsx",
  );

  const usingTrpc = packages.trpc.inUse;
  const usingTw = packages.tailwind.inUse;
  const usingPrisma = packages.prisma.inUse;
  // FIXME: auth showcase needs trpc and doesn't work with prisma since it requires more setup
  const usingNextAuth = packages.nextAuth.inUse && usingTrpc && !usingPrisma;

  if (usingTw) {
    await fs.copy(indexFileWithTailwind, indexFile);
  }

  const input = await fs.readFile(indexFile, { encoding: "utf-8" });
  let output = input;

  output = addMissingTechnologyCards(output, usingTw, packages);

  if (usingNextAuth) {
    output = addAuth(output, usingTw);
  }
  if (usingTrpc) {
    output = addTrpc(output, usingTw, usingNextAuth);
  }

  await fs.writeFile(indexFile, output, { encoding: "utf-8" });
};

const addMissingTechnologyCards = (
  input: string,
  usingTw: boolean,
  packages: PkgInstallerMap,
): string => {
  const getPackageCard = ({
    name,
    description,
    URL,
  }: PackageInfo) => `        <TechnologyCard
            name="${name}"
            description="${description}"
            documentation="${URL}"
          />\n  `;

  const endOfPackageList = usingTw ? "      </div>\n" : "      </ul>\n";

  const packagesInfo = Object.entries(packages)
    .filter(([k, p]) => k !== "tailwind" && p.inUse && Boolean(p.info))
    .map(([, p]) => (p.info ? getPackageCard(p.info) : ""));

  const packageCount = packagesInfo.length;
  const twColumns = packageCount === 1 ? 2 : 3;

  console.log({ packageCount, twColumns });

  return input
    .replace(endOfPackageList, `${packagesInfo.join("")}${endOfPackageList}`)
    .replace(`md:grid-cols-3`, `md:grid-cols-${twColumns}`);
};

const addAuth = (input: string, usingTw: boolean): string => {
  const headImport = `import Head from "next/head";`;
  const authOutput = `import { signIn, signOut, useSession } from "next-auth/react";\n
const AuthShowcase: React.FC = () => {
  const { data: secretMessage, isLoading } = trpc.useQuery([
    "auth.getSecretMessage",
  ]);

  const { data: sessionData } = useSession();

  return (
    <div>
      {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p>{secretMessage}</p>}
      <button${
        usingTw
          ? `\n        className="px-4 py-2 border-2 border-blue-500 rounded-md"`
          : ""
      }
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};`;

  return input.replace(headImport, `${headImport}\n${authOutput}`);
};

const addTrpc = (
  input: string,
  usingTw: boolean,
  usingAuth: boolean,
): string => {
  const headImport = `import Head from "next/head";`;
  const trpcImport = `import { trpc } from "../utils/trpc";`;
  const trpcOutput = `        <div${
    usingTw
      ? ` className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full"`
      : ""
  }>
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>\n`;
  const endOfPackageList = usingTw ? "      </div>\n" : "      </ul>\n";

  const output = input.replace(headImport, `${headImport}\n${trpcImport}`);

  if (usingAuth) {
    return output.replace(
      endOfPackageList,
      `${endOfPackageList}        <AuthShowcase />\n`,
    );
  }

  return output
    .replace(endOfPackageList, `${endOfPackageList}${trpcOutput}`)
    .replace(
      `const Home: NextPage = () => {`,
      `const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);\n`,
    );
};
