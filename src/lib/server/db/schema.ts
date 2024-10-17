import { relations, sql, type InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const timestamps = {
	updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
	createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
};
export function array<T>() {
	return text('', { mode: 'json' }).$type<T[]>();
}

export const userTable = sqliteTable('user', {
	id: integer('id').primaryKey(),
	googleId: text('google_id').unique(),
	name: text('name').notNull(),
	email: text('email').unique(),
	picture: text('picture')
});
export const todoTable = sqliteTable('todo', {
	id: integer('id').primaryKey(),
	content: text('content').notNull(),
	userId: integer('user_id').references(() => userTable.id),
	media: text('media')
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

export const todosRelation = relations(todoTable, ({ one }) => ({
	user: one(userTable, {
		fields: [todoTable.userId],
		references: [userTable.id]
	})
}));

export const userRelations = relations(userTable, ({ many }) => ({
	todos: many(todoTable)
}));
export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
