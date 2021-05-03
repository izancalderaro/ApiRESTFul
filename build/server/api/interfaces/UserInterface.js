"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserByEmail = exports.createUserById = exports.createUsers = exports.createUser = void 0;
function createUser({ id, name, email, password }) {
    return {
        id, name, email, password
    };
}
exports.createUser = createUser;
function createUsers(data) {
    return data.map(createUser);
}
exports.createUsers = createUsers;
function createUserById({ id, name, email, password }) {
    return {
        id, name, email, password
    };
}
exports.createUserById = createUserById;
function createUserByEmail({ id, name, email, password }) {
    return {
        id, name, email, password
    };
}
exports.createUserByEmail = createUserByEmail;
