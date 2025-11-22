import { relations } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `pg-drizzle_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdById: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => user.id),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("name_idx").on(t.name),
  ]
);

export const user = createTable("user", (d) => ({
  id: d.text("id").primaryKey(),
  name: d.text("name").notNull(),
  email: d.text("email").notNull().unique(),
  emailVerified: d.boolean("email_verified").default(false).notNull(),
  image: d.text("image"),
  createdAt: d.timestamp("created_at").defaultNow().notNull(),
  updatedAt: d
    .timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

export const session = createTable(
  "session",
  (d) => ({
    id: d.text("id").primaryKey(),
    expiresAt: d.timestamp("expires_at").notNull(),
    token: d.text("token").notNull().unique(),
    createdAt: d.timestamp("created_at").defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at")
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
    accessTokenExpiresAt: d.timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: d.timestamp("refresh_token_expires_at"),
    scope: d.text("scope"),
    password: d.text("password"),
    createdAt: d.timestamp("created_at").defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at")
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
    expiresAt: d.timestamp("expires_at").notNull(),
    createdAt: d.timestamp("created_at").defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

export const userRelations = relations(user, ({ many }) => ({
  account: many(account),
  session: many(session),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));
