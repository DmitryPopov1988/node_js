import express from "express"
import {config} from "./config/config.js";
import {client} from "./client/nasa_client.js";


export const app = express();

app.get('/meteors', (req, res) => {
    let startDate = req.query.start_date;
    let endDate = req.query.end_date;

    if (!startDate) {
        startDate = new Date().toISOString().split('T')[0];
    }

    if (!endDate) {
        endDate = new Date().toISOString().split('T')[0];
    }

    client(req, res, startDate, endDate);
});

const port = config.appServerConfig.port;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});