import { router as _router } from "@trpc/server";
import type { Context } from "./context";

export const router = () => _router<Context>();
