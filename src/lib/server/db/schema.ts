import { relations, type InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
	id: integer('id').primaryKey(),
	googleId: text('google_id').unique(),
	name: text('name').notNull(),
	email: text('email').unique(),
	picture: text('picture')
});

export const sessionTable = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at', {
		mode: 'timestamp'
	}).notNull()
});
export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
