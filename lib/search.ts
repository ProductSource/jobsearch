/* Boolean query builder. Only filters the user actually set are emitted. */

export type Work = 'any' | 'remote' | 'hybrid' | 'onsite' | 'no-remote';

export interface SearchState {
  job: string;
  time: string;
  work: Work;
  loc: string;
  levels: string[];
  must: string;
  not: string;
  min: string;
  max: string;
  cur: string;
}

export const DEFAULTS: SearchState = {
  job: '', time: '24hours', work: 'any', loc: '', levels: [], must: '', not: '', min: '', max: '', cur: '$'
};

export const TIMES: { id: string; label: string; tbs: string; hours: number }[] = [
  { id: '1hour', label: 'Past hour', tbs: 'h1', hours: 1 },
  { id: '4hours', label: 'Past 4 hours', tbs: 'h4', hours: 4 },
  { id: '8hours', label: 'Past 8 hours', tbs: 'h8', hours: 8 },
  { id: '12hours', label: 'Past 12 hours', tbs: 'h12', hours: 12 },
  { id: '24hours', label: 'Past 24 hours', tbs: 'd', hours: 24 },
  { id: '48hours', label: 'Past 48 hours', tbs: 'h48', hours: 48 },
  { id: '72hours', label: 'Past 72 hours', tbs: 'h72', hours: 72 },
  { id: 'week', label: 'Past week', tbs: 'w', hours: 168 },
  { id: 'month', label: 'Past month', tbs: 'm', hours: 720 },
  { id: 'all', label: 'Any time', tbs: '', hours: 0 }
];

export const WORK: { id: Work; label: string }[] = [
  { id: 'any', label: 'Any' },
  { id: 'remote', label: 'Remote' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'onsite', label: 'On-site' },
  { id: 'no-remote', label: 'Not remote' }
];

export const LEVELS: { id: string; label: string; terms: string[]; li: string }[] = [
  { id: 'intern', label: 'Intern', terms: ['Intern', 'Internship'], li: '1' },
  { id: 'entry', label: 'Entry / Junior', terms: ['Junior', 'Entry Level'], li: '2' },
  { id: 'mid', label: 'Mid-level', terms: ['Mid-Level', 'Associate'], li: '3' },
  { id: 'senior', label: 'Senior', terms: ['Senior', 'Sr'], li: '4' },
  { id: 'lead', label: 'Lead / Staff', terms: ['Lead', 'Staff', 'Principal'], li: '4' },
  { id: 'director', label: 'Director+', terms: ['Director', 'VP', 'Head of'], li: '5' }
];

export interface Site {
  id: string;
  label: string;
  domains?: string[];
  extra?: string;
  kind?: 'linkedin';
}

export const SITES: Site[] = [
  { id: 'greenhouse', label: 'Greenhouse', domains: ['greenhouse.io'] },
  { id: 'lever', label: 'Lever', domains: ['lever.co'] },
  { id: 'ashby', label: 'Ashby', domains: ['ashbyhq.com'] },
  { id: 'pinpoint', label: 'Pinpoint', domains: ['pinpointhq.com'] },
  { id: 'jobs-sub', label: 'Jobs subdomain', domains: ['jobs.*'] },
  { id: 'careers', label: 'Careers pages', domains: ['careers.*', '*/careers/*', '*/career/*'] },
  { id: 'people-sub', label: 'People subdomain', domains: ['people.*'] },
  { id: 'talent-sub', label: 'Talent subdomain', domains: ['talent.*'] },
  { id: 'paylocity', label: 'Paylocity', domains: ['recruiting.paylocity.com'] },
  { id: 'keka', label: 'Keka', domains: ['keka.com'] },
  { id: 'workable', label: 'Workable', domains: ['jobs.workable.com'] },
  { id: 'breezy', label: 'BreezyHR', domains: ['breezy.hr'] },
  { id: 'zoho', label: 'Zoho', domains: ['zohorecruit.com'] },
  { id: 'wellfound', label: 'Wellfound', domains: ['wellfound.com'] },
  { id: 'yc', label: 'Work at a Startup', domains: ['workatastartup.com'] },
  { id: 'oracle', label: 'Oracle Cloud', domains: ['oraclecloud.com'] },
  { id: 'workday', label: 'Workday Jobs', domains: ['myworkdayjobs.com'] },
  { id: 'recruitee', label: 'Recruitee', domains: ['recruitee.com', 'tellent.com'] },
  { id: 'rippling', label: 'Rippling', domains: ['rippling.com', 'rippling-ats.com'] },
  { id: 'gusto', label: 'Gusto', domains: ['jobs.gusto.com'] },
  { id: 'careerpuck', label: 'CareerPuck', domains: ['careerpuck.com'] },
  { id: 'teamtailor', label: 'Teamtailor', domains: ['teamtailor.com'] },
  { id: 'smartrecruiters', label: 'SmartRecruiters', domains: ['jobs.smartrecruiters.com'] },
  { id: 'talentreef', label: 'TalentReef', domains: ['jobappnetwork.com'] },
  { id: 'homerun', label: 'Homerun', domains: ['homerun.co'] },
  { id: 'gem', label: 'Gem', domains: ['gem.com'] },
  { id: 'trakstar', label: 'Trakstar', domains: ['trakstar.com'] },
  { id: 'cats', label: 'Cats', domains: ['catsone.com'] },
  { id: 'jazzhr', label: 'JazzHR', domains: ['applytojob.com'] },
  { id: 'jobvite', label: 'Jobvite', domains: ['jobvite.com'] },
  { id: 'icims', label: 'iCIMS', domains: ['icims.com'] },
  { id: 'dover', label: 'Dover', domains: ['dover.io', 'dover.com'] },
  { id: 'notion', label: 'Notion', domains: ['notion.site'] },
  { id: 'builtin', label: 'Built In', domains: ['builtin.com/job/'] },
  { id: 'adp', label: 'ADP', domains: ['workforcenow.adp.com', 'myjobs.adp.com'] },
  { id: 'linkedin', label: 'LinkedIn', kind: 'linkedin' },
  { id: 'linkedin-se', label: 'LinkedIn via search', domains: ['linkedin.com/jobs'], extra: '"apply" -"No longer accepting applications"' },
  { id: 'glassdoor', label: 'Glassdoor', domains: ['glassdoor.com/job-listing/'] },
  { id: 'factorial', label: 'Factorial', domains: ['factorialhr.com'] },
  { id: 'trinet', label: 'TriNet Hire', domains: ['trinethire.com'] },
  { id: 'join', label: 'Join', domains: ['join.com'] },
  { id: 'personio', label: 'Personio', domains: ['personio.com', 'personio.de'] },
  { id: 'dayforce', label: 'Dayforce', domains: ['dayforcehcm.com'] },
  { id: 'avature', label: 'Avature', domains: ['avature.net'] },
  {
    id: 'other-ats', label: 'Other ATS',
    domains: ['bamboohr.com', 'recruiting.ultipro.com', 'careerplug.com', 'paycomonline.net', 'successfactors.com', 'taleo.net', 'brassring.com', 'csod.com', 'freshteam.com', 'comeet.com', 'careers-page.com', 'jobscore.com', 'applicantpro.com', 'applicantstack.com', 'careers.hireology.com', 'pageuppeople.com', 'work.fountain.com', 'workstream.us', 'recruitingbypaycor.com']
  },
  { id: 'other-pages', label: 'Other pages', domains: ['*/employment/*', '*/vacancies/*', '*/opportunities/*', '*/openings/*', '*/join-us/*', '*/work-with-us/*'] }
];

/* ---------- helpers ---------- */

const quote = (t: string) => '"' + t + '"';
const orGroup = (list: string[]) => (list.length === 1 ? list[0] : '(' + list.join(' OR ') + ')');
export const splitList = (s: string) =>
  String(s || '').split(/[,;\n]+/).map(x => x.trim().replace(/"/g, '')).filter(Boolean);

export function parseTitles(value: string) {
  const orUsed = /\s+or\s+/i.test(value);
  const titles = value.split(/\s*,\s*|\s+or\s+/i).map(t => t.trim()).filter(Boolean);
  return { titles, orUsed };
}

/** Salary in thousands. A single open end is padded so the range stays useful. */
export function salaryRange(s: SearchState) {
  const min = parseFloat(s.min);
  const max = parseFloat(s.max);
  if (!(min > 0) && !(max > 0)) return null;
  let lo = min > 0 ? min : Math.max(20, Math.round((max * 0.6) / 5) * 5);
  let hi = max > 0 ? max : Math.round((min * 1.6) / 5) * 5;
  if (lo > hi) [lo, hi] = [hi, lo];
  return { lo, hi };
}

function salaryQuery(s: SearchState) {
  const r = salaryRange(s);
  if (!r) return '';
  const cur = s.cur || '$';
  const full = (k: number) => cur + (k * 1000).toLocaleString('en-US');
  const short = (k: number) => cur + k + 'k';
  const terms: string[] = [];
  if (r.hi - r.lo <= 30) {
    for (let k = r.lo; k <= r.hi; k += 5) terms.push(quote(full(k)), quote(short(k)));
  } else {
    terms.push(cur + r.lo * 1000 + '..' + cur + r.hi * 1000);
    [r.lo, r.hi].forEach(k => terms.push(quote(full(k)), quote(short(k))));
  }
  return '(' + terms.join(' OR ') + ')';
}

function buildParts(s: SearchState, titles: string[]) {
  const lv = [...new Set(LEVELS.filter(l => s.levels.includes(l.id)).flatMap(l => l.terms))];
  const loc = splitList(s.loc);
  const must = splitList(s.must);
  const not = splitList(s.not);
  const work: Record<string, string> = {
    remote: 'remote', hybrid: 'hybrid', onsite: '("on-site" OR onsite)', 'no-remote': '-remote'
  };
  return {
    title: orGroup(titles.map(quote)),
    level: lv.length ? orGroup(lv.map(quote)) : '',
    rest: [
      work[s.work] || '',
      loc.length ? orGroup(loc.map(quote)) : '',
      must.map(quote).join(' '),
      salaryQuery(s),
      not.map(t => '-' + quote(t)).join(' ')
    ]
  };
}

const siteClause = (domains: string[]) =>
  domains.length === 1 ? 'site:' + domains[0] : '(' + domains.map(d => 'site:' + d).join(' OR ') + ')';

function googleUrl(query: string, time: string) {
  const t = TIMES.find(x => x.id === time);
  return 'https://www.google.com/search?q=' + encodeURIComponent(query) + (t && t.tbs ? '&tbs=qdr:' + t.tbs : '');
}

function linkedinUrl(s: SearchState, titles: string[]) {
  let kw = orGroup(titles.map(quote));
  splitList(s.must).forEach(m => { kw += ' AND ' + quote(m); });
  splitList(s.not).forEach(n => { kw += ' NOT ' + quote(n); });
  const u = new URLSearchParams({ keywords: kw });
  const loc = splitList(s.loc)[0] || (s.work === 'remote' ? 'Remote' : '');
  if (loc) u.set('location', loc);
  const t = TIMES.find(x => x.id === s.time);
  if (t && t.hours) u.set('f_TPR', 'r' + t.hours * 3600);
  const wt = ({ onsite: '1', remote: '2', hybrid: '3' } as Record<string, string>)[s.work];
  if (wt) u.set('f_WT', wt);
  const e = [...new Set(LEVELS.filter(l => s.levels.includes(l.id)).map(l => l.li))];
  if (e.length) u.set('f_E', e.join(','));
  const min = parseFloat(s.min);
  if (min > 0 && (s.cur || '$') === '$') {
    const b = ([[200, 9], [180, 8], [160, 7], [140, 6], [120, 5], [100, 4], [80, 3], [60, 2], [40, 1]] as [number, number][])
      .find(([k]) => min >= k);
    if (b) u.set('f_SB2', String(b[1]));
  }
  return { url: 'https://www.linkedin.com/jobs/search/?' + u.toString(), query: kw + (loc ? '   [location: ' + loc + ']' : '') };
}

export interface Row { site: Site; query: string; url: string }

export function buildRows(s: SearchState, titles: string[]): Row[] {
  const p = buildParts(s, titles);
  return SITES.map(site => {
    if (site.kind === 'linkedin') return { site, ...linkedinUrl(s, titles) };
    const query = [p.title, p.level, siteClause(site.domains!), site.extra || '', ...p.rest].filter(Boolean).join(' ');
    return { site, query, url: googleUrl(query, s.time) };
  });
}

export function activeFilterCount(s: SearchState) {
  return (s.work !== 'any' ? 1 : 0) + (splitList(s.loc).length ? 1 : 0) + (s.levels.length ? 1 : 0) +
    (splitList(s.must).length ? 1 : 0) + (splitList(s.not).length ? 1 : 0) + (salaryRange(s) ? 1 : 0);
}

/* ---------- URL state ---------- */

export function toParams(s: SearchState) {
  const u = new URLSearchParams();
  (Object.keys(DEFAULTS) as (keyof SearchState)[]).forEach(k => {
    const v = Array.isArray(s[k]) ? (s[k] as string[]).join(',') : String(s[k]);
    const d = Array.isArray(DEFAULTS[k]) ? '' : String(DEFAULTS[k]);
    if (v && v !== d) u.set(k, v);
  });
  return u;
}

export function fromParams(search: string): SearchState {
  const u = new URLSearchParams(search);
  const s: SearchState = { ...DEFAULTS, levels: [] };
  if (u.has('job')) s.job = u.get('job')!;
  if (u.has('time') && TIMES.some(t => t.id === u.get('time'))) s.time = u.get('time')!;
  if (u.has('work') && WORK.some(w => w.id === u.get('work'))) s.work = u.get('work') as Work;
  if (u.get('remote') === 'false') s.work = 'no-remote'; // links from the site this was modeled on
  if (u.has('loc')) s.loc = u.get('loc')!;
  if (u.has('levels')) s.levels = u.get('levels')!.split(',').filter(id => LEVELS.some(l => l.id === id));
  (['must', 'not', 'min', 'max', 'cur'] as const).forEach(k => { if (u.has(k)) s[k] = u.get(k)!; });
  if (u.has('salaryMin')) s.min = u.get('salaryMin')!;
  if (u.has('salaryMax')) s.max = u.get('salaryMax')!;
  return s;
}
