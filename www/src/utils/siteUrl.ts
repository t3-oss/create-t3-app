export const SITE_URL = import.meta.env.VERCEL_URL
  ? `https://${import.meta.env.VERCEL_URL}`
  : "http://localhost:3000";
