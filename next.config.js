/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'wp.claytonlemoors.org.uk'
        ],
        loader: 'akamai',
        path: ''
    },
    trailingSlash: true
}

module.exports = nextConfig