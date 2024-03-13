import dotenv from "dotenv";
dotenv.config();

export const config = {
    nasaApiConfig: {
        key: process.env.NASA_API_KEY,
        url: process.env.NASA_API_URL
    },
    appServerConfig: {
        port: process.env.SERVER_PORT
    }
};