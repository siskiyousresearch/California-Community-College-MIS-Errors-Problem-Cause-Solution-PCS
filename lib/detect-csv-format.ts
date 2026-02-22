export function detectFormat(headers: string[]) {
  // Map common variations
  const mapping: Record<string, string> = {
    'System': 'system',
    'System Name': 'system',
    'Student Information System': 'system',
    'Error Type': 'errorType',
    'Error Code': 'errorType',
    'File Type': 'fileType',
    'Field Name': 'dataElement',
    'Data Element': 'dataElement',
    'DDE': 'ddeValue',
    'Data Dictionary Element Value': 'ddeValue',
    'Value': 'ddeValue',
    'Description': 'description',
    'Error Description': 'description',
    'Solution': 'solution',
    'Resolution': 'solution',
    'Info 1': 'info1',
    'Info1': 'info1',
    'Info 2': 'info2',
    'Info2': 'info2',
  };

  const normalized: Record<string, string> = {};
  headers.forEach(header => {
    const normalized_key = mapping[header] || header.toLowerCase();
    normalized[header] = normalized_key;
  });

  return normalized;
}
