import { Files } from "./files";
import HowToApplyDiff from "./how-to-apply-diff.mdx";
import { CheckIcon, ChevronRight, XIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, buttonVariants } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import {
  type Features,
  cn,
  extractVersionsAndFeatures,
  getDiffFromGithub,
  getFeatureUrl,
  prettyFeatureNameMap,
} from "~/lib/utils";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string>;
}) {
  if (!params?.slug) {
    console.warn("No slug provided");
    notFound();
  }

  const versionsAndFeatures = extractVersionsAndFeatures(params.slug);
  const viewType = searchParams["viewType"] === "split" ? "split" : "unified";

  if (!versionsAndFeatures) {
    console.warn("No versions and features provided");
    notFound();
  }

  const diff = await getDiffFromGithub(versionsAndFeatures).catch(() => {
    console.warn("Github API error");
    notFound();
  });

  return (
    <main className="min-h-screen py-4">
      <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
        Changes from {versionsAndFeatures?.currentVersion} to{" "}
        {versionsAndFeatures?.upgradeVersion}
      </h1>
      <div className="my-4 flex w-full items-center justify-center gap-4">
        <a
          href={URL.createObjectURL(new Blob([diff], { type: "text/plain" }))}
          className={cn(buttonVariants())}
          download={"t3-upgrade.patch"}
        >
          Download .patch file
        </a>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"}>How to apply the patch?</Button>
          </DialogTrigger>
          <DialogContent className="w-max">
            <HowToApplyDiff />
          </DialogContent>
        </Dialog>
      </div>
      <ul className="mx-2 my-3 grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {Object.entries(versionsAndFeatures.features).map(
          ([feature, enabled]) => (
            <li
              key={feature}
              className="col-span-1 flex rounded-md border shadow-sm transition-all hover:shadow-md"
            >
              <div
                className={cn(
                  "flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium",
                  enabled ? "bg-green-500" : "bg-destructive",
                )}
              >
                {enabled ? <CheckIcon /> : <XIcon />}
              </div>
              <a
                href={getFeatureUrl(feature)}
                target="_blank"
                className="flex flex-1 items-center justify-between truncate rounded-r-md px-4 py-2 text-left"
              >
                <div className="flex-1 truncate text-sm">
                  <span className="font-medium">
                    {prettyFeatureNameMap[feature as keyof Features]}
                  </span>
                </div>
                <div className="shrink-0">
                  <Button variant="ghost">
                    <span className="sr-only">Open website</span>
                    <ChevronRight />
                  </Button>
                </div>
              </a>
            </li>
          ),
        )}
      </ul>

      <div className="inline-flex h-12 w-full items-center justify-center rounded-md bg-muted p-1">
        <Link
          href={`/diff/${params.slug}?viewType=split`}
          className={cn(
            "inline-flex w-24 items-center justify-center whitespace-nowrap rounded-sm py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
            viewType === "split" && "bg-background",
          )}
        >
          Split
        </Link>
        <Link
          href={`/diff/${params.slug}?viewType=unified`}
          className={cn(
            "inline-flex w-24 items-center justify-center whitespace-nowrap rounded-sm py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
            viewType === "unified" && "bg-background",
          )}
        >
          Unified
        </Link>
      </div>

      <Files diffText={diff} />
    </main>
  );
}
