import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-cccco-navy text-white/80 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            Created by JT @ Siskiyous
          </p>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="https://www.cccco.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              CCCCO
            </a>
            <a
              href="https://webdata.cccco.edu/ded/ded.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              MIS Data Element Dictionary
            </a>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
