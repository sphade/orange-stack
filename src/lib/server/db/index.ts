import { drizzle } from 'drizzle-orm/d1';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

let db: DrizzleD1Database | null = null;

export function createClient(dbInstance: D1Database) {
	db = drizzle(dbInstance);
	return db;
}

export function getClient() {
	if (!db) {
		throw new Error('Database client not initialized');
	}
	return db;
}
