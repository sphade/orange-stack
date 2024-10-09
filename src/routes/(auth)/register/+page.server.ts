import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
	validateSessionToken
} from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { locals } = event;
	const { db } = locals;
	const token = event.cookies.get('session') ?? null;

	const { session, user } = await validateSessionToken(token, db);
	if (session === null) {
		deleteSessionTokenCookie(event);
		return new Response(null, {
			status: 401
		});
	}
	setSessionTokenCookie(event, token, session.expiresAt);

	// ...
};
