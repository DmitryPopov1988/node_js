const axios = require('axios');
const config = require('../config/env_config');
const {getDate} = require('../util/date_util.js');
const {mapMeteors} = require('../mapper/nasa_meteor_mapper');

const getNasaMeteorsData = async (startDate, endDate) => {
    const requestStartDate = startDate ? startDate : getDate().monday;
    const requestEndDate = endDate ? endDate : getDate().friday;
    return axios
        .get(config.nasaApiConfig.url, {
            params: {
                start_date: requestStartDate,
                end_date: requestEndDate,
                api_key: config.nasaApiConfig.key,
            },
        })
        .then((response) =>
            mapMeteors(response.data)
        )
        .catch((err) => {
            throw new Error(err.message);
        });
}

module.exports = {getNasaMeteorsData};
