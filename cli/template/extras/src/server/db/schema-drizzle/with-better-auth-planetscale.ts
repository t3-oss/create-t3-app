import { relations } from "drizzle-orm";
import { index, mysqlTableCreator } from "drizzle-orm/mysql-core";

export const createTable = mysqlTableCreator((name) => `project1_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: d.varchar("name", { length: 256 }),
    createdById: d.varchar("created_by_id", { length: 255 }).notNull(),
    createdAt: d.timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at", { fsp: 3 })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("name_idx").on(t.name),
  ]
);

export const user = createTable("user", (d) => ({
  id: d.varchar("id", { length: 36 }).primaryKey(),
  name: d.varchar("name", { length: 255 }).notNull(),
  email: d.varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: d.boolean("email_verified").default(false).notNull(),
  image: d.text("image"),
  createdAt: d.timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: d
    .timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

export const session = createTable(
  "session",
  (d) => ({
    id: d.varchar("id", { length: 36 }).primaryKey(),
    expiresAt: d.timestamp("expires_at", { fsp: 3 }).notNull(),
    token: d.varchar("token", { length: 255 }).notNull().unique(),
    createdAt: d.timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at", { fsp: 3 })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: d.text("ip_address"),
    userAgent: d.text("user_agent"),
    userId: d.varchar("user_id", { length: 36 }).notNull(),
  }),
  (table) => [index("session_user_id_idx").on(table.userId)]
);

export const account = createTable(
  "account",
  (d) => ({
    id: d.varchar("id", { length: 36 }).primaryKey(),
    accountId: d.text("account_id").notNull(),
    providerId: d.text("provider_id").notNull(),
    userId: d.varchar("user_id", { length: 36 }).notNull(),
    accessToken: d.text("access_token"),
    refreshToken: d.text("refresh_token"),
    idToken: d.text("id_token"),
    accessTokenExpiresAt: d.timestamp("access_token_expires_at", { fsp: 3 }),
    refreshTokenExpiresAt: d.timestamp("refresh_token_expires_at", { fsp: 3 }),
    scope: d.text("scope"),
    password: d.text("password"),
    createdAt: d.timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at", { fsp: 3 })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (table) => [index("account_user_id_idx").on(table.userId)]
);

export const verification = createTable(
  "verification",
  (d) => ({
    id: d.varchar("id", { length: 36 }).primaryKey(),
    identifier: d.varchar("identifier", { length: 255 }).notNull(),
    value: d.text("value").notNull(),
    expiresAt: d.timestamp("expires_at", { fsp: 3 }).notNull(),
    createdAt: d.timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at", { fsp: 3 })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

export const usersRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
}));

export const accountsRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessionsRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));
