import { fail, redirect } from '@sveltejs/kit';
import { invalidateSession, deleteSessionTokenCookie } from '$lib/server/auth/session';

export const actions = {
	default: async (event) => {
		const { db } = event.locals;
		if (event.locals.session === null) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id, db);
		deleteSessionTokenCookie(event);
		return redirect(302, '/login');
	}
};
