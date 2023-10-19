"use client";

import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export function LogOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const logOut = api.auth.logOut.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <button onClick={() => logOut.mutate()} className={className}>
      {logOut.isLoading ? "Loading..." : "Log out"}
    </button>
  );
}
