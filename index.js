require('dotenv').config();
const https = require('https');

const req = https.get(process.env.NASA_API_URL + '?start_date=2024-03-08&end_date=2024-03-12&api_key=' + process.env.NASA_API_KEY, res => {

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const jsonData = JSON.stringify(data, null, 2);
            console.log(jsonData);
        } catch (error) {
            console.error('Error parsing JSON:', error.message);
        }
    });
});

req.on('error', (error) => {
    console.error('Error fetching data:', error.message);
});
