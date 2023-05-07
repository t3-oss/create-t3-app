---
"create-t3-app": minor
---

feat: Added JsonProtocol as the Default Prisma Engine for Serverless speedups

modified:

    - cli/template/extras/prisma/schema/base.prisma

    - cli/template/extras/prisma/schema/with-auth.prisma

Description: This pull request proposes the enabling of the JsonProtocol by default. The rationale for this change is based on the performance improvements provided by the JsonProtocol without compromising stability, even though it is still a preview feature. Empirical evidence gathered from large-scale projects, with 100+ Prisma calls, demonstrates the significant time reductions enabled by this optimization, particularly in serverless environments such as Vercel. Another point worth adding is that most projects using nextJS create-t3-app will be deployed on serverless platforms such as vercel, where the real impact is.
