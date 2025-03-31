---
"create-t3-app": patch
---

Fix ENOENT error during ESLint boilerplating by renaming the pnpm configuration file from .npmrc to npmrc to ensure it's included in the published package.
