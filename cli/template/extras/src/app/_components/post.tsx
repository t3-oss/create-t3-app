"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";

import { useTRPC } from "~/trpc/react";
import styles from "../index.module.css";

export function LatestPost() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: latestPost } = useSuspenseQuery(
    trpc.post.getLatest.queryOptions()
  );

  const [name, setName] = useState("");
  const createPost = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: trpc.post.pathKey() });
        setName("");
      },
    })
  );

  return (
    <div className={styles.showcaseContainer}>
      {latestPost ? (
        <p className={styles.showcaseText}>
          Your most recent post: {latestPost.name}
        </p>
      ) : (
        <p className={styles.showcaseText}>You have no posts yet.</p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className={styles.form}
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
