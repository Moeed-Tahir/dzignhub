/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'qnlscpmwamswjhhoorwt.supabase.co',
             
            },
           
        ],
    },
}

export default nextConfig;