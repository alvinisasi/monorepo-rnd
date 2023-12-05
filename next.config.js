/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.builder.io',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'alvn.dev',
                port: '',
                pathname: '/assets/**',
            },
        ],
    }
}

module.exports = nextConfig
