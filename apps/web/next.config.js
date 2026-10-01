/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // QR code in Cartra's ad in the Chinese American CEO Organization's
        // 30th anniversary brochure. The UTM tags attribute these visits (and
        // any consultation requests in the same session) to the ad in GA.
        source: '/30',
        destination: '/?utm_source=caceo&utm_medium=print&utm_campaign=caceo-30th-anniversary',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
