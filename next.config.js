// This controls how Next.js utilizes tools like Webpack and Babel to generate regular HTML, CSS, JS from the files in this folder
// See https://nextjs.org/docs/api-reference/next.config.js/introduction

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  pageExtensions: ['mdx', 'tsx', 'ts', 'jsx', 'js'],
  webpack(config) {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [{ loader: 'xdm/webpack.cjs', options: {} }],
    });

    return config;
  },
};
