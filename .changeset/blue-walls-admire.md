---
"create-t3-app": minor
---

improve boolean coercion of `SKIP_ENV_VALIDATION` environment variable

If defined, "0" and "false" are now considered falsey values, all other values are considered truthy.
