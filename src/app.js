import {config} from "../config/app_config.js";
import express from "express"

export const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = config.appServerConfig.port;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});