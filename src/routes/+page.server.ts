import { user } from '$lib/server/db/schema.js';

export const load = async ({ locals, platform }) => {
	const result = await platform?.env.DB.prepare('SELECT * FROM user LIMIT 5').run();
	return { result };
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const name = data.get('name') as string;
		const res = await locals.db.insert(user).values({ email, name }).returning();
		console.log(res);
	}
};
