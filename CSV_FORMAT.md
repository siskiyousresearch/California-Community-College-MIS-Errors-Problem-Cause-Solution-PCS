# CSV Format for MIS Errors

## Required Columns

- `id` - Unique error identifier (optional, auto-generated if missing)
- `system` - System name (e.g., "MMIS", "Banner", "Colleague", "PeopleSoft")
- `errorType` - Type of error (e.g., "Invalid", "Missing", "Format", "Syntactical")
- `fileType` - File type (e.g., "834", "835", "820", "EB", "XE", "SD")
- `dataElement` - Data element name (field name in the system)
- `ddeValue` - Expected DDE (Data Dictionary Element) value
- `description` - Error description
- `info1` - Additional info field 1
- `info2` - Additional info field 2
- `solution` - How to fix the error

## Column Name Variations

The parser supports multiple column name variations to handle different CSV formats:

| Canonical Name | Accepted Variations |
|---|---|
| `system` | System, System Name, Student Information System |
| `errorType` | Error Type, Error Code |
| `fileType` | File Type |
| `dataElement` | Data Element, Field Name |
| `ddeValue` | DDE, Data Dictionary Element Value, Value |
| `description` | Description, Error Description |
| `info1` | Info 1, Info1 |
| `info2` | Info 2, Info2 |
| `solution` | Solution, Resolution, Fix |

## Example CSV

```csv
Student Information System,Error Type,File Type,Data Element,Data Dictionary Element Value,Error Description,Info 1,Info 2,Solution
Colleague,Syntactical,EB,,,Sample error description 1,,,
Banner,Syntactical,XE,,,Sample error description 2,,,
PeopleSoft,Syntactical,SD,,,Sample error description 3,,,
Banner,Syntactical,CB,CB24,X,INVALID VALUE,WORK 0529,,"SCADETL>Supplemental Data>Supplemental Data>""Program Status"" - Check SCADETL in Banner for a valid value"
```

## Usage

1. Save CSV to the canonical data-drop lane (preferred):
   - `/Users/clawdbot/.openclaw/workspace/data-drop/cc-mis/errors.csv`

   Fallbacks (if you really want app-local storage):
   - `public/errors.csv`
   - `errors.csv` (repo root)
   - `data/errors.csv`

2. Run: `npm run build:data`
3. Script parses CSV → generates `public/errors.json`
4. App loads JSON at runtime

## Running Tests

After building:
```bash
npm run test:data
```

This validates:
- All required fields are present
- No duplicate IDs
- Counts of unique systems, error types, and file types

## Build Integration

The build processes are integrated into npm scripts:

```bash
npm run build:data    # Parse CSV → JSON only
npm run test:data     # Validate errors.json
npm run dev           # Parse CSV then start dev server
npm run build         # Parse CSV then build Next.js app
```
