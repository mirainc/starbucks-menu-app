const withBuilderDevTools = require('@builder.io/dev-tools/next')();

/** @type {import('next').NextConfig} */
const nextConfig = withBuilderDevTools({
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=1',
          },
          {
            key: 'x-test',
            value: '1',
          },
        ],
      },
    ];
  },
});

module.exports = nextConfig;
