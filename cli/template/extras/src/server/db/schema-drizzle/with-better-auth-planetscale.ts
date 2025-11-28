import { relations } from "drizzle-orm";
import { index, mysqlTableCreator } from "drizzle-orm/mysql-core";

export const createTable = mysqlTableCreator((name) => `project1_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.bigint({ mode: "number" }).primaryKey().autoincrement(),
    name: d.varchar({ length: 256 }),
    createdById: d.varchar({ length: 255 }).notNull(),
    createdAt: d.timestamp({ fsp: 3 }).defaultNow().notNull(),
    updatedAt: d
      .timestamp({ fsp: 3 })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("name_idx").on(t.name),
  ]
);

export const user = createTable("user", (d) => ({
  id: d.varchar({ length: 36 }).primaryKey(),
  name: d.varchar({ length: 255 }).notNull(),
  email: d.varchar({ length: 255 }).notNull().unique(),
  emailVerified: d.boolean().default(false).notNull(),
  image: d.text(),
  createdAt: d.timestamp({ fsp: 3 }).defaultNow().notNull(),
  updatedAt: d
    .timestamp({ fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

export const session = createTable(
  "session",
  (d) => ({
    id: d.varchar({ length: 36 }).primaryKey(),
    expiresAt: d.timestamp({ fsp: 3 }).notNull(),
    token: d.varchar({ length: 255 }).notNull().unique(),
    createdAt: d.timestamp({ fsp: 3 }).defaultNow().notNull(),
    updatedAt: d
      .timestamp({ fsp: 3 })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: d.text(),
    userAgent: d.text(),
    userId: d.varchar({ length: 36 }).notNull(),
  }),
  (table) => [index("session_user_id_idx").on(table.userId)]
);

export const account = createTable(
  "account",
  (d) => ({
    id: d.varchar({ length: 36 }).primaryKey(),
    accountId: d.text().notNull(),
    providerId: d.text().notNull(),
    userId: d.varchar({ length: 36 }).notNull(),
    accessToken: d.text(),
    refreshToken: d.text(),
    idToken: d.text(),
    accessTokenExpiresAt: d.timestamp({ fsp: 3 }),
    refreshTokenExpiresAt: d.timestamp({ fsp: 3 }),
    scope: d.text(),
    password: d.text(),
    createdAt: d.timestamp({ fsp: 3 }).defaultNow().notNull(),
    updatedAt: d
      .timestamp({ fsp: 3 })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (table) => [index("account_user_id_idx").on(table.userId)]
);

export const verification = createTable(
  "verification",
  (d) => ({
    id: d.varchar({ length: 36 }).primaryKey(),
    identifier: d.varchar({ length: 255 }).notNull(),
    value: d.text().notNull(),
    expiresAt: d.timestamp({ fsp: 3 }).notNull(),
    createdAt: d.timestamp({ fsp: 3 }).defaultNow().notNull(),
    updatedAt: d
      .timestamp({ fsp: 3 })
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
