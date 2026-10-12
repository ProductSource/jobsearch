import Link from 'next/link';
import type { ReactNode } from 'react';
import ThemeToggle from './ThemeToggle';

/** Plain reading layout for the content pages. */
export default function DocShell({ children }: { children: ReactNode }) {
  return (
    <div className="doc">
      <header className="masthead">
        <Link href="/" className="wordmark" aria-label="BoolJobs home">
          <span className="seal" aria-hidden="true">&amp;</span>
          <span>BoolJobs</span>
        </Link>
        <ThemeToggle />
      </header>
      <main className="glass doc-card">{children}</main>
      <footer className="doc-foot">
        <Link href="/">Search</Link>
        <Link href="/how-it-works/">How it works</Link>
        <Link href="/faq/">FAQ</Link>
      </footer>
    </div>
  );
}
