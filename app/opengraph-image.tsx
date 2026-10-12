import { ImageResponse } from 'next/og';

export const alt = 'BoolJobs — Boolean job search for Greenhouse, Lever, Workday and more';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

const query = '"Product Manager" site:greenhouse.io remote';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: 72, background: 'linear-gradient(135deg,#f3ecdf 0%,#e4d8c3 100%)', color: '#2a221b', fontFamily: 'serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 68, height: 68, borderRadius: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(180deg,#4a3d32,#2b221b)', color: '#f6efe3', fontSize: 44, fontWeight: 700
            }}
          >
            &amp;
          </div>
          <div style={{ fontSize: 44, fontWeight: 600 }}>BoolJobs</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 600, letterSpacing: -2, maxWidth: 980 }}>
            Boolean job search for every hiring platform
          </div>
          <div
            style={{
              display: 'flex', alignSelf: 'flex-start', padding: '16px 26px', borderRadius: 18, fontSize: 32,
              background: 'rgba(255,255,255,0.65)', border: '2px solid rgba(120,95,60,0.25)', color: '#5b4a3a', fontFamily: 'monospace'
            }}
          >
            {query}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 28, color: '#6b5e50' }}>
          Greenhouse · Lever · Ashby · Workday · LinkedIn · 40+ more
        </div>
      </div>
    ),
    size
  );
}
