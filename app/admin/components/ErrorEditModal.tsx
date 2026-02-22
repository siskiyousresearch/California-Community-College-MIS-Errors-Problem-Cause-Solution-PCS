'use client';

import { useState, FormEvent, useEffect } from 'react';
import { SYSTEMS, ERROR_TYPES, FILE_TYPES } from '@/lib/constants';

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

interface ErrorEditModalProps {
  error: MISError;
  onClose: () => void;
  onSaved: (updated: MISError) => void;
}

export default function ErrorEditModal({ error, onClose, onSaved }: ErrorEditModalProps) {
  const [system, setSystem] = useState(error.system);
  const [errorType, setErrorType] = useState(error.errorType);
  const [fileType, setFileType] = useState(error.fileType);
  const [dataElement, setDataElement] = useState(error.dataElement);
  const [ddeValue, setDdeValue] = useState(error.ddeValue);
  const [description, setDescription] = useState(error.description);
  const [info1, setInfo1] = useState(error.info1);
  const [info2, setInfo2] = useState(error.info2);
  const [solution, setSolution] = useState(error.solution);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!system || !errorType || !fileType || !description) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setSaving(true);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/admin/errors/${error.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system, errorType, fileType, dataElement, ddeValue,
          description, info1, info2, solution,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onSaved(data.error);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to save.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0073e6] text-sm';
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1';

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="bg-[#003865] text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
            <h2 className="text-lg font-bold">Edit Error: {error.id}</h2>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded text-white border-none cursor-pointer bg-transparent">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {errorMsg && (
            <div className="mx-6 mt-4 bg-red-100 text-red-800 px-4 py-3 rounded text-sm">{errorMsg}</div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>System <span className="text-red-500">*</span></label>
                <select value={system} onChange={(e) => setSystem(e.target.value)} className={inputClass}>
                  <option value="">Select...</option>
                  {SYSTEMS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Error Type <span className="text-red-500">*</span></label>
                <select value={errorType} onChange={(e) => setErrorType(e.target.value)} className={inputClass}>
                  <option value="">Select...</option>
                  {ERROR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>File Type <span className="text-red-500">*</span></label>
                <select value={fileType} onChange={(e) => setFileType(e.target.value)} className={inputClass}>
                  <option value="">Select...</option>
                  {FILE_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Data Element</label>
                <input type="text" value={dataElement} onChange={(e) => setDataElement(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>DDE Value</label>
                <input type="text" value={ddeValue} onChange={(e) => setDdeValue(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Description <span className="text-red-500">*</span></label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputClass + ' resize-none'} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Info 1</label>
                <input type="text" value={info1} onChange={(e) => setInfo1(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Info 2</label>
                <input type="text" value={info2} onChange={(e) => setInfo2(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Solution</label>
              <textarea value={solution} onChange={(e) => setSolution(e.target.value)} rows={3} className={inputClass + ' resize-none'} />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-3 bg-[#003865] hover:bg-[#002a4a] disabled:opacity-50 text-white font-semibold rounded-lg transition-colors cursor-pointer border-none"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors cursor-pointer border-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
