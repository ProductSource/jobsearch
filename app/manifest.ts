import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export const dynamic = 'force-static';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BoolJobs — Boolean Job Search',
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: `${base}/`,
    display: 'standalone',
    background_color: '#e9e1d3',
    theme_color: '#e9e1d3',
    icons: [
      { src: `${base}/icon.svg`, sizes: 'any', type: 'image/svg+xml' },
      { src: `${base}/apple-icon`, sizes: '180x180', type: 'image/png' }
    ]
  };
}
