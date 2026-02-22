import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, '../public/errors.json');

if (!fs.existsSync(jsonPath)) {
  console.error('❌ errors.json not found. Run: npm run build:data');
  process.exit(1);
}

const errors = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

console.log(`✅ Loaded ${errors.length} errors`);

// Validate structure
const requiredFields = ['id', 'system', 'errorType', 'description', 'solution'];
const hasAllFields = errors.every(e => requiredFields.every(f => f in e));

if (!hasAllFields) {
  console.error('❌ Some errors missing required fields');
  process.exit(1);
}

// Check for duplicates
const ids = new Set();
const duplicates = [];
errors.forEach(e => {
  if (ids.has(e.id)) duplicates.push(e.id);
  ids.add(e.id);
});

if (duplicates.length > 0) {
  console.warn(`⚠️  ${duplicates.length} duplicate IDs found`);
}

console.log('✅ All validation passed');
console.log(`📊 Systems: ${new Set(errors.map(e => e.system)).size}`);
console.log(`📊 Error types: ${new Set(errors.map(e => e.errorType)).size}`);
console.log(`📊 File types: ${new Set(errors.map(e => e.fileType)).size}`);
