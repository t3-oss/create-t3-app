/**
 * helper to fetch the github api with auth token to avoid rate limiting
 */
export const fetchGithub = async (url: string, shouldThrow = false) => {
  const token = import.meta.env.PUBLIC_GITHUB_TOKEN;

  if (!token) {
    if (shouldThrow) {
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

  return fetch(url, {
    headers: {
      Authorization: auth,
      "User-Agent": "@ct3a-www/1.0",
    },
  }).then((res) => res.json());
};
