---
"create-t3-app": patch
---

fix: use singleton pattern for client-side QueryClient to support `useSuspenseQuery` when there is no parent `<Suspense>`-element
