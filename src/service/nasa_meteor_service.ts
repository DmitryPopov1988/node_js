import axios from 'axios';
import {env_config} from '../config/env_config'
import {getDate} from '../util/date_util.js';
import {mapMeteors} from '../mapper/nasa_meteor_mapper';
import {NasaMeteors} from '../type/nasa_meteor_data'

export const getNasaMeteorsData = async (startDate: string, endDate: string, countOnly: boolean, wereDangerous: boolean) => {
    const requestStartDate = startDate ? startDate : getDate().monday;
    const requestEndDate = endDate ? endDate : getDate().friday;
        const responseFromNasa = await axios.get(env_config.nasaApiConfig.meteorDataUrl!, {
            params: {
                start_date: requestStartDate,
                end_date: requestEndDate,
                api_key: env_config.nasaApiConfig.key,
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
}

const countMeteors = (nasaMeteors: NasaMeteors): number => {
    let totalCount = 0;
    for (const date in nasaMeteors.near_earth_objects) {
        totalCount += nasaMeteors.near_earth_objects[date].length;
    }
    return totalCount;
};

const hasPotentiallyHazardousAsteroid = (nasaMeteors: NasaMeteors): boolean => {
    for (const date in nasaMeteors.near_earth_objects) {
        for (const meteor of nasaMeteors.near_earth_objects[date]) {
            if (meteor.is_potentially_hazardous_asteroid) {
                return true;
            }
        }
    }
    return false;
};