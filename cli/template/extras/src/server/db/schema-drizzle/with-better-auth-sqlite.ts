import { relations, sql } from "drizzle-orm";
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `project1_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: d.text("name", { length: 256 }),
    createdById: d
      .text("created_by_id", { length: 255 })
      .notNull()
      .references(() => user.id),
    createdAt: d
      .integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: d
      .integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date()),
  }),
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("name_idx").on(t.name),
  ]
);

// Better Auth core tables
export const user = createTable("user", (d) => ({
  id: d.text("id").primaryKey(),
  name: d.text("name").notNull(),
  email: d.text("email").notNull().unique(),
  emailVerified: d
    .integer("email_verified", { mode: "boolean" })
    .default(false)
    .notNull(),
  image: d.text("image"),
  createdAt: d
    .integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: d
    .integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => new Date())
    .notNull(),
}));

export const session = createTable(
  "session",
  (d) => ({
    id: d.text("id").primaryKey(),
    expiresAt: d.integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    token: d.text("token").notNull().unique(),
    createdAt: d
      .integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: d
      .integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: d.text("ip_address"),
    userAgent: d.text("user_agent"),
    userId: d
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  }),
  (table) => [index("session_user_id_idx").on(table.userId)]
);

export const account = createTable(
  "account",
  (d) => ({
    id: d.text("id").primaryKey(),
    accountId: d.text("account_id").notNull(),
    providerId: d.text("provider_id").notNull(),
    userId: d
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: d.text("access_token"),
    refreshToken: d.text("refresh_token"),
    idToken: d.text("id_token"),
    accessTokenExpiresAt: d.integer("access_token_expires_at", {
      mode: "timestamp_ms",
    }),
    refreshTokenExpiresAt: d.integer("refresh_token_expires_at", {
      mode: "timestamp_ms",
    }),
    scope: d.text("scope"),
    password: d.text("password"),
    createdAt: d
      .integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: d
      .integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (table) => [index("account_user_id_idx").on(table.userId)]
);

export const verification = createTable(
  "verification",
  (d) => ({
    id: d.text("id").primaryKey(),
    identifier: d.text("identifier").notNull(),
    value: d.text("value").notNull(),
    expiresAt: d.integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    createdAt: d
      .integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: d
      .integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

export const userRelations = relations(user, ({ many }) => ({
  account: many(account),
  session: many(session),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));
