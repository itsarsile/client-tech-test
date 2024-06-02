import { defineConfig } from "drizzle-kit"

export default defineConfig({
  driver: "mysql2",
  schema: "./drizzle",
  out: "./drizzle",
  dbCredentials: {
    user: "root",
    password: "root",
    host: "127.0.0.1",
    port: 3306,
    database: "test"
  }
})
