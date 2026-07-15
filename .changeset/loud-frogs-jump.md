---
"create-t3-app": patch
---

Add .prettierignore to exclude generated Prisma client from formatting

When scaffolding with Prisma + ESLint/Prettier, `prettier --write` and
`prettier --check` would scan `generated/prisma/**` because the format
scripts use a broad `**/*.{ts,tsx,js,jsx,mdx}` glob. Prettier does not
read `.gitignore` by default, so the `/generated/` entry there offered
no protection. This caused:

- `prettier --write` reformatting generated Prisma client files
- `prisma generate` rewriting them back to the original format
- Persistent git diff churn on every install/format cycle

Add a `.prettierignore` template that excludes `generated/` so Prettier
skips generated artifacts deterministically, regardless of git state.

Fixes #2217