import Link from 'next/link';

/** Short intro for the empty state of the app. The long-form copy lives on /how-it-works and /faq. */
export default function Guide() {
  return (
    <section className="intro">
      <h1>Boolean job search for every hiring platform</h1>
      <p>
        Enter a role and a time window. Every source opens its own search in a new tab. Tick a source once you
        have finished applying there.
      </p>
      <nav className="intro-links" aria-label="About">
        <Link href="/how-it-works/">How it works</Link>
        <Link href="/faq/">FAQ</Link>
      </nav>
    </section>
  );
}
