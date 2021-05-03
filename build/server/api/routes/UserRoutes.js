"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../controllers/UserController"));
class UserRoutes {
    constructor() { }
    getAll(_req, _res) {
        return UserController_1.default.getAll(_req, _res);
    }
    create(_req, _res) {
        return UserController_1.default.create(_req, _res);
    }
    getById(_req, _res) {
        return UserController_1.default.getById(_req, _res);
    }
    update(_req, _res) {
        return UserController_1.default.update(_req, _res);
    }
    delete(_req, _res) {
        return UserController_1.default.delete(_req, _res);
    }
}
exports.default = new UserRoutes();
