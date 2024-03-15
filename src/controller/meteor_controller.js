const MeteorsRequestDto = require('../dto/meteor_request_dto');
const {getNasaMeteorsData} = require('../service/nasa_meteor_service.js');

const getMeteors = async (req, res, next) => {
    try {
        const { startDate, endDate, countOnly, wereDangerous } = new MeteorsRequestDto(req.query);
        const meteors = await getNasaMeteorsData(startDate, endDate);
        res.json(meteors);
    } catch (error) {
        next(error);
    }
}

module.exports = {getMeteors};