import batchRequests from "@/lib/batchRequests";
import { type GetServerSideProps, type NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const startTime = performance.now();
  const { missingDiffs } = await batchRequests(Number(params?.count));
  const endTime = performance.now();

  return {
    props: {
      missingDiffs,
      duration: endTime - startTime,
    },
  };
};

interface BatchPageProps {
  missingDiffs: string[];
  duration: number;
}

const BatchPage: NextPage<BatchPageProps> = ({ missingDiffs, duration }) => (
  <div>
    <h1>
      Generated {missingDiffs.length} diffs in {duration}
    </h1>

    {missingDiffs.length > 0 && (
      <div>
        <h2>Generated:</h2>
        <ul>
          {missingDiffs.map((missingDiff) => (
            <li key={missingDiff}>{missingDiff}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default BatchPage;
