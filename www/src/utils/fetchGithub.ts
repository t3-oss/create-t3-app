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
    if (throwIfNoAuth) {
      throw new Error(
        'Cannot find "PUBLIC_GITHUB_TOKEN" used for escaping rate-limiting.',
      );
    }
    console.warn(
      "No Github token found. Please set PUBLIC_GITHUB_TOKEN in .env to avoid rate limiting.",
    );
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
    if (throwIfNotOk) {
      throw new Error(`Request to fetch ${url} failed. Reason: ${res.statusText}
      Message: ${data.message}`);
    }
    console.warn(`Failed to fetch ${url}`);
  }

  return data;
};
