const axios = require('axios');
const config = require('../config/env_config');
const {mapMeteors} = require('../mapper/nasa_meteor_mapper');

const getNasaMeteorsData = (req, res, startDate, endDate) => {
    return axios
        .get(config.nasaApiConfig.url, {
            params: {
                start_date: startDate,
                end_date: endDate,
                api_key: config.nasaApiConfig.key,
            },
        })
        .then((response) =>
            mapMeteors(response.data)
        )
        .catch((err) => {
            throw new Error(err.message);
        });
};

module.exports = {getNasaMeteorsData};
