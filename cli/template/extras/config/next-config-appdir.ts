/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { type NextConfig } from "next";

import "./src/env";

const config: NextConfig = {};

export default config;
