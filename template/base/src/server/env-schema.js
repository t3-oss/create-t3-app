const { z } = require("zod");

const envSchema = z.object({
  // Specify your environment variables schema here
});

module.exports.envSchema = envSchema;
