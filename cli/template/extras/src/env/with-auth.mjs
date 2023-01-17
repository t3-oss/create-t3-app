// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const server = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production"
      ? z.string().min(1)
      : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    (str) => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? z.string() : z.string().url(),
  ),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const client = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * edge runtimes (e.g. middlewares) or client-side so we need to destruct manually.
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};

// Don't touch the part below
// --------------------------

const formatErrors = (
  /** @type {z.ZodFormattedError<Map<string,string>,string>} */
  errors,
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${name}: ${value._errors.join(", ")}\n`;
    })
    .filter(Boolean);

const isServer = typeof window === "undefined";

const merged = server.merge(client);
const parsed = isServer
  ? merged.safeParse(processEnv)
  : client.safeParse(processEnv);

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(parsed.error.format()),
  );
  throw new Error("Invalid environment variables");
}

/** @type z.infer<merged>
 *  @ts-ignore - proxy is hard in TS */
export const env = new Proxy(parsed.data, {
  get(target, prop) {
    if (typeof prop !== "string") return undefined;
    if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
      throw new Error(
        "❌ Attempted to access serverside environment variable on the client",
      );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - proxy is hard in TS
    return target[prop];
  },
});
