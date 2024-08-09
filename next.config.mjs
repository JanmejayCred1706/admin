/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/login',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
  productionBrowserSourceMaps: true,
  // sentry: { hideSourceMaps: true },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/login', // Replace this with your desired default route
  //       permanent: true, // Use 'false' if you want a temporary redirect
  //     },
  //   ];
  // },
};

export default nextConfig;
