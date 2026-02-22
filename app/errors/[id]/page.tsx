import Link from 'next/link';
import { notFound } from 'next/navigation';
import errors from '@/public/errors.json';

interface ErrorPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return errors.map((error: { id: string }) => ({ id: error.id }));
}

export async function generateMetadata({ params }: ErrorPageProps) {
  const { id } = await params;
  const error = errors.find((e: { id: string }) => e.id === id);
  if (!error) return { title: 'Error Not Found' };
  return {
    title: `${error.dataElement || error.description} - CC-MIS Error Reference`,
    description: error.description,
  };
}

export default async function ErrorDetailPage({ params }: ErrorPageProps) {
  const { id } = await params;
  const error = errors.find((e: { id: string }) => e.id === id);

  if (!error) {
    notFound();
  }

  return (
    <main className="min-h-[calc(100vh-8rem)]">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-cccco-blue dark:text-cccco-blue-light hover:underline font-medium mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to search
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-transparent dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="bg-cccco-navy dark:bg-cccco-navy-light px-6 py-4">
            <div className="flex flex-wrap gap-2 mb-2">
              {error.system && (
                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                  {error.system}
                </span>
              )}
              {error.errorType && (
                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                  {error.errorType}
                </span>
              )}
              {error.fileType && (
                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                  {error.fileType}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white">
              {error.dataElement || 'Error'} — {error.description}
            </h1>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-6">
            {/* ID */}
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Error ID: {error.id}
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DetailField label="System" value={error.system} />
              <DetailField label="Error Type" value={error.errorType} />
              <DetailField label="File Type" value={error.fileType} />
              <DetailField label="Data Element" value={error.dataElement} />
              <DetailField label="DDE Value" value={error.ddeValue} />
              <DetailField label="Info 1" value={error.info1} />
              <DetailField label="Info 2" value={error.info2} />
            </div>

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Description
              </h2>
              <p className="text-slate-800 dark:text-slate-200">{error.description || '—'}</p>
            </div>

            {/* Solution */}
            {error.solution && (
              <div className="p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h2 className="text-sm font-semibold text-green-900 dark:text-green-300 mb-2">
                  Solution
                </h2>
                <p className="text-green-800 dark:text-green-200 leading-relaxed">
                  {error.solution}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-slate-900 dark:text-slate-100 mt-0.5">{value}</p>
    </div>
  );
}
