import { NextRequest, NextResponse } from 'next/server';
import { readPending, writePending } from '@/lib/admin';

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

  pending.splice(index, 1);
  writePending(pending);

  return NextResponse.json({ success: true });
}
