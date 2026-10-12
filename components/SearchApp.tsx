'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import ThemeToggle from './ThemeToggle';
import TagInput from './TagInput';
import {
  DEFAULTS, LEVELS, TIMES, WORK, activeFilterCount, buildRows, fromParams, parseTitles, splitList, toParams,
  type SearchState, type Work
} from '@/lib/search';

const TICKS_KEY = 'bj_ticks';

function readTicks(key: string): string[] {
  try {
    const all = JSON.parse(localStorage.getItem(TICKS_KEY) || '{}');
    return all[key] || [];
  } catch { return []; }
}
function writeTicks(key: string, ids: string[]) {
  try {
    const all = JSON.parse(localStorage.getItem(TICKS_KEY) || '{}');
    delete all[key];
    all[key] = ids;
    const keys = Object.keys(all);
    if (keys.length > 60) delete all[keys[0]];
    localStorage.setItem(TICKS_KEY, JSON.stringify(all));
  } catch { /* storage blocked */ }
}

export default function SearchApp({ intro }: { intro: ReactNode }) {
  const [s, setS] = useState<SearchState>(DEFAULTS);
  const [ready, setReady] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [showQueries, setShowQueries] = useState(false);
  const [ticks, setTicks] = useState<string[]>([]);
  const [copied, setCopied] = useState('');

  // read shareable URL once on the client
  useEffect(() => {
    const initial = fromParams(window.location.search);
    setS(initial);
    if (initial.min || initial.max || initial.must || initial.not) setMoreOpen(true);
    setReady(true);
  }, []);

  const titles = useMemo(() => parseTitles(s.job).titles, [s.job]);
  const rows = useMemo(() => (titles.length ? buildRows(s, titles) : []), [s, titles]);
  const key = useMemo(
    () => JSON.stringify([titles, s.time, s.work, s.loc, s.levels, s.must, s.not, s.min, s.max, s.cur]),
    [s, titles]
  );

  // load ticks for this exact search
  useEffect(() => { if (ready) setTicks(readTicks(key)); }, [key, ready]);

  // keep the address bar shareable
  useEffect(() => {
    if (!ready) return;
    const qs = toParams(s).toString();
    window.history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
  }, [s, ready]);

  const set = <K extends keyof SearchState>(k: K, v: SearchState[K]) => setS(prev => ({ ...prev, [k]: v }));
  const toggleLevel = (id: string) =>
    set('levels', s.levels.includes(id) ? s.levels.filter(x => x !== id) : [...s.levels, id]);
  const toggleTick = (id: string) => {
    const next = ticks.includes(id) ? ticks.filter(x => x !== id) : [...ticks, id];
    setTicks(next);
    writeTicks(key, next);
  };
  const resetTicks = () => { setTicks([]); writeTicks(key, []); };
  const copy = async (id: string, text: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(''), 1000); } catch { /* clipboard blocked */ }
  };

  const hiddenCount = activeFilterCount({ ...s, work: 'any', loc: '', levels: [] });
  const half = Math.ceil(rows.length / 2);
  const timeLabel = TIMES.find(t => t.id === s.time)?.label ?? '';

  return (
    <main className="app">
      <aside className="side">
      <header className="masthead">
        <div className="wordmark">
          <span className="seal" aria-hidden="true">&amp;</span>
          <span>BoolJobs</span>
        </div>
        <ThemeToggle />
      </header>

      <section className="glass panel" aria-label="Search">
        <form className="search-row" onSubmit={e => e.preventDefault()}>
          <label className="sr" htmlFor="job">Role</label>
          <TagInput id="job" className="grow" large value={titles} split={t => parseTitles(t).titles}
            placeholder="Role — type and press Enter" onChange={v => set('job', v.join(', '))} />
          <label className="sr" htmlFor="time">Posted within</label>
          <select id="time" className="field" value={s.time} onChange={e => set('time', e.target.value)}>
            {TIMES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
          <button type="submit" className="btn primary">Start</button>
        </form>

        <div className="filters">
          <div className="filter-block">
            <div className="label" id="work-label">Work arrangement</div>
            <div className="seg" role="radiogroup" aria-labelledby="work-label">
              {WORK.map(w => (
                <label key={w.id}>
                  <input type="radio" name="work" checked={s.work === w.id} onChange={() => set('work', w.id as Work)} />
                  <span>{w.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <label className="label" htmlFor="loc">Location <small>press Enter · any of</small></label>
            <TagInput id="loc" value={splitList(s.loc)} split={splitList} placeholder="United States, then Enter"
              onChange={v => set('loc', v.join(', '))} />
          </div>

          <div className="filter-block">
            <div className="label">Seniority</div>
            <div className="chips">
              {LEVELS.map(l => (
                <button key={l.id} type="button" className="chip" aria-pressed={s.levels.includes(l.id)} onClick={() => toggleLevel(l.id)}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button type="button" className="more-toggle" aria-expanded={moreOpen} aria-controls="more" onClick={() => setMoreOpen(o => !o)}>
          <span className={'caret' + (moreOpen ? ' open' : '')} aria-hidden="true" />
          More filters
          {hiddenCount > 0 && <span className="badge">{hiddenCount}</span>}
        </button>

        {moreOpen && (
          <div id="more" className="more">
            <div className="filter-block">
              <div className="label">Salary <small>thousands per year</small></div>
              <div className="salary">
                <select className="field cur" aria-label="Currency" value={s.cur} onChange={e => set('cur', e.target.value)}>
                  <option>$</option><option>£</option><option>€</option>
                </select>
                <input className="field" type="number" min="0" step="5" inputMode="numeric" placeholder="Min  e.g. 120"
                  aria-label="Minimum salary in thousands" value={s.min} onChange={e => set('min', e.target.value)} />
                <span className="to">to</span>
                <input className="field" type="number" min="0" step="5" inputMode="numeric" placeholder="Max  e.g. 160"
                  aria-label="Maximum salary in thousands" value={s.max} onChange={e => set('max', e.target.value)} />
              </div>
            </div>
            <div className="two">
              <div className="filter-block">
                <label className="label" htmlFor="must">Must include <small>every one</small></label>
                <TagInput id="must" value={splitList(s.must)} split={splitList} placeholder="SQL, then Enter"
                  onChange={v => set('must', v.join(', '))} />
              </div>
              <div className="filter-block">
                <label className="label" htmlFor="not">Exclude <small>none of</small></label>
                <TagInput id="not" value={splitList(s.not)} split={splitList} placeholder="unpaid, then Enter"
                  onChange={v => set('not', v.join(', '))} />
              </div>
            </div>
          </div>
        )}
      </section>
      </aside>

      <div className="stage">
      {titles.length === 0 ? (
        intro
      ) : (
        <section className="results" aria-label="Job boards">
          <div className="results-head">
            <h2>{titles.join(' · ')} <span className="when">{timeLabel}</span></h2>
            <div className="head-actions">
              <span className="progress">{ticks.filter(t => rows.some(r => r.site.id === t)).length} of {rows.length} done</span>
              <button type="button" className="btn quiet" aria-pressed={showQueries} onClick={() => setShowQueries(v => !v)}>
                {showQueries ? 'Hide queries' : 'Show queries'}
              </button>
              <button type="button" className="btn quiet" onClick={resetTicks}>Reset</button>
            </div>
          </div>

          <div className="glass board">
            <div className="cols">
            {[rows.slice(0, half), rows.slice(half)].map((col, i) => (
              <ul key={i} className="col">
              {col.map(r => {
                const done = ticks.includes(r.site.id);
                return (
                  <li key={r.site.id} className={'item' + (done ? ' done' : '')}>
                    <label className="tick">
                      <input type="checkbox" checked={done} onChange={() => toggleTick(r.site.id)} aria-label={`${r.site.label} finished`} />
                      <span className="box" aria-hidden="true">
                        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.2 3.2L13 4.8" /></svg>
                      </span>
                    </label>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="site-link">{r.site.label}</a>
                    {showQueries && (
                      <>
                        <button type="button" className="copy" onClick={() => copy(r.site.id, r.query)}>
                          {copied === r.site.id ? 'Copied' : 'Copy'}
                        </button>
                        <code className="query">{r.query}</code>
                      </>
                    )}
                  </li>
                );
              })}
              </ul>
            ))}
            </div>
          </div>
        </section>
      )}
      </div>
    </main>
  );
}
