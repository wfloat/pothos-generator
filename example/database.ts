import { DB } from "../prisma/generated/kysely.js";
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    database: "wfloat-local",
    host: "localhost",
    user: "postgres",
    password: "password",
    port: 5432,
    max: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
