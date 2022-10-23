type Options = {
  throwIfNotOk?: boolean;
  throwIfNoAuth?: boolean;
};

/**
 * helper to fetch the github api with auth token to avoid rate limiting
 */
export const fetchGithub = async (url: string, opts: Options) => {
  const { throwIfNotOk = true, throwIfNoAuth = true } = opts;

  const token = import.meta.env.PUBLIC_GITHUB_TOKEN;

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
    Message: ${data.message}`;
    if (throwIfNotOk) {
      throw new Error(msg);
    }
    console.warn(msg);
  }

  return data;
};
