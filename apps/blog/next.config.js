/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        minimumCacheTTL: 31536000,
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
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '**',
            },
        ],
    },
    compress: true
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'false',
})

module.exports = withBundleAnalyzer(nextConfig)
