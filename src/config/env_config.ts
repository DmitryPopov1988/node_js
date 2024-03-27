import dotenv from 'dotenv';
dotenv.config();

export const env_config = {
    nasaApiConfig: {
        key: process.env.NASA_API_KEY,
        meteorDataUrl: process.env.NASA_METEOR_DATA_API_URL,
        curiosityManifestsUrl: process.env.NASA_CURIOSITY_MANIFESTS_API_URL,
        marsPhotoUrl: process.env.NASA_MARS_PHOTO_API_URL
    },
    appServerConfig: {
        port: process.env.SERVER_PORT
    },
    sentry: {
        dsn: process.env.SENTRY_DSN
    },
};