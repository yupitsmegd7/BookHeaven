import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const books = sqliteTable('books',{id:text('id').primaryKey(),owner:text('owner').notNull(),data:text('data').notNull()});
