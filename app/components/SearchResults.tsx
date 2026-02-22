'use client';

import { useState, useMemo } from 'react';
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

const ITEMS_PER_PAGE = 50;

export default function SearchResults({ errors, total }: SearchResultsProps) {
  const [currentPage, setCurrentPage] = useState(1);

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

  if (errors.length === 0) {
    return (
      <p className="text-gray-500 py-4">
        No errors found. Try adjusting your search or filters.
      </p>
    );
  }

  return (
    <div>
      <div className="text-sm text-gray-600 mb-2">
        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}&ndash;{Math.min(currentPage * ITEMS_PER_PAGE, errors.length)} of{' '}
        {errors.length} errors
        {errors.length < total && <span> (filtered from {total} total)</span>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse my-4">
          <thead>
            <tr>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Student Information System</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Error Type</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">File Type</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Data Element</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Data Dictionary Element Value</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Error Description</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Info 1</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Info 2</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Solution</th>
            </tr>
          </thead>
          <tbody>
            {paginatedErrors.map((error) => (
              <tr key={error.id} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-sm border border-gray-300">{error.system}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.errorType}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.fileType}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.dataElement}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.ddeValue}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.description}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.info1}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.info2}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.solution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
