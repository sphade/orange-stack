import { createClient } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
export const handleDb: Handle = async ({ event, resolve }) => {
	// Initialize database client
	const platform = event.platform;
	if (platform) {
		const db = createClient(platform.env.DB);

		event.locals.db = db;
	}

	return resolve(event);
};

const preloadFonts: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type }) => type === 'font'
	});

	return response;
};

export const handle = sequence(preloadFonts, handleDb);
