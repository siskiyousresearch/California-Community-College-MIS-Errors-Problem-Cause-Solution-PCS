import { NextRequest, NextResponse } from 'next/server';
import { updateError, deleteError, MISError } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: Partial<MISError>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    const updated = await updateError(id, body);
    return NextResponse.json({ success: true, error: updated });
  } catch {
    return NextResponse.json({ error: 'Error not found' }, { status: 404 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await deleteError(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error not found' }, { status: 404 });
  }
}
