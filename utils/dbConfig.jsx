import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
const sql = neon('postgresql://neondb_owner:npg_P3RZok2zuyAU@ep-young-water-a11x0mld-pooler.ap-southeast-1.aws.neon.tech/Expense-Tracker?sslmode=require');
export const db = drizzle({ client: sql, schema });