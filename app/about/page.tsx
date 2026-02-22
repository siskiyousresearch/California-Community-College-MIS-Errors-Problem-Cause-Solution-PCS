import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About - MIS Errors Catalog',
  description: 'About the MIS Errors Catalog for California Community Colleges',
};

export default function AboutPage() {
  return (
    <main>
      <div className="max-w-[95%] mx-auto my-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#003865] mb-4">About MIS Errors Catalog</h2>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">What is this tool?</h3>
        <p className="text-gray-700 mb-4">
          The MIS Errors Catalog is a searchable catalog of Management Information System (MIS)
          errors encountered by California Community Colleges when submitting data to the Chancellor&apos;s
          Office. It provides Problem-Cause-Solution (PCS) documentation to help MIS professionals
          quickly identify and resolve reporting errors.
        </p>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">How to use</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li><strong>Search</strong> &mdash; Type keywords in the search box to find errors by description, data element, system, or solution.</li>
          <li><strong>Filter</strong> &mdash; Use the System, Error Type, and File Type dropdowns to narrow results.</li>
          <li><strong>Add errors</strong> &mdash; Click &ldquo;Add New Error&rdquo; in the header to submit new errors to the catalog.</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">Systems</h3>
        <table className="w-full border-collapse my-4">
          <thead>
            <tr>
              <th className="bg-[#003865] text-white px-3 py-2 text-left text-sm border border-gray-300">System</th>
              <th className="bg-[#003865] text-white px-3 py-2 text-left text-sm border border-gray-300">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 text-sm border border-gray-300 font-semibold">Banner</td>
              <td className="px-3 py-2 text-sm border border-gray-300">Ellucian Banner &mdash; ERP system used by many California community colleges for student information, financial aid, human resources, and finance.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 text-sm border border-gray-300 font-semibold">Colleague</td>
              <td className="px-3 py-2 text-sm border border-gray-300">Ellucian Colleague &mdash; ERP system handling student records, academics, financial management, and institutional advancement.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 text-sm border border-gray-300 font-semibold">PeopleSoft</td>
              <td className="px-3 py-2 text-sm border border-gray-300">Oracle PeopleSoft &mdash; used by some districts for student administration, human capital management, and financials.</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">Resources</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>
            <a href="https://webdata.cccco.edu/ded/ded.htm" target="_blank" rel="noopener noreferrer" className="text-[#0073e6] font-bold hover:underline">
              MIS Data Element Dictionary (DED)
            </a>
            {' '}&mdash; Official reference for all MIS data elements, valid values, and business rules.
          </li>
          <li>
            <a href="https://www.cccco.edu/" target="_blank" rel="noopener noreferrer" className="text-[#0073e6] font-bold hover:underline">
              California Community Colleges Chancellor&apos;s Office
            </a>
            {' '}&mdash; Official CCCCO website.
          </li>
          <li>
            <a href="https://datamart.cccco.edu/" target="_blank" rel="noopener noreferrer" className="text-[#0073e6] font-bold hover:underline">
              CCCCO DataMart
            </a>
            {' '}&mdash; Public data portal for California Community Colleges data.
          </li>
        </ul>

        <div className="mt-6">
          <Link
            href="/"
            className="text-[#0073e6] font-bold hover:underline"
          >
            &larr; Back to Error Search
          </Link>
        </div>
      </div>
    </main>
  );
}
