// GitHub Pages serves a project site from /<repo>, so CI sets NEXT_PUBLIC_BASE_PATH=/jobsearch.
// Locally and on Vercel it stays empty and the app runs from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // static HTML export into ./out, which is what GitHub Pages can serve
  ...(process.env.STATIC_EXPORT === '1' && { output: 'export', trailingSlash: true }),
  basePath,
  assetPrefix: basePath || undefined
};
export default nextConfig;
