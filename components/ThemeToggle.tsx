'use client';

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('bj_theme', root.dataset.theme); } catch { /* storage blocked */ }
  };
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label="Toggle light and dark theme">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 3.5v17" />
        <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
