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
    number: varchar("number", { length: 256 }),
  },
  (example) => ({
    numberIndex: uniqueIndex("number_idx").on(example.number),
  }),
);
