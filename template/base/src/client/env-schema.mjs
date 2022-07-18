import { z } from "zod";

export const envSchema = z.object({
  // Specify your environment variables schema here
  // Be sure to name your environment variables with the prefix "NEXT_PUBLIC_"
});
