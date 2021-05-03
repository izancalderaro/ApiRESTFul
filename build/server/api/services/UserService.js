"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("../interfaces/UserInterface");
const model = require('../../models');
class UserService {
    constructor(id = 0, name = '', email = '', password = '') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    create(user) {
        return model.User.create(user);
    }
    getAll() {
        return model.User.findAll({
            order: ['name']
        })
            .then(UserInterface_1.createUsers);
    }
    getById(id) {
        return model.User.findOne({
            where: { id }
        })
            .then(UserInterface_1.createUserById);
    }
    getByEmail(email) {
        return model.User.findOne({
            where: { email }
        })
            .then(UserInterface_1.createUserByEmail);
    }
    update(id, user) {
        return model.User.update(user, {
            where: { id },
            fields: ['name', 'email', 'password'],
        });
    }
    delete(id) {
        return model.User.destroy({
            where: { id }
        });
    }
}
exports.default = new UserService();
