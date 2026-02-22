# CC-MIS Errors Web App — Activity Notes

Date: 2026-02-08

## Ticket: CC-MIS Errors: Populate CSV Data & Test Locally

### What changed
- **Improved CSV ingestion/parsing** (`scripts/parse-csv.mjs`):
  - Added **fallback lookup** for `errors.csv` in multiple locations:
    - `public/errors.csv` (preferred)
    - repo root `errors.csv`
    - `data/errors.csv`
  - Normalized CSV header matching (case/spacing/punctuation insensitive) so common header variations or stray whitespace don’t break mapping.
  - `id` now prefers any explicit ID column (`id`, `ID`, `Error ID`, etc.); otherwise uses a **1-based** generated id.
  - Log output now includes the actual CSV path used.

- **Fixed UI search/filter behavior** (`app/components/SearchInterface.tsx`):
  - Filter dropdown options are now derived from the loaded dataset (`allErrors`) rather than the globally imported JSON.
  - Search now runs **within the currently filtered subset** (previously search results ignored filters because Fuse searched the full dataset).

### Local verification
- `npm run build:data` → ✅ generated `public/errors.json`
- `npm run test:data` → ✅ validation passed (81 errors)
- `npm run build` → ✅ Next.js production build succeeded

### Notes
- Current repo already includes `public/errors.csv` and `public/errors.json`; parser improvements make it more resilient if a new CSV is dropped into the repo root or `data/`.
