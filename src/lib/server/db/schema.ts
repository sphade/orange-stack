import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	email: text('email').notNull()
});

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey(),
	content: text('content').notNull(),
	authorId: integer('author_id')
		.notNull()
		.references(() => user.id, {})
});
export const userRelations = relations(user, ({ many }) => ({
	posts: many(posts)
}));
export const postsRelations = relations(posts, ({ one }) => ({
	author: one(user, { fields: [posts.authorId], references: [user.id] })
}));
