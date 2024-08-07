/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
        images: {
        remotePatterns: [
        {
            protocol: "http",
            hostname: "ecx.images-amazon.com",
            port:'',
            pathname: '/images/I/**'
        },
        ],
    },
};

export default nextConfig;