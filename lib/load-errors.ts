import errors from '@/public/errors.json';

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

export function loadErrors(): MISError[] {
  return errors as MISError[];
}

// Get unique values for filters
export function getUniqueSystems(): string[] {
  const systems = new Set<string>();
  errors.forEach((e: any) => {
    if (e.system) systems.add(e.system);
  });
  return Array.from(systems).sort();
}

export function getUniqueErrorTypes(): string[] {
  const types = new Set<string>();
  errors.forEach((e: any) => {
    if (e.errorType) types.add(e.errorType);
  });
  return Array.from(types).sort();
}

export function getUniqueFileTypes(): string[] {
  const types = new Set<string>();
  errors.forEach((e: any) => {
    if (e.fileType) types.add(e.fileType);
  });
  return Array.from(types).sort();
}
