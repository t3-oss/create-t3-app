"use server";

import * as procs from "~/server/api/routers/post";
import { createAction } from "~/server/api/trpc";

export const createPost = createAction(procs.createPost);
