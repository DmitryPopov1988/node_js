const axios = require('axios');
const config = require('../config/env_config');
const {getDate} = require('../util/date_util.js');
const {mapMeteors} = require('../mapper/nasa_meteor_mapper');

const getNasaMeteorsData = async (startDate, endDate, countOnly, wereDangerous) => {
    const requestStartDate = startDate ? startDate : getDate().monday;
    const requestEndDate = endDate ? endDate : getDate().friday;
    try {
        const responseFromNasa = await axios.get(config.nasaApiConfig.meteorDataUrl, {
            params: {
                start_date: requestStartDate,
                end_date: requestEndDate,
                api_key: config.nasaApiConfig.key,
            },
        });
        const nasaMeteors = responseFromNasa.data;
        let response;
        if (countOnly && wereDangerous) {
            response = {
                count: countMeteors(nasaMeteors),
                wereDangerous: hasPotentiallyHazardousAsteroid(nasaMeteors)
            };
        } else if (countOnly) {
            response = {count: countMeteors(nasaMeteors)};
        } else if (wereDangerous) {
            response = {wereDangerous: hasPotentiallyHazardousAsteroid(nasaMeteors)};
        }
        response = {...response, meteors: mapMeteors(nasaMeteors)};
        return response;
    } catch (err) {
        console.error('An error occurred while fetching data about meteors:', error);
        throw new Error(err.message);
    }
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
