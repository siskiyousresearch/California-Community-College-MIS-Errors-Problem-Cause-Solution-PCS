'use client';

import { useState, useEffect, FormEvent } from 'react';

interface AddErrorPanelProps {
  open: boolean;
  onClose: () => void;
}

const SYSTEMS = ['Colleague', 'Banner', 'PeopleSoft', 'Other'];
const ERROR_TYPES = ['Syntactical', 'Referential', 'Quality'];
const FILE_TYPES = [
  'SB', 'SG', 'CB', 'XF', 'XE', 'SX', 'SY', 'SC', 'CW', 'SD', 'SE', 'SM',
  'SS', 'SV', 'SL', 'SA', 'AA', 'SF', 'FA', 'SP', 'EB', 'EJ', 'CC', 'GI',
  'SI', 'SCD', 'STD', 'SXD', 'XBD', 'EBD', 'XB',
];

export default function AddErrorPanel({ open, onClose }: AddErrorPanelProps) {
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [system, setSystem] = useState('');
  const [errorType, setErrorType] = useState('');
  const [fileType, setFileType] = useState('');
  const [dataElement, setDataElement] = useState('');
  const [ddeValue, setDdeValue] = useState('');
  const [description, setDescription] = useState('');
  const [info1, setInfo1] = useState('');
  const [info2, setInfo2] = useState('');
  const [solution, setSolution] = useState('');

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function resetForm() {
    setSystem('');
    setErrorType('');
    setFileType('');
    setDataElement('');
    setDdeValue('');
    setDescription('');
    setInfo1('');
    setInfo2('');
    setSolution('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!system || !errorType || !fileType || !description) {
      setToast({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/errors/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system, errorType, fileType, dataElement, ddeValue,
          description, info1, info2, solution,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ type: 'success', message: 'Error submitted successfully!' });
        resetForm();
        setTimeout(onClose, 1500);
      } else {
        setToast({ type: 'error', message: data.error || 'Submission failed.' });
      }
    } catch {
      setToast({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Panel header */}
          <div className="bg-cccco-navy text-white px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Add New Error</h2>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Toast */}
          {toast && (
            <div
              className={`mx-6 mt-4 px-4 py-3 rounded-lg text-sm font-medium ${
                toast.type === 'success'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}
            >
              {toast.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                System <span className="text-red-500">*</span>
              </label>
              <select
                value={system}
                onChange={(e) => setSystem(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue"
              >
                <option value="">Select system...</option>
                {SYSTEMS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Error Type <span className="text-red-500">*</span>
              </label>
              <select
                value={errorType}
                onChange={(e) => setErrorType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue"
              >
                <option value="">Select error type...</option>
                {ERROR_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                File Type <span className="text-red-500">*</span>
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue"
              >
                <option value="">Select file type...</option>
                {FILE_TYPES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Data Element
              </label>
              <input
                type="text"
                value={dataElement}
                onChange={(e) => setDataElement(e.target.value)}
                placeholder="e.g. CB24"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                DDE Value
              </label>
              <input
                type="text"
                value={ddeValue}
                onChange={(e) => setDdeValue(e.target.value)}
                placeholder="e.g. X"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe the error..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Info 1
              </label>
              <input
                type="text"
                value={info1}
                onChange={(e) => setInfo1(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Info 2
              </label>
              <input
                type="text"
                value={info2}
                onChange={(e) => setInfo2(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Solution
              </label>
              <textarea
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                rows={3}
                placeholder="How to fix this error..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cccco-blue resize-none"
              />
            </div>

            <div className="pt-2 pb-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-cccco-blue hover:bg-cccco-blue-light disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Error'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
