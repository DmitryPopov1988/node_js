const axios = require('axios');
const config = require('../config/env_config');
const {getDate} = require('../util/date_util.js');
const {mapMeteors} = require('../mapper/nasa_meteor_mapper');

const getNasaMeteorsData = async (startDate, endDate, countOnly, wereDangerous) => {
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
        .then((response) => {
                if (countOnly) {
                    return {count: countMeteors(response.data)};
                }
                if (wereDangerous) {
                    return {wereDangerous: hasPotentiallyHazardousAsteroid(response.data)};
                }
                return mapMeteors(response.data);
            }
        )
        .catch((err) => {
            throw new Error(err.message);
        });
}

const countMeteors = (nasaMeteors) => {
    let totalCount = 0;
    for (const date in nasaMeteors.near_earth_objects) {
        totalCount += nasaMeteors.near_earth_objects[date].length;
    }
    return totalCount;
};

const hasPotentiallyHazardousAsteroid = (nasaMeteors) => {
    for (const date in nasaMeteors.near_earth_objects) {
        for (const meteor of nasaMeteors.near_earth_objects[date]) {
            if (meteor.is_potentially_hazardous_asteroid === true) {
                return true;
            }
        }
    }
    return false;
};

module.exports = {getNasaMeteorsData};
