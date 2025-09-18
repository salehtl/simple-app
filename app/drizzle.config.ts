import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",  // your schema file
  out: "./drizzle",              // migration folder
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // defined in docker-compose
  },
});
