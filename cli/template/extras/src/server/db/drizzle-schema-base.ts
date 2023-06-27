// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const example = mysqlTable(
  "example",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  },
  (example) => ({
    nameIndex: uniqueIndex("name_idx").on(example.name),
  }),
);
