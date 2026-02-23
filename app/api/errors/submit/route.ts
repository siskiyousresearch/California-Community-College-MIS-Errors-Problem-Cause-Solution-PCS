import { NextRequest, NextResponse } from 'next/server';
import { insertPending } from '@/lib/admin';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

const REQUIRED_FIELDS = ['system', 'errorType', 'fileType', 'description'];

export async function POST(request: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((f) => !body[f]?.trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 }
    );
  }

  await insertPending({
    id: `pending-${randomUUID()}`,
    system: body.system,
    errorType: body.errorType,
    fileType: body.fileType,
    dataElement: body.dataElement || '',
    ddeValue: body.ddeValue || '',
    description: body.description,
    info1: body.info1 || '',
    info2: body.info2 || '',
    solution: body.solution || '',
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, message: 'Error submitted for review.' });
}
