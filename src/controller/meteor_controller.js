const {getNasaMeteorsData} = require('../client/nasa_meteor_client.js');
const {getDate} = require('../util/date_util.js');

const getMeteors = async (req, res, next) => {
    try {
        const startDate = getDate().monday;
        const endDate = getDate().friday;
        const meteors = await getNasaMeteorsData(req, res, startDate, endDate);
        res.json(meteors);
    } catch (error) {
        next(error);
    }
}

module.exports = {getMeteors};