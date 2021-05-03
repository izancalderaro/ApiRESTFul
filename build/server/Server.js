"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const Api_1 = __importDefault(require("./api/Api"));
const config = require('./config/env/Config')();
const models = require('./models/');
const server = http_1.default.createServer(Api_1.default);
models.sequelize.sync().then(() => {
    server.listen(config.serverPort);
    server.on('listening', () => console.log(`Servidor rodando na porta: ${config.serverPort}`));
    server.on('error', (error) => console.log(`Ocorreu um erro: ${error}`));
});
