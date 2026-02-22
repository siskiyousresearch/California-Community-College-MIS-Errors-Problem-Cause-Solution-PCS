'use client';

import { useEffect, useState } from 'react';

interface PendingError {
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
  submittedAt: string;
}

export default function AdminPendingPage() {
  const [pending, setPending] = useState<PendingError[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  async function fetchPending() {
    try {
      const res = await fetch('/api/admin/pending');
      if (res.ok) {
        setPending(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPending();
  }, []);

  async function handleApprove(id: string) {
    setActionId(id);
    try {
      const res = await fetch(`/api/admin/pending/${id}/approve`, { method: 'POST' });
      if (res.ok) {
        setPending((prev) => prev.filter((p) => p.id !== id));
      }
    } finally {
      setActionId(null);
    }
  }

  async function handleReject(id: string) {
    if (!confirm('Reject this submission? This cannot be undone.')) return;
    setActionId(id);
    try {
      const res = await fetch(`/api/admin/pending/${id}/reject`, { method: 'POST' });
      if (res.ok) {
        setPending((prev) => prev.filter((p) => p.id !== id));
      }
    } finally {
      setActionId(null);
    }
  }

  if (loading) {
    return <div className="bg-white p-8 rounded-lg shadow-md">Loading pending submissions...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-[#003865] mb-4">
        Pending Submissions ({pending.length})
      </h3>

      {pending.length === 0 ? (
        <p className="text-gray-500">No pending submissions.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Submitted</th>
                <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">System</th>
                <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Error Type</th>
                <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">File Type</th>
                <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Data Element</th>
                <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Description</th>
                <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Solution</th>
                <th className="bg-[#003865] text-white px-2 py-2 text-left text-sm border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-2 py-1 text-sm border border-gray-300 whitespace-nowrap">
                    {new Date(item.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-1 text-sm border border-gray-300">{item.system}</td>
                  <td className="px-2 py-1 text-sm border border-gray-300">{item.errorType}</td>
                  <td className="px-2 py-1 text-sm border border-gray-300">{item.fileType}</td>
                  <td className="px-2 py-1 text-sm border border-gray-300">{item.dataElement}</td>
                  <td className="px-2 py-1 text-sm border border-gray-300">{item.description}</td>
                  <td className="px-2 py-1 text-sm border border-gray-300">{item.solution}</td>
                  <td className="px-2 py-1 text-sm border border-gray-300 whitespace-nowrap">
                    <button
                      onClick={() => handleApprove(item.id)}
                      disabled={actionId === item.id}
                      className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded mr-1 cursor-pointer border-none transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      disabled={actionId === item.id}
                      className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded cursor-pointer border-none transition-colors"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
