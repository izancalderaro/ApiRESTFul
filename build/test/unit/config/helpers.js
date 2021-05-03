"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDouble = exports.expect = exports.request = exports.app = void 0;
const chai_1 = __importDefault(require("chai"));
const testdouble_1 = __importDefault(require("testdouble"));
const supertest_1 = __importDefault(require("supertest"));
const Api_1 = __importDefault(require("../../../server/api/Api"));
const app = Api_1.default;
exports.app = app;
const request = supertest_1.default;
exports.request = request;
const expect = chai_1.default.expect;
exports.expect = expect;
const testDouble = testdouble_1.default;
exports.testDouble = testDouble;
