const axios = require('axios');
const config = require('../config/env_config');
const {getDate} = require('../util/date_util.js');
const {mapMeteors} = require('../mapper/nasa_meteor_mapper');

const getNasaMeteorsData = async (startDate, endDate, countOnly) => {
    const requestStartDate = startDate ? startDate : getDate().monday;
    const requestEndDate = endDate ? endDate : getDate().friday;
    console.log(`START DATE ${requestStartDate}`);
    console.log(`END DATE ${requestEndDate}`);
    console.log(`COUNT ${countOnly}`);
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

module.exports = {getNasaMeteorsData};
