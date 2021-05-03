"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const Handler_1 = __importDefault(require("../responses/Handler"));
const UserService_1 = __importDefault(require("../services/UserService"));
class UserServiceController {
    constructor() {
    }
    create(_req, _res) {
        UserService_1.default
            .create(_req.body)
            .then(lodash_1.default.partial(Handler_1.default.onSucess, _res))
            .catch(lodash_1.default.partial(Handler_1.default.dbErrorHandler, _res))
            .catch(lodash_1.default.partial(Handler_1.default.onError, _res, `Erro ao inserir novo uasuário`));
    }
    getAll(_req, _res) {
        UserService_1.default
            .getAll()
            .then(lodash_1.default.partial(Handler_1.default.onSucess, _res))
            .catch(lodash_1.default.partial(Handler_1.default.onError, _res, `Erro ao buscar todos os usuários`));
    }
    getById(_req, _res) {
        const UserServiceId = parseInt(_req.params.id);
        UserService_1.default.getById(UserServiceId)
            .then(lodash_1.default.partial(Handler_1.default.onSucess, _res))
            .catch(lodash_1.default.partial(Handler_1.default.onError, _res, `Usuário não encontrado`));
    }
    update(_req, _res) {
        const UserServiceId = parseInt(_req.params.id);
        const props = _req.body;
        UserService_1.default.update(UserServiceId, props)
            .then(lodash_1.default.partial(Handler_1.default.onSucess, _res))
            .catch(lodash_1.default.partial(Handler_1.default.onError, _res, `Falha ao atualizar usuário`));
    }
    delete(_req, _res) {
        const UserServiceId = parseInt(_req.params.id);
        UserService_1.default.delete(UserServiceId)
            .then(lodash_1.default.partial(Handler_1.default.onSucess, _res))
            .catch(lodash_1.default.partial(Handler_1.default.onError, _res, `Erro ao excluir usuário`));
    }
}
exports.default = new UserServiceController();
