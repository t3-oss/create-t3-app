---
"create-t3-app": patch
---

When using NextAuth but not Prisma, the session user's id is now set to `token.sub` instead of `user.id` because `user` is undefined when not using database sessions.
