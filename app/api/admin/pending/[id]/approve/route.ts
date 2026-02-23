import { NextRequest, NextResponse } from 'next/server';
import { getPendingById, deletePending, insertError, getMaxErrorId } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await getPendingById(id);

  if (!item) {
    return NextResponse.json({ error: 'Pending error not found' }, { status: 404 });
  }

  await deletePending(id);

  const maxId = await getMaxErrorId();
  const newId = String(maxId + 1);
  const { submittedAt, ...errorData } = item;
  const newError = { ...errorData, id: newId };
  await insertError(newError);

  return NextResponse.json({ success: true, error: newError });
}
