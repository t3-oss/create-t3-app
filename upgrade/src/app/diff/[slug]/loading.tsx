import { cn } from "~/lib/utils";

const shimmer = `overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

export default function Loading() {
  return (
    <div className="container col-span-4 space-y-4 py-8 lg:col-span-1">
      <div className="mx-auto h-12 w-1/2 rounded bg-muted" />
      <div className="flex w-full justify-center gap-8">
        <div className="h-10 w-44 rounded bg-muted" />
        <div className="h-10 w-44 rounded bg-muted" />
      </div>
      <div className="mx-auto flex w-max gap-6">
        <div className="mx-auto h-14 w-[204px] rounded border bg-muted" />
        <div className="mx-auto h-14 w-[204px] rounded border bg-muted" />
        <div className="mx-auto h-14 w-[204px] rounded border bg-muted" />
        <div className="mx-auto h-14 w-[204px] rounded border bg-muted" />
      </div>
      <div className="h-12 w-full rounded bg-muted" />
      <div
        className={cn("relative h-[800px] rounded border bg-muted", shimmer)}
      />
    </div>
  );
}
