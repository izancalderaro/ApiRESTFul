"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
class Routes {
    constructor(app) {
        this.getRoutes(app);
    }
    getRoutes(app) {
        app.get('/api/users/all', UserRoutes_1.default.getAll);
        app.post('/api/users/create', UserRoutes_1.default.create);
        app.get('/api/users/:id', UserRoutes_1.default.getById);
        app.put('/api/users/:id/update', UserRoutes_1.default.update);
        app.delete('/api/users/:id/delete', UserRoutes_1.default.delete);
    }
}
exports.default = Routes;
