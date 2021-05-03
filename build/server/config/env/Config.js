"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Development_env_1 = __importDefault(require("./Development.env"));
const Production_env_1 = __importDefault(require("./Production.env"));
function Config() {
    if (process.env.NODE_ENV == 'development') {
        return Development_env_1.default;
    }
    else {
        return Production_env_1.default;
    }
}
module.exports = Config;
