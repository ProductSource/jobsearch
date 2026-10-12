import type { Metadata } from 'next';
import Link from 'next/link';
import DocShell from '@/components/DocShell';
import { FAQ, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Boolean job search FAQ',
  description:
    'Answers about Boolean job search: which sites are covered, which filters you can use, how to find jobs posted in the last 24 hours, and how your data is handled.',
  alternates: { canonical: '/faq/' }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/faq/#faq`,
  mainEntity: FAQ.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }))
};

export default function FaqPage() {
  return (
    <DocShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <h1>Frequently asked questions</h1>
      <div className="faq">
        {FAQ.map(f => (
          <section key={f.q}>
            <h2>{f.q}</h2>
            <p>{f.a}</p>
          </section>
        ))}
      </div>
      <p><Link className="cta" href="/">Start a search</Link> <Link href="/how-it-works/">How it works</Link></p>
    </DocShell>
  );
}
