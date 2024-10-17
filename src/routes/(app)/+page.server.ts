import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { todoTable, userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { dev } from '$app/environment';

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
		console.log('🚀 ~ default: ~ file:', file);
		if (!user) redirect(308, '/login');
		const object = await bucket.put(file.name, file);
		const base = dev
			? 'http://127.0.0.1:8788/'
			: 'https://pub-23cce33cce57409880410f1196c3b258.r2.dev/';
		// const imageUrl = URL.createObjectURL(object);
		// console.log('🚀 ~ default: ~ imageUrl:', imageUrl);
		await db.insert(todoTable).values({
			userId: user.id,
			content,
			media: `${base}${file.name}`
		});
	}
};
