#!/usr/bin/env node

/**
 * Seed Supabase Postgres with initial error data from public/errors.json.
 *
 * Prerequisites:
 *   - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars must be set
 *     (either via .env.local or exported in shell)
 *   - The `errors` table must already exist (run the SQL schema first)
 *
 * Usage:
 *   node scripts/seed-supabase.mjs
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.');
  console.error('Set them in .env.local or export them before running this script.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const errorsPath = resolve('public/errors.json');
const errors = JSON.parse(readFileSync(errorsPath, 'utf-8'));

console.log(`Read ${errors.length} errors from ${errorsPath}`);

// Map camelCase fields to snake_case for Postgres
const rows = errors.map((e) => ({
  id: e.id,
  system: e.system,
  error_type: e.errorType,
  file_type: e.fileType,
  data_element: e.dataElement || '',
  dde_value: e.ddeValue || '',
  description: e.description,
  info1: e.info1 || '',
  info2: e.info2 || '',
  solution: e.solution || '',
}));

// Upsert in batches of 500
const BATCH_SIZE = 500;
let inserted = 0;

for (let i = 0; i < rows.length; i += BATCH_SIZE) {
  const batch = rows.slice(i, i + BATCH_SIZE);
  const { error } = await supabase
    .from('mis_errors')
    .upsert(batch, { onConflict: 'id' });

  if (error) {
    console.error(`Upsert failed at batch starting index ${i}:`, error.message);
    process.exit(1);
  }

  inserted += batch.length;
  console.log(`  Upserted ${inserted}/${rows.length} rows...`);
}

console.log(`Seeded Supabase "mis_errors" table with ${rows.length} records.`);
