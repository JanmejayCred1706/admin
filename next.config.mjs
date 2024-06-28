/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'intl-locales-supported/en-IN': require.resolve(
          'intl-locales-supported/en-IN'
        ),
      };
    }
    return config;
  },
};

export default nextConfig;
