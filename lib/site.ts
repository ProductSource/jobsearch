const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : '';

/** Set NEXT_PUBLIC_SITE_URL to the final domain; it feeds canonical, sitemap, OG and JSON-LD URLs. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || fromVercel || 'http://localhost:3300').replace(/\/$/, '');

export const SITE_NAME = 'BoolJobs';
export const SITE_TITLE = 'BoolJobs — Boolean Job Search for Greenhouse, Lever & Workday';
export const SITE_DESCRIPTION =
  'Free Boolean job search builder. Enter a role and a time window to get ready-made searches for Greenhouse, Lever, Ashby, Workday, LinkedIn and 40+ other career sites.';

export const FAQ: { q: string; a: string }[] = [
  {
    q: 'What is a Boolean job search?',
    a: 'A Boolean job search combines your job title with operators such as quotes, OR, minus and site: so a search engine returns only postings on the career sites you choose. For example, "Product Manager" site:greenhouse.io finds Product Manager postings hosted on Greenhouse.'
  },
  {
    q: 'How does BoolJobs work?',
    a: 'Type one or more roles and pick how recently the job was posted. BoolJobs writes a Boolean query for each applicant tracking system and career-page pattern, and applies the time filter to the link. Click a source to open its results in a new tab, then tick it off once you have finished applying there.'
  },
  {
    q: 'Which job sites does it search?',
    a: 'Greenhouse, Lever, Ashby, Workday, SmartRecruiters, Workable, iCIMS, Jobvite, Rippling, Recruitee, Personio, Wellfound, Work at a Startup, Built In, Glassdoor and LinkedIn, plus careers, jobs, people and talent subdomains and several dozen other applicant tracking systems.'
  },
  {
    q: 'Which filters can I use?',
    a: 'Work arrangement (remote, hybrid, on-site or not remote), location, seniority, salary range, words that must appear and words to exclude. A filter you leave empty never appears in the query, so the search stays as broad as you want it.'
  },
  {
    q: 'How do I find jobs posted in the last 24 hours?',
    a: 'Choose "Past 24 hours" in the time menu. The link opens Google with its date filter applied, so only recently indexed postings are shown. You can also pick the past hour, 4, 8, 12, 48 or 72 hours, the past week or the past month.'
  },
  {
    q: 'Is BoolJobs free, and is my data private?',
    a: 'It is free. Your searches are built in your browser and nothing you type is sent to a server. Your checkmarks are saved only in your own browser storage, and the only site that receives a query is the one you open.'
  }
];
