export const mapAsteroids = (nasaAsteroids) => {
    const ans = [];
    for (const date in nasaAsteroids.near_earth_objects) {
        const asteroids = nasaAsteroids.near_earth_objects[date];
        const mappedAsteroidsForDate = asteroids.map(mapAsteroid);
        ans.push({date: date, asteroids: mappedAsteroidsForDate});
    }

    return ans;
};


function mapAsteroid(asteroid) {
    return {
        id: asteroid.id,
        name: asteroid.name,
        diameter: {
            min: asteroid.estimated_diameter.meters.estimated_diameter_min,
            max: asteroid.estimated_diameter.meters.estimated_diameter_max
        },
        is_potentially_hazardous: asteroid.is_potentially_hazardous_asteroid,
        close_approach_date_full: asteroid.close_approach_data[0].close_approach_date_full,
        relative_velocity_kps: asteroid.close_approach_data[0].relative_velocity.kilometers_per_second
    };
}