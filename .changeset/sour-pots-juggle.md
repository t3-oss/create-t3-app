---
"create-t3-app": patch
---

fix start-database.sh to not create an `.env-e` file, which is not gitignored, thus preventing exposure of auth secret, fixes #2060
