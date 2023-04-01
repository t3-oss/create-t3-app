import { z } from "zod";

type Options<T extends "repo" | "commits"> = {
  throwIfNotOk?: boolean;
  throwIfNoAuth?: boolean;
  fetchType: T;
};

export const repoSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  name: z.string(),
  full_name: z.string(),
  private: z.boolean(),
  owner: z.object({
    login: z.string(),
    id: z.number(),
    node_id: z.string(),
    avatar_url: z.string(),
    gravatar_id: z.string(),
    url: z.string(),
    html_url: z.string(),
    followers_url: z.string(),
    following_url: z.string(),
    gists_url: z.string(),
    starred_url: z.string(),
    subscriptions_url: z.string(),
    organizations_url: z.string(),
    repos_url: z.string(),
    events_url: z.string(),
    received_events_url: z.string(),
    type: z.string(),
    site_admin: z.boolean(),
  }),
  html_url: z.string(),
  description: z.string(),
  fork: z.boolean(),
  url: z.string(),
  forks_url: z.string(),
  keys_url: z.string(),
  collaborators_url: z.string(),
  teams_url: z.string(),
  hooks_url: z.string(),
  issue_events_url: z.string(),
  events_url: z.string(),
  assignees_url: z.string(),
  branches_url: z.string(),
  tags_url: z.string(),
  blobs_url: z.string(),
  git_tags_url: z.string(),
  git_refs_url: z.string(),
  trees_url: z.string(),
  statuses_url: z.string(),
  languages_url: z.string(),
  stargazers_url: z.string(),
  contributors_url: z.string(),
  subscribers_url: z.string(),
  subscription_url: z.string(),
  commits_url: z.string(),
  git_commits_url: z.string(),
  comments_url: z.string(),
  issue_comment_url: z.string(),
  contents_url: z.string(),
  compare_url: z.string(),
  merges_url: z.string(),
  archive_url: z.string(),
  downloads_url: z.string(),
  issues_url: z.string(),
  pulls_url: z.string(),
  milestones_url: z.string(),
  notifications_url: z.string(),
  labels_url: z.string(),
  releases_url: z.string(),
  deployments_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  git_url: z.string(),
  ssh_url: z.string(),
  clone_url: z.string(),
  svn_url: z.string(),
  homepage: z.string(),
  size: z.number(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  language: z.string(),
  has_issues: z.boolean(),
  has_projects: z.boolean(),
  has_downloads: z.boolean(),
  has_wiki: z.boolean(),
  has_pages: z.boolean(),
  has_discussions: z.boolean(),
  forks_count: z.number(),
  archived: z.boolean(),
  disabled: z.boolean(),
  open_issues_count: z.number(),
  license: z.object({
    key: z.string(),
    name: z.string(),
    spdx_id: z.string(),
    url: z.string(),
    node_id: z.string(),
  }),
  allow_forking: z.boolean(),
  is_template: z.boolean(),
  web_commit_signoff_required: z.boolean(),
  topics: z.array(z.string()),
  visibility: z.string(),
  forks: z.number(),
  open_issues: z.number(),
  watchers: z.number(),
  default_branch: z.string(),
  organization: z.object({
    login: z.string(),
    id: z.number(),
    node_id: z.string(),
    avatar_url: z.string(),
    gravatar_id: z.string(),
    url: z.string(),
    html_url: z.string(),
    followers_url: z.string(),
    following_url: z.string(),
    gists_url: z.string(),
    starred_url: z.string(),
    subscriptions_url: z.string(),
    organizations_url: z.string(),
    repos_url: z.string(),
    events_url: z.string(),
    received_events_url: z.string(),
    type: z.string(),
    site_admin: z.boolean(),
  }),
  network_count: z.number(),
  subscribers_count: z.number(),
});

export const commitsSchema = z.array(
  z.object({
    sha: z.string(),
    node_id: z.string(),
    commit: z.object({
      author: z.object({
        name: z.string(),
        email: z.string(),
        date: z.string(),
      }),
      committer: z.object({
        name: z.string(),
        email: z.string(),
        date: z.string(),
      }),
      message: z.string(),
      tree: z.object({ sha: z.string(), url: z.string() }),
      url: z.string(),
      comment_count: z.number(),
      verification: z.object({
        verified: z.boolean(),
        reason: z.string(),
        signature: z.string(),
        payload: z.string(),
      }),
    }),
    url: z.string(),
    html_url: z.string(),
    comments_url: z.string(),
    author: z.object({
      login: z.string(),
      id: z.number(),
      node_id: z.string(),
      avatar_url: z.string(),
      gravatar_id: z.string(),
      url: z.string(),
      html_url: z.string(),
      followers_url: z.string(),
      following_url: z.string(),
      gists_url: z.string(),
      starred_url: z.string(),
      subscriptions_url: z.string(),
      organizations_url: z.string(),
      repos_url: z.string(),
      events_url: z.string(),
      received_events_url: z.string(),
      type: z.string(),
      site_admin: z.boolean(),
    }),
    committer: z.object({
      login: z.string(),
      id: z.number(),
      node_id: z.string(),
      avatar_url: z.string(),
      gravatar_id: z.string(),
      url: z.string(),
      html_url: z.string(),
      followers_url: z.string(),
      following_url: z.string(),
      gists_url: z.string(),
      starred_url: z.string(),
      subscriptions_url: z.string(),
      organizations_url: z.string(),
      repos_url: z.string(),
      events_url: z.string(),
      received_events_url: z.string(),
      type: z.string(),
      site_admin: z.boolean(),
    }),
    parents: z.array(
      z.object({ sha: z.string(), url: z.string(), html_url: z.string() }),
    ),
  }),
);

export type Commit = z.infer<typeof commitsSchema>[number];

/** Helper function to fetch the GitHub API with an auth token to avoid rate limiting. */
export const fetchGithub = async <T extends "repo" | "commits">(
  url: string,
  opts: Options<T>,
): Promise<
  z.infer<T extends "repo" ? typeof repoSchema : typeof commitsSchema>
> => {
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
    console.log(data);
    const parsed = schema.parse(data);

    return parsed;

    // if (!parsed.success) {
    //   const msg = "Could not parse GitHub API response.";
    //   if (throwIfNotOk) {
    //     throw new Error(msg);
    //   }
    //   console.warn(msg);
    // }

    // return parsed.success ? parsed.data : [];
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
  }

  return parsed.success ? parsed.data : [];
};
