'use client';

import { useEffect, useState } from 'react';
import { loadErrors, MISError } from '@/lib/load-errors';
import SearchInterface from './components/SearchInterface';

export default function Page() {
  const [errors, setErrors] = useState<MISError[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const data = loadErrors();
      setErrors(data);
      setLoaded(true);
    } catch (e) {
      console.error('Failed to load errors:', e);
    }
  }, []);

  if (!loaded) {
    return (
      <div className="max-w-[95%] mx-auto my-8 bg-white p-8 rounded-lg shadow-md">
        Loading error database...
      </div>
    );
  }

  return (
    <main>
      <div className="max-w-[95%] mx-auto my-8 bg-white p-8 rounded-lg shadow-md overflow-x-auto">
        <SearchInterface allErrors={errors} />
      </div>
    </main>
  );
}
