import type { AppRouter } from "../pages/api/trpc/[trpc]";
import { createReactQueryHooks } from "@trpc/react";

export const trpc = createReactQueryHooks<AppRouter>();
