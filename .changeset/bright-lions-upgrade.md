---
"create-t3-app": minor
---

feat: upgrade scaffolded projects to Next.js 16

- bump `next` to `^16.4.3`, `react`/`react-dom` to `^19.3.1` and `eslint-config-next` to `^16.4.3`
- bump `next-auth` to `5.0.0-beta.32` (`beta.25` does not allow Next.js 16 as a peer)
- replace the removed `next lint` with `eslint .` and use `eslint-config-next`'s native flat config (drops `@eslint/eslintrc`)
- drop `--turbo` from the `dev` script since Turbopack is now the default
- update `tsconfig.json` with the values Next.js 16 would otherwise rewrite on first build
- require Node.js `>=20.9.0`, matching Next.js 16
