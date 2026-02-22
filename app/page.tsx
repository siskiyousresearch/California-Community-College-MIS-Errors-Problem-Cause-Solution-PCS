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
      <div className="p-8 text-slate-600 dark:text-slate-400">
        Loading error database...
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-8rem)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cccco-navy dark:text-white mb-2">
            CC-MIS Error Reference
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Searchable catalog of {errors.length} system errors across California Community Colleges
          </p>
        </div>
        <SearchInterface allErrors={errors} />
      </div>
    </main>
  );
}
