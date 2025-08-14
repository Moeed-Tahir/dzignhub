/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'qnlscpmwamswjhhoorwt.supabase.co',
             
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**',
            },
           
        ],
    },
    compiler: {
        // This removes all console.* statements in production
        removeConsole: process.env.NODE_ENV === 'production',
        // To keep `console.error` or `console.warn`, use:
        // removeConsole: { exclude: ['error', 'warn'] },
      },
}

export default nextConfig;