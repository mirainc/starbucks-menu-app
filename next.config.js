/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
        source:
          '/:path(.+\\.(?:ico|png|svg|jpg|jpeg|avif|gif|webp|json|js|css|mp3|mp4|ttf|ttc|otf|woff|woff2)$)',
      },
    ];
  },
};

module.exports = nextConfig;
