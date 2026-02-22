import { NextRequest, NextResponse } from 'next/server';

const REQUIRED_FIELDS = ['system', 'errorType', 'fileType', 'description'];

export async function POST(request: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Validate required fields
  const missing = REQUIRED_FIELDS.filter((f) => !body[f]?.trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 }
    );
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'Server is not configured with a GITHUB_TOKEN. Please set the GITHUB_TOKEN environment variable to enable error submissions.' },
      { status: 503 }
    );
  }

  const owner = 'siskiyousresearch';
  const repo = 'California-Community-College-MIS-Errors-Problem-Cause-Solution-PCS';
  const workflowFile = 'update-csv.yml';

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowFile}/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            system: body.system,
            errorType: body.errorType,
            fileType: body.fileType,
            dataElement: body.dataElement || '',
            ddeValue: body.ddeValue || '',
            description: body.description,
            info1: body.info1 || '',
            info2: body.info2 || '',
            solution: body.solution || '',
          },
        }),
      }
    );

    if (res.status === 204) {
      return NextResponse.json({ success: true, message: 'Error submitted successfully. The workflow has been triggered.' });
    }

    const errorData = await res.text();
    return NextResponse.json(
      { error: `GitHub API returned ${res.status}: ${errorData}` },
      { status: 502 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to trigger GitHub workflow: ${err instanceof Error ? err.message : 'Unknown error'}` },
      { status: 502 }
    );
  }
}
