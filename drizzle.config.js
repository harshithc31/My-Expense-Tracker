import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.jsx', // Change schema.ts to schema.js
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_P3RZok2zuyAU@ep-young-water-a11x0mld-pooler.ap-southeast-1.aws.neon.tech/Expense-Tracker?sslmode=require',
  },
});
