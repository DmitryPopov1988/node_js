"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const path_1 = __importDefault(require("path"));
const env_config_1 = require("./config/env_config");
const meteor_router_1 = __importDefault(require("./router/meteor_router"));
const rover_photo_router_1 = __importDefault(require("./router/rover_photo_router"));
const validator_1 = require("./middleware/validator");
const meteor_request_validator_1 = require("./validation/meteor_request_validator");
const user_request_validator_1 = require("./validation/user_request_validator");
const exception_1 = require("./middleware/exception");
const app = (0, express_1.default)();
nunjucks_1.default.configure(path_1.default.resolve(__dirname, './template'), {
    autoescape: true,
    express: app,
});
app.use(express_1.default.json());
app.use('/meteors', (0, validator_1.validator)(meteor_request_validator_1.meteorRequestSchema, 'query'), meteor_router_1.default);
app.use('/photos', (0, validator_1.validator)(user_request_validator_1.userRequestSchema, 'body'), rover_photo_router_1.default);
app.use(exception_1.exceptionHandler);
app.use('*', exception_1.pageNotFoundHandler);
const port = env_config_1.env_config.appServerConfig.port;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
