import { NextRequest, NextResponse } from 'next/server';
import { readPending, writePending, readErrors, writeErrors, getNextErrorId } from '@/lib/admin';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pending = readPending();
  const index = pending.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Pending error not found' }, { status: 404 });
  }

  const [item] = pending.splice(index, 1);
  writePending(pending);

  const errors = readErrors();
  const newId = getNextErrorId(errors);
  const { submittedAt, ...errorData } = item;
  const newError = { ...errorData, id: newId };
  errors.push(newError);
  writeErrors(errors);

  return NextResponse.json({ success: true, error: newError });
}
