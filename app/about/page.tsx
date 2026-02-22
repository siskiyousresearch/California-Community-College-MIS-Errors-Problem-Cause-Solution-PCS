import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About - CC-MIS Error Reference',
  description: 'About the CC-MIS Error Reference tool for California Community Colleges',
};

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-8rem)]">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-cccco-navy dark:text-white mb-6">
          About CC-MIS Error Reference
        </h1>

        <div className="space-y-8">
          {/* What is this */}
          <Section title="What is this tool?">
            <p>
              The CC-MIS Error Reference is a searchable catalog of Management Information System (MIS)
              errors encountered by California Community Colleges when submitting data to the Chancellor's
              Office. It provides Problem-Cause-Solution (PCS) documentation to help MIS professionals
              quickly identify and resolve reporting errors.
            </p>
          </Section>

          {/* How to use */}
          <Section title="How to use">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Search</strong> — Type keywords in the search box to find errors by description, data element, system, or solution.</li>
              <li><strong>Filter</strong> — Use the System, Error Type, and File Type dropdowns to narrow results.</li>
              <li><strong>View details</strong> — Click any error card to expand it, or click "View full details" for the complete error page.</li>
              <li><strong>Add errors</strong> — Click "Add Error" in the header to submit new errors to the catalog.</li>
            </ul>
          </Section>

          {/* Systems */}
          <Section title="Systems">
            <div className="grid gap-4">
              <SystemCard
                name="Banner"
                description="Ellucian Banner is an enterprise resource planning (ERP) system used by many California community colleges for student information, financial aid, human resources, and finance."
              />
              <SystemCard
                name="Colleague"
                description="Ellucian Colleague is another widely-used ERP system in community colleges, handling student records, academics, financial management, and institutional advancement."
              />
              <SystemCard
                name="PeopleSoft"
                description="Oracle PeopleSoft is used by some California community college districts for administrative functions including student administration, human capital management, and financials."
              />
            </div>
          </Section>

          {/* Error Types */}
          <Section title="Error Types">
            <div className="grid gap-4">
              <ErrorTypeCard
                name="Syntactical"
                description="Data format or value errors. These occur when a field contains an invalid value, incorrect format, or violates the rules defined in the Data Element Dictionary (DED). Examples include invalid codes, values out of range, or mismatched paired elements."
              />
              <ErrorTypeCard
                name="Referential"
                description="Cross-file relationship errors. These occur when data in one file references records that don't exist, are duplicated, or are inconsistent in another file. Examples include student IDs not found in production tables, duplicate key errors, or domain record mismatches."
              />
              <ErrorTypeCard
                name="Quality"
                description="Statistical threshold errors. These occur when aggregate data exceeds acceptable quality thresholds, such as too many students with undecided goals, too many enrollments not active at census, or high percentages of missing records across files."
              />
            </div>
          </Section>

          {/* File Types */}
          <Section title="File Types">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cccco-navy dark:bg-cccco-navy-light text-white">
                    <th className="px-4 py-2 text-left font-semibold">Code</th>
                    <th className="px-4 py-2 text-left font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {FILE_TYPE_TABLE.map(({ code, description }) => (
                    <tr key={code} className="bg-white dark:bg-slate-800">
                      <td className="px-4 py-2 font-mono font-semibold text-cccco-navy dark:text-cccco-blue-light">{code}</td>
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Resources */}
          <Section title="Resources">
            <ul className="space-y-2">
              <li>
                <a
                  href="https://webdata.cccco.edu/ded/ded.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cccco-blue dark:text-cccco-blue-light hover:underline font-medium"
                >
                  MIS Data Element Dictionary (DED)
                </a>
                {' '}— Official reference for all MIS data elements, valid values, and business rules.
              </li>
              <li>
                <a
                  href="https://www.cccco.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cccco-blue dark:text-cccco-blue-light hover:underline font-medium"
                >
                  California Community Colleges Chancellor's Office
                </a>
                {' '}— Official CCCCO website.
              </li>
              <li>
                <a
                  href="https://datamart.cccco.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cccco-blue dark:text-cccco-blue-light hover:underline font-medium"
                >
                  CCCCO DataMart
                </a>
                {' '}— Public data portal for California Community Colleges data.
              </li>
            </ul>
          </Section>

          <div className="text-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cccco-blue hover:bg-cccco-blue-light text-white font-semibold rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Error Search
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-transparent dark:border-slate-700">
      <h2 className="text-xl font-bold text-cccco-navy dark:text-white mb-4">{title}</h2>
      <div className="text-slate-700 dark:text-slate-300 leading-relaxed">{children}</div>
    </section>
  );
}

function SystemCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
      <h3 className="font-semibold text-cccco-navy dark:text-white mb-1">{name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}

function ErrorTypeCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
      <h3 className="font-semibold text-cccco-navy dark:text-white mb-1">{name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}

const FILE_TYPE_TABLE = [
  { code: 'SB', description: 'Student Basic (Demographics)' },
  { code: 'SG', description: 'Student Group (Ethnicity/Race)' },
  { code: 'CB', description: 'Course Basic (Course Information)' },
  { code: 'XF', description: 'Section (Course Section Details)' },
  { code: 'XE', description: 'Employee Assignment (Faculty/Staff Assignments)' },
  { code: 'SX', description: 'Student Enrollment (Course Enrollment)' },
  { code: 'SY', description: 'Student Year (Annual Student Data)' },
  { code: 'SC', description: 'Student CalWORKs (CalWORKs Program)' },
  { code: 'CW', description: 'CalWORKs (CalWORKs Services)' },
  { code: 'SD', description: 'Student Disability (DSPS)' },
  { code: 'SE', description: 'Student EOPS (EOPS/CARE)' },
  { code: 'SM', description: 'Student Major (Declared Majors)' },
  { code: 'SS', description: 'Student Services (Student Services)' },
  { code: 'SV', description: 'Student VTEA (Vocational Education)' },
  { code: 'SL', description: 'Student Matriculation (Matriculation Services)' },
  { code: 'SA', description: 'Student Achievement (Awards/Degrees)' },
  { code: 'AA', description: 'Activity (Activity Records)' },
  { code: 'SF', description: 'Student Financial Aid (Financial Aid Applicant)' },
  { code: 'FA', description: 'Financial Aid Awards (Award Details)' },
  { code: 'SP', description: 'Student Programs (Special Programs)' },
  { code: 'EB', description: 'Employee Basic (Employee Demographics)' },
  { code: 'EJ', description: 'Employee Job (Job Assignments)' },
  { code: 'CC', description: 'College Calendar (Academic Calendar)' },
  { code: 'XB', description: 'Section Basic (Section Basics)' },
  { code: 'GI', description: 'Grant Information (Grant Data)' },
  { code: 'SI', description: 'Student Information (Supplemental Info)' },
];
