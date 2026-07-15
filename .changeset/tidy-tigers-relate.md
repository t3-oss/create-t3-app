---
"create-t3-app": patch
---

Fix Biome + Prisma scaffolding failure and bump minimum Biome version

- Bump `@biomejs/biome` minimum from `^2.2.5` to `^2.5.3`. The template's
  `biome.jsonc` uses CSS parser options (`cssModules`, `tailwindDirectives`)
  and `assist` actions (`useSortedAttributes`) introduced in Biome 2.3+.
  Resolving to 2.2.5 (offline caches, locked registries) caused a config
  parse error that aborted scaffolding.
- Add explicit `files.includes` with `!**/generated` to `biome.jsonc`.
  Previously, excluding `generated/` relied solely on `.gitignore` via VCS
  integration. When users opted out of git init, Biome could not resolve
  the ignore file and linted Prisma's generated client, causing
  `check:unsafe` to fail with 290+ diagnostics on machine-generated code.

Fixes #2226