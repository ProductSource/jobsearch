import type { Metadata } from 'next';
import Link from 'next/link';
import DocShell from '@/components/DocShell';
import { SITES } from '@/lib/search';

export const metadata: Metadata = {
  title: 'How Boolean job search works',
  description:
    'Learn how to use quotes, OR and site: to search Greenhouse, Lever, Ashby and Workday for jobs posted in the last 24 hours, and how BoolJobs builds each query for you.',
  alternates: { canonical: '/how-it-works/' }
};

export default function HowItWorks() {
  return (
    <DocShell>
      <h1>How Boolean job search works</h1>
      <p className="lede">
        BoolJobs writes a Boolean search for each of {SITES.length} applicant tracking systems and career-page
        patterns, including Greenhouse, Lever, Ashby and Workday. You open a source in a new tab, apply, then tick it off.
      </p>

      <h2>Using the tool</h2>
      <ol className="steps">
        <li><strong>Add your roles.</strong> Type a title and press Enter. Add several to search them together.</li>
        <li><strong>Pick a time window.</strong> From the past hour to the past month, applied to every link.</li>
        <li><strong>Narrow it down.</strong> Work arrangement, location and seniority are on the left. Salary and keywords sit under more filters.</li>
        <li><strong>Work through the list.</strong> Each source opens its own results. Tick it when you are done and your progress is remembered in your browser.</li>
      </ol>

      <h2>Anatomy of a query</h2>
      <p><code>&quot;Product Manager&quot; site:boards.greenhouse.io remote</code></p>
      <ul className="bullets">
        <li><strong>Quotes</strong> keep a title together as one phrase.</li>
        <li><strong>OR</strong> lets several titles or locations match, for example <code>&quot;Data Analyst&quot; OR &quot;BI Analyst&quot;</code>.</li>
        <li><strong>site:</strong> limits results to one hiring platform, such as Greenhouse or Lever.</li>
        <li><strong>A minus sign</strong> removes a word, for example <code>-intern</code>.</li>
        <li><strong>The time filter</strong> is added to the link, so only recently indexed postings show.</li>
      </ul>
      <p>Anything you leave blank never appears in the query, so the search stays as broad as you want.</p>

      <p><Link className="cta" href="/">Start a search</Link> <Link href="/faq/">Read the FAQ</Link></p>
    </DocShell>
  );
}
