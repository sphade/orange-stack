import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { todoTable, userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = (async ({ locals: { db, user } }) => {
	if (!user) redirect(308, '/login');
	const todos = await db.query.userTable
		.findFirst({
			where: eq(userTable.id, user.id),
			with: { todos: true }
		})
		.catch(() => {
			console.log('object');
		});
	return {
		todos
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals: { db, user, bucket }, request }) => {
		const form = await request.formData();
		const content = form.get('content') as string;
		const file = form.get('file') as File;
		if (!user) redirect(308, '/login');
		await bucket.put(file.name, file);
		await db.insert(todoTable).values({
			userId: user.id,
			content,
			media: `https://pub-23cce33cce57409880410f1196c3b258.r2.dev/${file.name}`
		});
	}
};
