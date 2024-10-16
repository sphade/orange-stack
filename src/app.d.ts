// See https://kit.svelte.dev/docs/types#app

import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { Session, User } from './lib/server/db/schema';

// for information about these interfaces
type Schema = typeof import('./lib/server/db/schema');
declare global {
	namespace App {
		interface Platform {
			env: {
				DB: D1Database;
				BUCKET: R2Bucket;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
		}
		interface Locals {
			db: DrizzleD1Database<Schema>;
			user: User | null;
			session: Session | null;
			bucket: R2Bucket;
		}
	}
}

export {};
