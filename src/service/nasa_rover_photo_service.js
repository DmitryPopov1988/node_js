const axios = require('axios');
const config = require('../config/env_config');

const getLatestNasaRoverPhoto = async () => {
    try {
        const latestCuriosityPhotoDate = await getLatestCuriosityPhotoDate();
        const responseFromNasa = await axios.get(config.nasaApiConfig.marsPhotoUrl, {
            params: {
                earth_date: latestCuriosityPhotoDate,
                api_key: config.nasaApiConfig.key,
            },
        });
        return responseFromNasa.data.photos.pop().img_src;
    } catch (error) {
        console.error('An error occrred while fetching last Curiosity photo:', error);
        throw new Error(error.message);
    }
}

const getLatestCuriosityPhotoDate = () => {
    return axios.get(config.nasaApiConfig.curiosityManifestsUrl, {params: {api_key: config.nasaApiConfig.key}})
        .then(resp => resp.data.photo_manifest.max_date)
        .catch((err) => new Error(err.message));
}

module.exports = {getLatestNasaRoverPhoto};
