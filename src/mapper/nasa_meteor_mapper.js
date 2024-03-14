const mapMeteors = (nasaMeteors) => {
    const ans = [];
    for (const date in nasaMeteors.near_earth_objects) {
        const meteors = nasaMeteors.near_earth_objects[date];
        const mappedMeteors = meteors.map(mapMeteor);
        ans.push({date: date, meteors: mappedMeteors});
    }
    return ans;
};

function mapMeteor(nasaMeteor) {
    return {
        id: nasaMeteor.id,
        name: nasaMeteor.name,
        diameter: {
            min: nasaMeteor.estimated_diameter.meters.estimated_diameter_min,
            max: nasaMeteor.estimated_diameter.meters.estimated_diameter_max
        },
        is_potentially_hazardous: nasaMeteor.is_potentially_hazardous_asteroid,
        close_approach_date_full: nasaMeteor.close_approach_data[0].close_approach_date_full,
        relative_velocity_kps: nasaMeteor.close_approach_data[0].relative_velocity.kilometers_per_second
    };
}

module.exports = {mapMeteors};