const {startOfWeek, addDays, format} = require('date-fns');

const DATE_FORMAT = 'yyyy-MM-dd';

const getDate = () => {
    const currentDate = new Date();
    const startOfCurrentWeek = startOfWeek(currentDate, {weekStartsOn: 1});

    const mondayDate = addDays(startOfCurrentWeek, 0);
    const fridayDate = addDays(startOfCurrentWeek, 4);

    const formattedMondayDate = format(mondayDate, DATE_FORMAT);
    const formattedFridayDate = format(fridayDate, DATE_FORMAT);

    return {monday: formattedMondayDate, friday: formattedFridayDate};
}

const getCurrentDate = () => {
    const currentDate = new Date();
    return format(currentDate, DATE_FORMAT)
}

module.exports = {getDate, getCurrentDate};

