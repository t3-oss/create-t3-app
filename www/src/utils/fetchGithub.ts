type Options = {
  throwIfNotOk?: boolean;
  throwIfNoAuth?: boolean;
};

/** Helper function to fetch the GitHub API with an auth token to avoid rate limiting. */
export const fetchGithub = async (url: string, opts: Options) => {
  const { throwIfNotOk = true, throwIfNoAuth = true } = opts;

  const token = import.meta.env.PUBLIC_GITHUB_TOKEN as string | undefined;

  if (!token) {
    const msg =
      "No Github token found. Please set PUBLIC_GITHUB_TOKEN in .env to avoid rate limiting.";
    if (throwIfNoAuth) {
      throw new Error(msg);
    }
    console.warn(msg);
    return fetch(url);
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

  return data;
};
