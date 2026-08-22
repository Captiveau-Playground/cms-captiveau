import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

/**
 * Minimal migration — adds the new `page-ctas` global and removes the
 * obsolete `homepage.careerBenefits` array + `homepage.ctaTitle/ctaSubtitle/
 * ctaButtonText` columns (CTA is now managed per-page via the `page-ctas`
 * global).
 *
 * NOTE: The production D1 database was previously synced with `push` (a
 * `dev` entry existed in `payload_migrations`), so `homepage`, `projects`,
 * `promotions`, the `site_settings` banner/cal/footer columns and
 * `services.category` already existed before this migration. A full
 * auto-generated migration would have re-created those tables and failed.
 * This migration only applies the delta our code change introduced.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // ── New: page-ctas global ──
  await db.run(sql`CREATE TABLE \`page_ctas\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`page_ctas_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`page_key\` text NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`primary_cta_label\` text NOT NULL,
  	\`primary_cta_href\` text DEFAULT '/contact',
  	\`primary_cta_use_cal\` integer DEFAULT false,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text DEFAULT '/portfolio',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_ctas\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_ctas_items_order_idx\` ON \`page_ctas_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_ctas_items_parent_id_idx\` ON \`page_ctas_items\` (\`_parent_id\`);`)

  // ── Removed: homepage careerBenefits array ──
  await db.run(sql`DROP TABLE IF EXISTS \`homepage_career_benefits\`;`)

  // ── Removed: homepage CTA columns (now managed via page-ctas global) ──
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`cta_title\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`cta_subtitle\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`cta_button_text\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Restore homepage CTA columns
  await db.run(sql`ALTER TABLE \`homepage\` ADD COLUMN \`cta_title\` text;`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD COLUMN \`cta_subtitle\` text;`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD COLUMN \`cta_button_text\` text;`)

  // Restore homepage careerBenefits array table
  await db.run(sql`CREATE TABLE \`homepage_career_benefits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_career_benefits_order_idx\` ON \`homepage_career_benefits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_career_benefits_parent_id_idx\` ON \`homepage_career_benefits\` (\`_parent_id\`);`)

  // Drop page-ctas global
  await db.run(sql`DROP TABLE \`page_ctas_items\`;`)
  await db.run(sql`DROP TABLE \`page_ctas\`;`)
}
