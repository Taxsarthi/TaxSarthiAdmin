/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/auth',
          permanent: false, // Use true for a 301 redirect, false for a 302 redirect
        },
      ];
    },
  };
  
  export default nextConfig;
  