# CC-MIS Error Reference

A searchable catalog of California Community College Management Information System (MIS) errors with Problem-Cause-Solution documentation.

## About

This tool helps MIS professionals at California community colleges quickly identify and resolve errors encountered when submitting data to the Chancellor's Office. It catalogs syntactical, referential, and quality errors across Banner, Colleague, and PeopleSoft systems with detailed solutions.

**Author:** JT Tarantino, Director of Planning, Assessment, and Research — College of the Siskiyous

## Features

- Full-text fuzzy search across all error fields
- Filter by System (Banner, Colleague, PeopleSoft), Error Type, and File Type
- Pagination with 20 results per page
- Individual error detail pages at `/errors/[id]`
- Dark mode with persistent preference
- REST API at `/api/errors` with query parameter filtering
- "Add Error" submission form (triggers GitHub Actions workflow)
- CCCCO branding and color scheme
- About page with system, error type, and file type reference

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Fuse.js 7** for fuzzy search

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

This runs `build:data` (CSV to JSON) then starts the Next.js dev server.

### Production Build

```bash
npm run build
npm start
```

### Data Pipeline

Error data is stored in CSV and converted to JSON for the app:

```bash
npm run build:data    # Parse CSV → public/errors.json
npm run test:data     # Validate the parser
```

## API

### `GET /api/errors`

Returns all errors. Supports query parameters:

| Param       | Description              | Example            |
|-------------|--------------------------|--------------------|
| `system`    | Filter by system         | `?system=Banner`   |
| `errorType` | Filter by error type     | `?errorType=Syntactical` |
| `fileType`  | Filter by file type      | `?fileType=CB`     |
| `q`         | Text search              | `?q=INVALID VALUE` |

### `POST /api/errors/submit`

Submit a new error. Requires `GITHUB_TOKEN` environment variable. Triggers the `update-csv.yml` GitHub Actions workflow.

**Body (JSON):**
```json
{
  "system": "Banner",
  "errorType": "Syntactical",
  "fileType": "CB",
  "dataElement": "CB24",
  "ddeValue": "X",
  "description": "INVALID VALUE",
  "info1": "",
  "info2": "",
  "solution": "Check SCADETL in Banner"
}
```

## Environment Variables

| Variable       | Required | Description                          |
|----------------|----------|--------------------------------------|
| `GITHUB_TOKEN` | No       | GitHub token for error submission workflow |

## Resources

- [MIS Data Element Dictionary](https://webdata.cccco.edu/ded/ded.htm)
- [CCCCO Website](https://www.cccco.edu/)
- [CCCCO DataMart](https://datamart.cccco.edu/)

## License

This project is intended for use by California Community College MIS professionals.
