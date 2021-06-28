import mocha from 'mocha';
import chai from 'chai';
import td from 'testdouble';
import supertest from 'supertest';
import App from '../../../src/api/Api';

const app = App
const request = supertest
const expect = chai.expect
const testDouble = td

export { app, request, expect, testDouble }