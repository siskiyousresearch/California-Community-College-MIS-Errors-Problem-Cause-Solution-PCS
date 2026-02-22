export interface MISError {
  id: string;
  system: string;
  errorType: string;
  fileType: string;
  dataElement: string;
  ddeValue: string;
  description: string;
  info1: string;
  info2: string;
  solution: string;
}

// Parse CSV - this will be imported at build time
export function parseErrors(): MISError[] {
  const csv = require('fs').readFileSync('./errors.csv', 'utf-8');
  const lines = csv.split('\n').slice(1); // Skip header
  
  return lines
    .filter((line: string) => line.trim())
    .map((line: string, idx: number) => {
      const [system, errorType, fileType, dataElement, ddeValue, description, info1, info2, solution] = 
        line.split(',').map((s: string) => s.trim().replace(/^"|"$/g, ''));
      
      return {
        id: `error-${idx}`,
        system,
        errorType,
        fileType,
        dataElement,
        ddeValue,
        description,
        info1,
        info2,
        solution,
      };
    });
}

// Get all unique values for filters
export function getFilterOptions(errors: MISError[]) {
  return {
    systems: [...new Set(errors.map(e => e.system))].sort(),
    errorTypes: [...new Set(errors.map(e => e.errorType))].filter(Boolean).sort(),
    fileTypes: [...new Set(errors.map(e => e.fileType))].filter(Boolean).sort(),
  };
}
