'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import AddErrorPanel from './AddErrorPanel';

export default function Header() {
  const [addPanelOpen, setAddPanelOpen] = useState(false);

  return (
    <>
      <header className="bg-cccco-navy text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-cccco-navy font-bold text-xs">CCC</span>
                </div>
                <span className="text-lg font-bold hidden sm:inline">MIS Errors Catalog</span>
                <span className="text-lg font-bold sm:hidden">MIS Errors</span>
              </Link>
            </div>

            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/"
                className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                About
              </Link>
              <button
                onClick={() => setAddPanelOpen(true)}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-cccco-blue hover:bg-cccco-blue-light transition-colors"
              >
                Add Error
              </button>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <AddErrorPanel open={addPanelOpen} onClose={() => setAddPanelOpen(false)} />
    </>
  );
}
