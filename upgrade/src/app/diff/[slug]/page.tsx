import { notFound } from "next/navigation";
import { extractVersionsAndFeatures, getDiffFromGithub } from "~/lib/utils";
import DiffPage from "./diff-page";

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params?.slug) {
    console.warn("No slug provided");
    notFound();
  }

  const versionsAndFeatures = extractVersionsAndFeatures(params.slug);

  if (!versionsAndFeatures) {
    console.warn("No versions and features provided");
    notFound();
  }

  try {
    const diff = await getDiffFromGithub(versionsAndFeatures);

    return (
      <DiffPage diffText={diff} versionsAndFeatures={versionsAndFeatures} />
    );
  } catch (e) {
    console.warn("Github API error", e);
    notFound();
  }
}
