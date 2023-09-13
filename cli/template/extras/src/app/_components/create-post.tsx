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
      onSubmit={(e) => {
        e.preventDefault();

        const text = new FormData(e.currentTarget).get("text") as string;
        createPost.mutate({ text });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        name="text"
        placeholder="Title"
        className="w-full rounded p-2"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
