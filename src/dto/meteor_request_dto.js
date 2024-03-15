class MeteorRequestDto {
    constructor(query) {
        this.startDate = query.start_date || null;
        this.endDate = query.end_date || null;
        this.countOnly = query.count === 'true';
        this.wereDangerous = query.were_dangerous_meteors === 'true';
    }
}

module.exports = MeteorRequestDto;