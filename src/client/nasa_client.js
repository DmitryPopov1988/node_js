import https from 'https';
import {config} from "../config/config.js";
import {mapAsteroids} from '../service/mapper.js';

const buildUrl = (startDate, endDate) => {
    const baseUrl = config.nasaApiConfig.url;
    const apiKey = config.nasaApiConfig.key;
    return `${baseUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
};


export const client = (req, res, startDate, endDate) => {

    const request = https.get(buildUrl(startDate, endDate), response => {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            try {

                const jsonData = JSON.parse(data);
                res.set("Content-Type", "application/json");
                res.send(mapAsteroids(jsonData));
            } catch (error) {
                res.status(500).json({error: 'Error parsing JSON', message: error.message});
            }
        });
    });

    request.on('error', error => {
        res.status(500).json({error: 'Error fetching data', message: error.message});
    });
};
