import axios from 'axios';
import {env_config} from '../config/env_config'

export const getLatestNasaRoverPhoto = async (apiKey: string) => {
    const latestCuriosityPhotoDate = await getLatestCuriosityPhotoDate(apiKey);
    const responseFromNasa = await axios.get(env_config.nasaApiConfig.marsPhotoUrl!, {
        params: {
            earth_date: latestCuriosityPhotoDate,
            api_key: apiKey,
        },
    });
    return responseFromNasa.data.photos.pop().img_src;
}

const getLatestCuriosityPhotoDate = async (apiKey: string) => {
    const resp = await axios.get(env_config.nasaApiConfig.curiosityManifestsUrl!, {params: {api_key: apiKey}});
    return resp.data.photo_manifest.max_date;
}
