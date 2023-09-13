"use client";

import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";

export function CreatePost() {
  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const text = new FormData(e.currentTarget).get("text") as string;
        await api.post.create.mutate({ text });
        router.refresh();
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        name="text"
        placeholder="Title"
        className="w-full rounded bg-primary p-2 text-background"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
