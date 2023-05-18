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

export const dynamic = "force-dynamic";

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
  const viewType = searchParams["viewType"] === "unified" ? "unified" : "split";

  console.log({
    searchParams,
    viewType,
  });

  if (!versionsAndFeatures) {
    console.warn("No versions and features provided");
    notFound();
  }

  const diff = await getDiffFromGithub(versionsAndFeatures).catch(() => {
    console.warn("Github API error");
    notFound();
  });

  return (
    <main className="container flex min-h-[calc(100vh-4rem)] min-w-[900px] flex-col py-8">
      <div className="mx-auto w-full max-w-4xl">
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
        <ul className="my-4 grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {Object.entries(versionsAndFeatures.features).map(
            ([feature, enabled]) => (
              <li
                key={feature}
                className="col-span-1 flex h-14 rounded border shadow-sm transition-all hover:shadow-md"
              >
                <div
                  className={cn(
                    "flex w-16 shrink-0 items-center justify-center rounded-l text-sm font-medium",
                    enabled ? "bg-success" : "bg-destructive",
                  )}
                >
                  {enabled ? <CheckIcon /> : <XIcon />}
                </div>
                <a
                  href={getFeatureUrl(feature)}
                  target="_blank"
                  className="flex flex-1 items-center justify-between truncate rounded-r p-2 text-left"
                >
                  <div className="flex-1 truncate text-sm">
                    <span className="font-medium">
                      {prettyFeatureNameMap[feature as keyof Features]}
                    </span>
                  </div>

                  <Button variant="ghost" className="px-2">
                    <span className="sr-only">Open website</span>
                    <ChevronRight />
                  </Button>
                </a>
              </li>
            ),
          )}
        </ul>
      </div>

      <div className="w-full max-w-7xl">
        <div className="inline-flex h-12 w-full items-center justify-center rounded bg-muted p-1 text-muted-foreground">
          <Link
            href={`/diff/${params.slug}?viewType=split`}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-10 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              viewType === "split" && "bg-background text-foreground shadow-sm",
            )}
          >
            Split
          </Link>
          <Link
            href={`/diff/${params.slug}?viewType=unified`}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-10 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background",
              viewType === "unified" &&
                "bg-background text-foreground shadow-sm",
            )}
          >
            Unified
          </Link>
          <span className="ml-4">or</span>
          <Link
            href={
              "https://github.com/t3-oss/create-t3-app/compare/" +
              encodeURIComponent(
                `create-t3-app@${versionsAndFeatures.currentVersion}...create-t3-app@${versionsAndFeatures.upgradeVersion}`,
              )
            }
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-2 text-sm font-medium ring-offset-background transition-all hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background",
            )}
          >
            View on Github
          </Link>
        </div>
        <Files diffText={diff} viewType={viewType} />
      </div>
    </main>
  );
}
