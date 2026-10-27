---
"create-t3-app": patch
---

fix: migrate the Biome config to Biome 2.6, which renamed the nursery `useSortedClasses` rule to `useTailwindSortedClasses` and rejects the old name (every `--biome` scaffold failed on install)
