import express from "express"
import {config} from "./config/app_config.js";
import {client} from "./client/meteor_nasa_client.js";


export const app = express();

app.get('/meteors', client);

const port = config.appServerConfig.port;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});