// See https://kit.svelte.dev/docs/types#app

import type { DrizzleD1Database } from 'drizzle-orm/d1';

// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: {
				DB: D1Database;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
		}
		interface Locals {
			db: DrizzleD1Database!;
		}
	}
}

export {};
