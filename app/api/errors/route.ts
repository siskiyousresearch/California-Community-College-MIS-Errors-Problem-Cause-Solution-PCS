import { NextRequest, NextResponse } from 'next/server';
import errors from '@/public/errors.json';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const system = searchParams.get('system');
  const errorType = searchParams.get('errorType');
  const fileType = searchParams.get('fileType');
  const q = searchParams.get('q');

  let filtered = errors as Record<string, string>[];

  if (system) {
    filtered = filtered.filter((e) => e.system === system);
  }
  if (errorType) {
    filtered = filtered.filter((e) => e.errorType === errorType);
  }
  if (fileType) {
    filtered = filtered.filter((e) => e.fileType === fileType);
  }
  if (q) {
    const lower = q.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.description?.toLowerCase().includes(lower) ||
        e.solution?.toLowerCase().includes(lower) ||
        e.dataElement?.toLowerCase().includes(lower) ||
        e.system?.toLowerCase().includes(lower) ||
        e.fileType?.toLowerCase().includes(lower)
    );
  }

  return NextResponse.json(filtered);
}
