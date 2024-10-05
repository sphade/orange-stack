import { user } from '$lib/server/db/schema.js';

export const load = async ({ locals }) => {
	const users = await locals.db.select().from(user);
	return { users };
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const name = data.get('name') as string;
		const res = await locals.db.insert(user).values({ email, name }).returning();
	}
};
