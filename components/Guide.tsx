import { FAQ } from '@/lib/site';
import { SITES } from '@/lib/search';

/** Server-rendered explainer shown before a search starts; this is the text crawlers index. */
export default function Guide() {
  return (
    <article className="guide">
      <h1>Boolean job search for every hiring platform</h1>
      <p className="lede">
        Enter a role and how recent the posting should be. BoolJobs writes a Boolean search for each of
        {' '}{SITES.length} applicant tracking systems and career-page patterns, including Greenhouse, Lever, Ashby and
        Workday. Open a source in a new tab, apply, then tick it off.
      </p>

      <h2>How it works</h2>
      <ol className="steps">
        <li><strong>Add your roles.</strong> Type a title and press Enter. Add several to search them together.</li>
        <li><strong>Pick a time window.</strong> From the past hour to the past month, applied to every link.</li>
        <li><strong>Narrow it down.</strong> Work arrangement, location and seniority are on the left. Salary and keywords sit under more filters.</li>
        <li><strong>Work through the list.</strong> Each source opens its own results. Tick it when you are done and your progress is remembered.</li>
      </ol>

      <h2>Example query</h2>
      <p><code>&quot;Product Manager&quot; site:boards.greenhouse.io remote</code></p>
      <p>
        Quotes keep the title together, <code>site:</code> limits results to one hiring platform and the time filter
        is added to the link. Anything you leave blank never appears in the query.
      </p>

      <h2>Frequently asked questions</h2>
      <div className="faq">
        {FAQ.map(f => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </article>
  );
}
