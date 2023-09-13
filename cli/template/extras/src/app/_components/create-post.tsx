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
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      >
        Submit
      </button>
    </form>
  );
}
