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
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Errors</h2>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select
          value={filterSystem}
          onChange={(e) => setFilterSystem(e.target.value)}
          className="w-[200px] px-2 py-2 border border-gray-300 rounded-[5px] text-base"
        >
          <option value="">Select Student Information System</option>
          {systems.map((system) => (
            <option key={system} value={system}>
              {system}
            </option>
          ))}
        </select>

        <select
          value={filterErrorType}
          onChange={(e) => setFilterErrorType(e.target.value)}
          className="w-[200px] px-2 py-2 border border-gray-300 rounded-[5px] text-base"
        >
          <option value="">Select Error Type</option>
          {errorTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={filterFileType}
          onChange={(e) => setFilterFileType(e.target.value)}
          className="w-[200px] px-2 py-2 border border-gray-300 rounded-[5px] text-base"
        >
          <option value="">Select File Type</option>
          {fileTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[300px] px-2 py-2 border border-gray-300 rounded-[5px] text-base"
        />
      </div>

      <SearchResults errors={results} total={allErrors.length} />
    </div>
  );
}
