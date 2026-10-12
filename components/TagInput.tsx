'use client';

import { useRef, useState } from 'react';

interface Props {
  id: string;
  value: string[];
  onChange: (tags: string[]) => void;
  /** Turns raw typed or pasted text into zero or more tags. */
  split: (text: string) => string[];
  placeholder?: string;
  large?: boolean;
  className?: string;
}

/**
 * Type and press Enter to add a tag. A comma (typed or pasted) also adds,
 * so "SQL, Python, dbt" becomes three tags. Backspace on an empty field
 * removes the last tag; leaving the field commits whatever is typed.
 */
export default function TagInput({ id, value, onChange, split, placeholder, large, className }: Props) {
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const add = (text: string) => {
    const incoming = split(text);
    if (!incoming.length) return;
    const seen = new Set(value.map(v => v.toLowerCase()));
    const fresh = incoming.filter(t => {
      const k = t.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    if (fresh.length) onChange([...value, ...fresh]);
  };

  const handleChange = (text: string) => {
    if (/[,;\n]/.test(text)) {
      const idx = Math.max(text.lastIndexOf(','), text.lastIndexOf(';'), text.lastIndexOf('\n'));
      add(text.slice(0, idx));
      setDraft(text.slice(idx + 1).trimStart());
    } else {
      setDraft(text);
    }
  };

  return (
    <div
      className={`tags field${large ? ' lg' : ''}${className ? ' ' + className : ''}`}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map(tag => (
        <span className="tag" key={tag}>
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={e => { e.stopPropagation(); onChange(value.filter(t => t !== tag)); inputRef.current?.focus(); }}
          >
            ×
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={draft}
        placeholder={value.length ? '' : placeholder}
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="enter"
        onChange={e => handleChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            add(draft);
            setDraft('');
          } else if (e.key === 'Backspace' && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onPaste={e => {
          const text = e.clipboardData.getData('text');
          if (/[,;\n]/.test(text)) {
            e.preventDefault();
            add(draft + text);
            setDraft('');
          }
        }}
        onBlur={() => { if (draft.trim()) { add(draft); setDraft(''); } }}
      />
    </div>
  );
}
