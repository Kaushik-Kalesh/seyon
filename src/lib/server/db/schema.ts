import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const industries = sqliteTable('industries', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
});

export const valves = sqliteTable('valves', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  industrySlug: text('industry_slug').notNull().references(() => industries.slug),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  pdfUrl: text('pdf_url'), // PDF uploads feature added
  
  // Specs
  material: text('material').notNull(),
  pressureRating: text('pressure_rating').notNull(),
  temperatureRange: text('temperature_range').notNull(),
  size: text('size').notNull(),
});
