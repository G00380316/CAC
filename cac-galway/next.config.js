/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias.undici = false;
        }
        return config;
    },
}

module.exports = nextConfig
