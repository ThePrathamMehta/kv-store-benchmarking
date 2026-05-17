import { Pool } from "pg";

export const shards = [
  new Pool({
    host: "localhost",
    port: 5433,
    user: "user",
    password: "password",
    database: "kvstore",
  }),

  new Pool({
    host: "localhost",
    port: 5434,
    user: "user",
    password: "password",
    database: "kvstore",
  }),

  new Pool({
    host: "localhost",
    port: 5435,
    user: "user",
    password: "password",
    database: "kvstore",
  }),
];