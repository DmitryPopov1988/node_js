const axios = require('axios');
const config = require('../config/env_config');

const getLatestNasaRoverPhoto = async (apiKey) => {
    try {
        const latestCuriosityPhotoDate = await getLatestCuriosityPhotoDate(apiKey);
        const responseFromNasa = await axios.get(config.nasaApiConfig.marsPhotoUrl, {
            params: {
                earth_date: latestCuriosityPhotoDate,
                api_key: apiKey,
            },
        });
        return responseFromNasa.data.photos.pop().img_src;
    } catch (error) {
        console.error('An error occrred while fetching last Curiosity photo:', error);
        throw new Error(error.message);
    }
}

const getLatestCuriosityPhotoDate = (apiKey) => {
    return axios.get(config.nasaApiConfig.curiosityManifestsUrl, {params: {api_key: apiKey}})
        .then(resp => resp.data.photo_manifest.max_date)
        .catch((err) => new Error(err.message));
}

module.exports = {getLatestNasaRoverPhoto};
