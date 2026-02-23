import { NextRequest, NextResponse } from 'next/server';
import { getPendingById, deletePending } from '@/lib/admin';

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

  return NextResponse.json({ success: true });
}
