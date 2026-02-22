'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Pagination from './Pagination';

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

interface SearchResultsProps {
  errors: MISError[];
  total: number;
}

const ITEMS_PER_PAGE = 20;

export default function SearchResults({ errors, total }: SearchResultsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalPages = Math.ceil(errors.length / ITEMS_PER_PAGE);

  // Reset to page 1 when results change
  const resultsKey = errors.map((e) => e.id).join(',');
  const [prevKey, setPrevKey] = useState(resultsKey);
  if (resultsKey !== prevKey) {
    setPrevKey(resultsKey);
    if (currentPage !== 1) setCurrentPage(1);
  }

  const paginatedErrors = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return errors.slice(start, start + ITEMS_PER_PAGE);
  }, [errors, currentPage]);

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, errors.length);

  if (errors.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 text-center">
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          No errors found. Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Showing <span className="font-semibold">{startItem}–{endItem}</span> of{' '}
          <span className="font-semibold">{errors.length}</span> errors
          {errors.length < total && (
            <span> (filtered from {total} total)</span>
          )}
        </div>
      </div>

      {paginatedErrors.map((error) => (
        <div
          key={error.id}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-transparent dark:border-slate-700"
        >
          <button
            onClick={() =>
              setExpandedId(expandedId === error.id ? null : error.id)
            }
            className="w-full text-left p-6 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {error.system && (
                    <span className="px-3 py-1 bg-cccco-navy/10 text-cccco-navy dark:bg-cccco-navy-light/20 dark:text-blue-300 rounded-full text-sm font-medium">
                      {error.system}
                    </span>
                  )}
                  {error.errorType && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 rounded-full text-sm font-medium">
                      {error.errorType}
                    </span>
                  )}
                  {error.fileType && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm font-medium">
                      {error.fileType}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {error.dataElement || 'Unknown Element'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{error.description}</p>
              </div>

              <div className="ml-4 flex-shrink-0">
                <svg
                  className={`w-6 h-6 text-slate-400 dark:text-slate-500 transition-transform ${
                    expandedId === error.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </button>

          {expandedId === error.id && (
            <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {error.ddeValue && (
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      DDE Value
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">{error.ddeValue}</p>
                  </div>
                )}
                {error.info1 && (
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Info 1
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">{error.info1}</p>
                  </div>
                )}
                {error.info2 && (
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Info 2
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">{error.info2}</p>
                  </div>
                )}
              </div>

              {error.solution && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-300 mb-1">
                    Solution
                  </p>
                  <p className="text-green-800 dark:text-green-200">{error.solution}</p>
                </div>
              )}

              <div className="mt-4">
                <Link
                  href={`/errors/${error.id}`}
                  className="inline-flex items-center gap-1 text-sm text-cccco-blue dark:text-cccco-blue-light hover:underline font-medium"
                >
                  View full details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
