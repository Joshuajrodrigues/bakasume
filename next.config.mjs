/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tenor.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        config.module.rules.push({
            test: /pdfjs-dist\/build\/pdf\.worker\.js$/,
            type: "asset/resource",
            generator: {
                filename: "static/chunks/[name].[hash][ext]",
            },
        });
        return config;
    },
};

export default nextConfig;

