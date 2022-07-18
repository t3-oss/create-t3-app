// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
 import { serverEnvSchema, clientEnvSchema } from "./env-schema.mjs";

 const formatErrors = (
   /** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
   errors,
 ) =>
   Object.entries(errors)
     .map(([name, value]) => {
       if (value && "_errors" in value)
         return `${name}: ${value._errors.join(", ")}\n`;
     })
     .filter(Boolean);
 
 const _serverEnv = serverEnvSchema.safeParse(process.env);
 const _clientEnv = clientEnvSchema.safeParse(process.env);
 
 if (!_serverEnv.success) {
   console.error(
     "❌ Invalid environment variables:\n",
     ...formatErrors(_serverEnv.error.format()),
   );
   throw new Error("Invalid environment variables");
 }
 
 if (!_clientEnv.success) {
 console.error(
   "❌ Invalid environment variables:\n",
   ...formatErrors(_clientEnv.error.format()),
 );
 throw new Error("Invalid environment variables");
 }
 
 for (let key of Object.keys(_clientEnv.data)) {
   if (!key.startsWith("NEXT_PUBLIC_")) {
     console.warn(
       '❌ Invalid public environment variable name:',
       key,
     );
 
     throw new Error("Invalid public environment variable name");
   }
 }
 
 export const env = {..._serverEnv.data, ..._clientEnv.data};
 