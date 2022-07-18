import { clientEnv, clientEnvSchema } from './env-schema.mjs';

export const env = clientEnvSchema.parse(clientEnv)