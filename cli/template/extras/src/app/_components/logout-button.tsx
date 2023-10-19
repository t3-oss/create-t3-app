"use client";

import { useRouter } from "next/navigation";

export function LogOutButton({ className }: { className?: string }) {
  const router = useRouter();

  const logOut = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) return router.refresh();
  };

  return (
    <button onClick={logOut} className={className}>
      Log out
    </button>
  );
}
