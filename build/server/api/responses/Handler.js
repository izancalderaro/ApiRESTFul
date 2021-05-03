"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
class Handler {
    constructor() {
    }
    onSucess(_res, data) {
        _res.status(http_status_1.default.OK).json({ payload: data });
    }
    onError(_res, message, err) {
        _res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({ payload: `${message} => Erro: ${err}` });
    }
    dbErrorHandler(_res, err) {
        _res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            code: 'ERR-001',
            message: 'Erro Interno do Servidor'
        });
    }
}
exports.default = new Handler();
