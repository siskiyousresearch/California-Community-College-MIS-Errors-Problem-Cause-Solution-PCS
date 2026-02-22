import { createHmac } from 'crypto';
import fs from 'fs';
import path from 'path';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin';
const SECRET = process.env.ADMIN_SECRET || 'cc-mis-errors-admin-secret';

const PENDING_PATH = path.join(process.cwd(), 'data', 'pending.json');
const ERRORS_PATH = path.join(process.cwd(), 'public', 'errors.json');

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

export interface PendingError extends MISError {
  submittedAt: string;
}

// --- Auth helpers ---

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USER && password === ADMIN_PASS;
}

export function generateSessionToken(): string {
  return createHmac('sha256', SECRET).update('admin').digest('hex');
}

export function validateSessionToken(token: string): boolean {
  return token === generateSessionToken();
}

// --- JSON I/O helpers ---

function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function readPending(): PendingError[] {
  ensureDataDir();
  if (!fs.existsSync(PENDING_PATH)) {
    fs.writeFileSync(PENDING_PATH, '[]', 'utf-8');
    return [];
  }
  return JSON.parse(fs.readFileSync(PENDING_PATH, 'utf-8'));
}

export function writePending(data: PendingError[]) {
  ensureDataDir();
  fs.writeFileSync(PENDING_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export function readErrors(): MISError[] {
  return JSON.parse(fs.readFileSync(ERRORS_PATH, 'utf-8'));
}

export function writeErrors(data: MISError[]) {
  fs.writeFileSync(ERRORS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export function getNextErrorId(errors: MISError[]): string {
  let maxNum = 0;
  for (const e of errors) {
    const match = e.id.match(/^error-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  }
  return `error-${maxNum + 1}`;
}
