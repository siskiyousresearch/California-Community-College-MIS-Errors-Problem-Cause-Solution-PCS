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
    title: `${error.dataElement || error.description} - MIS Errors Catalog`,
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
    <main>
      <div className="max-w-[95%] mx-auto my-8 bg-white p-8 rounded-lg shadow-md">
        <Link
          href="/"
          className="text-[#0073e6] font-bold hover:underline mb-6 inline-block"
        >
          &larr; Back to search
        </Link>

        <h2 className="text-2xl font-bold text-[#003865] mb-4">
          {error.dataElement || 'Error'} &mdash; {error.description}
        </h2>

        <table className="w-full border-collapse my-4">
          <tbody>
            <DetailRow label="Student Information System" value={error.system} />
            <DetailRow label="Error Type" value={error.errorType} />
            <DetailRow label="File Type" value={error.fileType} />
            <DetailRow label="Data Element" value={error.dataElement} />
            <DetailRow label="Data Dictionary Element Value" value={error.ddeValue} />
            <DetailRow label="Error Description" value={error.description} />
            <DetailRow label="Info 1" value={error.info1} />
            <DetailRow label="Info 2" value={error.info2} />
            <DetailRow label="Solution" value={error.solution} />
          </tbody>
        </table>
      </div>
    </main>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <tr>
      <th className="bg-[#003865] text-white px-3 py-2 text-left text-sm border border-gray-300 w-[200px] align-top">
        {label}
      </th>
      <td className="px-3 py-2 text-sm border border-gray-300">{value}</td>
    </tr>
  );
}
