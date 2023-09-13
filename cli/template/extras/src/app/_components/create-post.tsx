"use client";

import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const text = new FormData(e.currentTarget).get("text") as string;
        createPost.mutate({ text });
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
