import { eq } from 'drizzle-orm';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { userTable, type User } from '../db/schema';
type Schema = typeof import('../db/schema');

export async function createUser(
	googleId: string,
	email: string,
	name: string,
	picture: string,
	db: DrizzleD1Database<Schema>
): Promise<User> {
	const { id } = await db
		.insert(userTable)
		.values({
			googleId,
			email,
			name,
            picture,
		})
		.returning({ id: userTable.id })
		.get();
	if (id === null) {
		throw new Error('Unexpected error');
	}
	const user: User = {
		id,
		googleId,
		email,
		name,
		picture
	};
	return user;
}

export async function getUserFromGoogleId(
	googleId: string,
	db: DrizzleD1Database<Schema>
): Promise<User | null> {
	const user = await db.query.userTable.findFirst({
		where: eq(userTable.googleId, googleId),
		columns: {
			id: true,
			googleId: true,
			email: true,
			name: true,
			picture: true
		}
	});
	if (!user) {
		return null;
	}

	return user;
}
