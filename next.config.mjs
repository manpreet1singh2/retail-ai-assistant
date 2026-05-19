/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: Do NOT use output:'standalone' on Vercel — Vercel handles its own
  // bundling. standalone is for self-hosted Docker deployments only.
  typescript: {
    // Allow deploy even with type warnings during iterative dev
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
