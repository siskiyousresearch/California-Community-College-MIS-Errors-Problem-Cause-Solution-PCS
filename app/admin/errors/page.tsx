'use client';

import { useEffect, useState } from 'react';
import ErrorEditModal from '../components/ErrorEditModal';

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

export default function AdminErrorsPage() {
  const [errors, setErrors] = useState<MISError[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MISError | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchErrors() {
    try {
      const res = await fetch('/api/errors');
      if (res.ok) {
        setErrors(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchErrors();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Delete this error? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/errors/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setErrors((prev) => prev.filter((e) => e.id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  }

  function handleSaved(updated: MISError) {
    setErrors((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setEditing(null);
  }

  if (loading) {
    return <div className="bg-white p-8 rounded-lg shadow-md">Loading errors...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-[#003865] mb-4">
        All Errors ({errors.length})
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">ID</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">System</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Error Type</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">File Type</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Data Element</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Description</th>
              <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {errors.map((error) => (
              <tr key={error.id} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-sm border border-gray-300 whitespace-nowrap">{error.id}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.system}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.errorType}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.fileType}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.dataElement}</td>
                <td className="px-2 py-1 text-sm border border-gray-300">{error.description}</td>
                <td className="px-2 py-1 text-sm border border-gray-300 whitespace-nowrap">
                  <button
                    onClick={() => setEditing(error)}
                    className="bg-[#0073e6] hover:bg-[#005bb5] text-white text-xs px-3 py-1 rounded mr-1 cursor-pointer border-none transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(error.id)}
                    disabled={deletingId === error.id}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded cursor-pointer border-none transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <ErrorEditModal
          error={editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
