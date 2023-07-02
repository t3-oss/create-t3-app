---
"create-t3-app": patch
---

feat: add drizzle

This release adds a new option to use [`drizzle-orm`](https://orm.drizzle.team/) as an alternative to Prisma.

To make the different ORM options as similar as possible, some minor changes has also been made to the Prisma installer:

- a new script `db:push` has been added and is included in both ORM options.
- the prisma client has been renamed to `db` in the trpc context - you now access your database client like
  ```ts
  examples: publicProcedure.query((opts) => {
     // prisma
     opts.ctx.db.example.findMany()
     // drizzle
     opts.ctx.db.query.example.findMany()
  }),
  ```

You cannot choose the two options in the same app.
