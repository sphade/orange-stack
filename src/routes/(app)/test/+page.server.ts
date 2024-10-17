import { playTable } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { db } }) => {
	const u = await db
		.insert(playTable)
		.values({
			name: 'lawal adbola'
		})
		.returning({});
	console.log('🚀 ~ u ~ u:', u);
	return {};
}) satisfies PageServerLoad;
