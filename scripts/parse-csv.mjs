import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');
const jsonPath = path.join(publicDir, 'errors.json');

// Prefer the canonical workspace data-drop lane when available.
// Repo path: <workspace>/business/apps/cc-mis-errors/scripts
const workspaceRoot = path.resolve(__dirname, '../../../..');

const candidateCsvPaths = [
  // Canonical data drop location (preferred)
  path.join(workspaceRoot, 'data-drop/cc-mis/errors.csv'),

  // App-local fallbacks
  path.join(publicDir, 'errors.csv'),
  path.join(__dirname, '../errors.csv'),
  path.join(__dirname, '../data/errors.csv'),
];

const csvPath = candidateCsvPaths.find((p) => fs.existsSync(p));
if (!csvPath) {
  console.error('❌ Could not find errors.csv. Looked in:');
  candidateCsvPaths.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}

// Read CSV
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const normalizeKey = (key) =>
  String(key)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

// Parse with headers
const records = parse(csvContent, {
  columns: (header) => header.map((h) => String(h).trim()),
  skip_empty_lines: true,
  trim: true,
});

// Transform to app format - map actual CSV columns to our schema
const errors = records.map((row, index) => {
  // Normalize row keys for robust header matching (case/spacing/punctuation)
  const normalizedRow = {};
  for (const [k, v] of Object.entries(row)) {
    normalizedRow[normalizeKey(k)] = v;
  }

  const getField = (fieldNames) => {
    for (const name of fieldNames) {
      const key = normalizeKey(name);
      const value = normalizedRow[key];
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        return String(value).trim();
      }
    }
    return '';
  };

  // Prefer an explicit id column if present (any variation like "ID")
  const id =
    getField(['id', 'ID', 'Error ID', 'ErrorID']) ||
    // 1-based fallback so it looks nicer in UI and avoids "0"
    String(index + 1);

  return {
    id,
    system: getField(['system', 'System', 'Student Information System', 'System Name']),
    errorType: getField(['errorType', 'Error Type', 'Error Code']),
    fileType: getField(['fileType', 'File Type']),
    dataElement: getField(['dataElement', 'Data Element', 'Field Name']),
    ddeValue: getField(['ddeValue', 'Data Dictionary Element Value', 'DDE', 'Value']),
    description: getField(['description', 'Error Description', 'Description']),
    info1: getField(['info1', 'Info 1', 'Info1']),
    info2: getField(['info2', 'Info 2', 'Info2']),
    solution: getField(['solution', 'Solution', 'Resolution', 'Fix']),
  };
});

// Write JSON
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(jsonPath, JSON.stringify(errors, null, 2));
console.log(`✅ Parsed ${errors.length} errors from ${csvPath} → ${jsonPath}`);
