import { createClient } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
	// Initialize database client
	const platform = event.platform;
	if (platform) {
		const db = createClient(platform.env.DB);

		event.locals.db = db;
	}

	return resolve(event);
};
