'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show admin nav on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  const tabs = [
    { href: '/admin', label: 'Pending Submissions' },
    { href: '/admin/errors', label: 'All Errors' },
  ];

  return (
    <div>
      <div className="bg-[#003865] text-white px-6 py-3">
        <div className="max-w-[95%] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h2 className="text-lg font-bold m-0">Admin Panel</h2>
            <nav className="flex gap-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-4 py-2 rounded-t text-sm font-medium no-underline transition-colors ${
                    pathname === tab.href
                      ? 'bg-white text-[#003865]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/80 hover:text-white text-sm no-underline">
              Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white border-none px-4 py-2 rounded text-sm cursor-pointer transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[95%] mx-auto my-6">{children}</div>
    </div>
  );
}
