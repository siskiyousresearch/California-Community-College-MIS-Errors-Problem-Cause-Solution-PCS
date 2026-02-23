import { createHmac } from 'crypto';
import { getSupabase } from './supabase';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin';
const SECRET = process.env.ADMIN_SECRET || 'cc-mis-errors-admin-secret';

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

// --- Column name mapping ---

interface SnakeCaseError {
  id: string;
  system: string;
  error_type: string;
  file_type: string;
  data_element: string;
  dde_value: string;
  description: string;
  info1: string;
  info2: string;
  solution: string;
}

interface SnakeCasePending extends SnakeCaseError {
  submitted_at: string;
}

function toCamelError(row: SnakeCaseError): MISError {
  return {
    id: row.id,
    system: row.system,
    errorType: row.error_type,
    fileType: row.file_type,
    dataElement: row.data_element,
    ddeValue: row.dde_value,
    description: row.description,
    info1: row.info1,
    info2: row.info2,
    solution: row.solution,
  };
}

function toCamelPending(row: SnakeCasePending): PendingError {
  return {
    ...toCamelError(row),
    submittedAt: row.submitted_at,
  };
}

function toSnakeError(obj: Partial<MISError>): Partial<SnakeCaseError> {
  const result: Record<string, string> = {};
  if (obj.id !== undefined) result.id = obj.id;
  if (obj.system !== undefined) result.system = obj.system;
  if (obj.errorType !== undefined) result.error_type = obj.errorType;
  if (obj.fileType !== undefined) result.file_type = obj.fileType;
  if (obj.dataElement !== undefined) result.data_element = obj.dataElement;
  if (obj.ddeValue !== undefined) result.dde_value = obj.ddeValue;
  if (obj.description !== undefined) result.description = obj.description;
  if (obj.info1 !== undefined) result.info1 = obj.info1;
  if (obj.info2 !== undefined) result.info2 = obj.info2;
  if (obj.solution !== undefined) result.solution = obj.solution;
  return result;
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

// --- Supabase CRUD ---

export async function readErrors(): Promise<MISError[]> {
  const { data, error } = await getSupabase().from('mis_errors').select('*');
  if (error) throw new Error(`Failed to read errors: ${error.message}`);
  return (data as SnakeCaseError[]).map(toCamelError);
}

export async function insertError(err: MISError): Promise<void> {
  const row = toSnakeError(err);
  const { error } = await getSupabase().from('mis_errors').insert(row);
  if (error) throw new Error(`Failed to insert error: ${error.message}`);
}

export async function updateError(id: string, fields: Partial<MISError>): Promise<MISError> {
  const row = toSnakeError(fields);
  const { data, error } = await getSupabase()
    .from('mis_errors')
    .update(row)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw new Error(`Failed to update error: ${error.message}`);
  return toCamelError(data as SnakeCaseError);
}

export async function deleteError(id: string): Promise<void> {
  const { error } = await getSupabase().from('mis_errors').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete error: ${error.message}`);
}

export async function readPending(): Promise<PendingError[]> {
  const { data, error } = await getSupabase().from('mis_pending').select('*');
  if (error) throw new Error(`Failed to read pending: ${error.message}`);
  return (data as SnakeCasePending[]).map(toCamelPending);
}

export async function insertPending(p: PendingError): Promise<void> {
  const row = {
    ...toSnakeError(p),
    submitted_at: p.submittedAt,
  };
  const { error } = await getSupabase().from('mis_pending').insert(row);
  if (error) throw new Error(`Failed to insert pending: ${error.message}`);
}

export async function deletePending(id: string): Promise<void> {
  const { error } = await getSupabase().from('mis_pending').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete pending: ${error.message}`);
}

export async function getPendingById(id: string): Promise<PendingError | null> {
  const { data, error } = await getSupabase()
    .from('mis_pending')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return toCamelPending(data as SnakeCasePending);
}

export async function getMaxErrorId(): Promise<number> {
  const { data, error } = await getSupabase()
    .from('mis_errors')
    .select('id');
  if (error) throw new Error(`Failed to get max error id: ${error.message}`);
  let max = 0;
  for (const row of data) {
    const num = parseInt(row.id.replace(/^error-/, ''), 10);
    if (!isNaN(num) && num > max) max = num;
  }
  return max;
}
