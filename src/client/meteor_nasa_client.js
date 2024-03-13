import https from 'https';
import {config} from "../config/app_config.js";


export const client = (req, res) => {
    const url = config.nasaApiConfig.url;
    const key = config.nasaApiConfig.key;

    const request = https.get(url + '?start_date=2024-03-08&end_date=2024-03-12&api_key=' + key, response => {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            try {

                res.set("Content-Type", "application/json")

                res.send(JSON.stringify(data, null, 2))
            } catch (error) {
                res.status(500).json({error: 'Error parsing JSON', message: error.message});
            }
        });
    });

    request.on('error', error => {
        res.status(500).json({error: 'Error fetching data', message: error.message});
    });
};
