/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
