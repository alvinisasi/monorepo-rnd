/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'cdn.builder.io',
            'alvn.dev'
        ],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'cdn.builder.io',
              port: '',
              pathname: '',
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
