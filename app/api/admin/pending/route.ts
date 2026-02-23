import { NextResponse } from 'next/server';
import { readPending } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  const pending = await readPending();
  return NextResponse.json(pending);
}
