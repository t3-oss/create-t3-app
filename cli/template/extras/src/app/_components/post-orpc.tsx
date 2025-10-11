"use client";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useORPC } from "~/orpc/context";
import styles from "../index.module.css";

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
    <div className={styles.showcaseContainer}>
      {latestPost.data ? (
        <p className={styles.showcaseText}>
          Your most recent post: {latestPost.data.name}
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
