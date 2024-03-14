require('dotenv').config();

const env_config = {
    nasaApiConfig: {
        key: process.env.NASA_API_KEY,
        url: process.env.NASA_API_URL
    },
    appServerConfig: {
        port: process.env.SERVER_PORT
    }
};

module.exports = env_config;