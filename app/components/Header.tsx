'use client';

import { useState } from 'react';
import AddErrorPanel from './AddErrorPanel';

export default function Header() {
  const [addPanelOpen, setAddPanelOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[95%] mx-auto flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.cccco.edu/assets/img/CCCCO-Logo.png"
              alt="California Community Colleges Chancellor's Office"
              className="h-[50px]"
            />
            <h1 className="text-[1.8rem] font-bold text-[#003865] m-0">
              MIS Errors Catalog
            </h1>
          </div>

          <nav className="flex items-center gap-5">
            <a
              href="https://www.cccco.edu"
              className="text-[#003865] font-bold no-underline hover:underline"
            >
              Home
            </a>
            <a
              href="https://siskiyousresearch.github.io/California-Community-College-MIS-Errors-Problem-Cause-Solution-PCS/Article_000005280_MIS_Report_Values-UpdatedJul2024-81.xlsx"
              download
              className="text-[#003865] font-bold no-underline hover:underline"
            >
              MIS Data Element Banner Location Updated July 2024
            </a>
            <a
              href="https://webdata.cccco.edu/ded/ded.htm"
              className="text-[#003865] font-bold no-underline hover:underline"
            >
              MIS Data Element Dictionary
            </a>
            <button
              onClick={() => setAddPanelOpen(true)}
              className="bg-[#0073e6] text-white border-none px-4 py-2 rounded-[5px] cursor-pointer font-bold hover:bg-[#005bb5] transition-colors"
            >
              Add New Error
            </button>
            <a
              href="/admin"
              className="text-[#003865] font-bold no-underline hover:underline"
            >
              Admin
            </a>
          </nav>
        </div>
      </header>

      <AddErrorPanel open={addPanelOpen} onClose={() => setAddPanelOpen(false)} />
    </>
  );
}
