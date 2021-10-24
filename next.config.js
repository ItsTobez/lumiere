const withPreact = require('next-plugin-preact');

module.exports = withPreact({
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
    ],
  },
  experimental: {
    esmExternals: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
