'use client';

import { useState, useMemo } from 'react';
import SearchResults from './SearchResults';
import Fuse from 'fuse.js';

interface MISError {
  id: string;
  system: string;
  errorType: string;
  fileType: string;
  dataElement: string;
  ddeValue: string;
  description: string;
  info1: string;
  info2: string;
  solution: string;
}

interface SearchInterfaceProps {
  allErrors: MISError[];
}

export default function SearchInterface({ allErrors }: SearchInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSystem, setFilterSystem] = useState('');
  const [filterErrorType, setFilterErrorType] = useState('');
  const [filterFileType, setFilterFileType] = useState('');

  const systems = useMemo(() => {
    const set = new Set<string>();
    allErrors.forEach((e) => e.system && set.add(e.system));
    return Array.from(set).sort();
  }, [allErrors]);

  const errorTypes = useMemo(() => {
    const set = new Set<string>();
    allErrors.forEach((e) => e.errorType && set.add(e.errorType));
    return Array.from(set).sort();
  }, [allErrors]);

  const fileTypes = useMemo(() => {
    const set = new Set<string>();
    allErrors.forEach((e) => e.fileType && set.add(e.fileType));
    return Array.from(set).sort();
  }, [allErrors]);

  const results = useMemo(() => {
    let filtered = allErrors;
    if (filterSystem) filtered = filtered.filter((e) => e.system === filterSystem);
    if (filterErrorType) filtered = filtered.filter((e) => e.errorType === filterErrorType);
    if (filterFileType) filtered = filtered.filter((e) => e.fileType === filterFileType);

    if (searchQuery.trim()) {
      const fuse = new Fuse(filtered, {
        keys: ['system', 'errorType', 'fileType', 'dataElement', 'description', 'solution'],
        threshold: 0.3,
        includeScore: true,
      });
      return fuse.search(searchQuery).map((r) => r.item);
    }

    return filtered;
  }, [allErrors, searchQuery, filterSystem, filterErrorType, filterFileType]);

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-transparent dark:border-slate-700">
        <input
          type="text"
          placeholder="Search errors by system, type, description, solution..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 text-lg border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cccco-blue focus:ring-2 focus:ring-cccco-blue/20"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border border-transparent dark:border-slate-700">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            System
          </label>
          <select
            value={filterSystem}
            onChange={(e) => setFilterSystem(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue"
          >
            <option value="">All Systems</option>
            {systems.map((system) => (
              <option key={system} value={system}>
                {system}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border border-transparent dark:border-slate-700">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Error Type
          </label>
          <select
            value={filterErrorType}
            onChange={(e) => setFilterErrorType(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue"
          >
            <option value="">All Types</option>
            {errorTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border border-transparent dark:border-slate-700">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            File Type
          </label>
          <select
            value={filterFileType}
            onChange={(e) => setFilterFileType(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue"
          >
            <option value="">All File Types</option>
            {fileTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <SearchResults errors={results} total={allErrors.length} />
    </div>
  );
}
