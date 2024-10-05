import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function createClient(dbInstance: D1Database) {
	const db = drizzle(dbInstance, { schema });
	return db;
}
