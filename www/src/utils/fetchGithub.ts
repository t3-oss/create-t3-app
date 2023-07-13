import { z } from "zod";

interface Options<T extends "commits" | "repo"> {
  throwIfNotOk?: boolean;
  throwIfNoAuth?: boolean;
  fetchType: T;
}

export const repoSchema = z.object({
  stargazers_count: z.number(),
});

export const commitsSchema = z.array(
  z.object({
    commit: z.object({
      author: z.object({
        date: z.string(),
      }),
    }),
    author: z.object({
      login: z.string(),
      id: z.number(),
    }),
  }),
);

export type Commit = z.infer<typeof commitsSchema>[number];

/** Helper function to fetch the GitHub API with an auth token to avoid rate limiting. */
export const fetchGithub = async <T extends "commits" | "repo">(
  url: string,
  opts: Options<T>,
): Promise<z.infer<
  T extends "repo" ? typeof repoSchema : typeof commitsSchema
> | null> => {
  const { throwIfNotOk = true, throwIfNoAuth = true, fetchType } = opts;

  const schema = fetchType === "commits" ? commitsSchema : repoSchema;

  const token = import.meta.env.PUBLIC_GITHUB_TOKEN as string | undefined;

  if (!token) {
    const msg =
      "No Github token found. Please set PUBLIC_GITHUB_TOKEN in .env to avoid rate limiting.";
    if (throwIfNoAuth) {
      throw new Error(msg);
    }
    console.warn(msg);

    const response = await fetch(url);
    const data = await response.json();

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      console.warn(
        "Could not parse GitHub API response. This could be caused by rate limiting.",
      );

      return null;
    }

    return parsed.data;
  }

  const auth = `Basic ${Buffer.from(token, "binary").toString("base64")}`;

  const res = await fetch(url, {
    headers: {
      Authorization: auth,
      "User-Agent": "@ct3a-www/1.0",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const msg = `Request to fetch ${url} failed. Reason: ${res.statusText}
    Message: ${
      data && typeof data === "object" && "message" in data
        ? data.message
        : "unknown"
    }`;
    if (throwIfNotOk) {
      throw new Error(msg);
    }
    console.warn(msg);
  }

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const msg = "Could not parse GitHub API response.";
    if (throwIfNotOk) {
      throw new Error(msg);
    }
    console.warn(msg);

    return null;
  }

  return parsed.data;
};
