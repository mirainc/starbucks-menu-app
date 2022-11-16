/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=1",
          },
          {
            key: 'x-hello',
            value: 'world',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
