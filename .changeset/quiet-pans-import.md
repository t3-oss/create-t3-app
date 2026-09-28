---
"create-t3-app": patch
---

fix: use top-level `import type` for type-only imports in templates so Next.js 16.2+ no longer bundles them as side-effect imports (fixes `Can't resolve 'next-auth/adapters'` and server modules leaking into client bundles, #2221)
