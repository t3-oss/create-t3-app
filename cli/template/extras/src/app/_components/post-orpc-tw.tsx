"use client";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useORPC } from "~/orpc/context";

export function LatestPost() {
  const [name, setName] = useState("");
  const orpc = useORPC();

  const latestPost = useSuspenseQuery(orpc.post.getLatest.queryOptions());
  const createPost = useMutation(
    orpc.post.create.mutationOptions({
      onSuccess() {
        void latestPost.refetch();
        setName("");
      },
    })
  );

  return (
    <div className="w-full max-w-xs">
      {latestPost.data ? (
        <p className="truncate">
          Your most recent post: {latestPost.data.name}
        </p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
