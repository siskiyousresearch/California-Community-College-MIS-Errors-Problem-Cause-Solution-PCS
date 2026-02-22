import { NextRequest, NextResponse } from 'next/server';
import { readErrors, writeErrors, MISError } from '@/lib/admin';

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

  const errors = readErrors();
  const index = errors.findIndex((e) => e.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Error not found' }, { status: 404 });
  }

  errors[index] = {
    ...errors[index],
    system: body.system ?? errors[index].system,
    errorType: body.errorType ?? errors[index].errorType,
    fileType: body.fileType ?? errors[index].fileType,
    dataElement: body.dataElement ?? errors[index].dataElement,
    ddeValue: body.ddeValue ?? errors[index].ddeValue,
    description: body.description ?? errors[index].description,
    info1: body.info1 ?? errors[index].info1,
    info2: body.info2 ?? errors[index].info2,
    solution: body.solution ?? errors[index].solution,
  };

  writeErrors(errors);
  return NextResponse.json({ success: true, error: errors[index] });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const errors = readErrors();
  const index = errors.findIndex((e) => e.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Error not found' }, { status: 404 });
  }

  errors.splice(index, 1);
  writeErrors(errors);
  return NextResponse.json({ success: true });
}
