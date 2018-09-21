"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestLogger_1 = require("../src/requestLogger");
describe('requestLogger', () => {
    test('successful', () => {
        console.log = jest.fn();
        requestLogger_1.requestLogger({
            ip: '::1',
            path: '/test/path',
            _result: {
                returnCode: 0,
                errorList: []
            },
            method: 'GET',
            _start: Date.now() - 100,
            body: {}
        }, {});
        // Expectations
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('caller'));
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('httpMethod'));
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('status'));
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('serviceName'));
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('processTime'));
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('SUCCESS'));
    });
    test('unSuccessful', () => {
        console.log = jest.fn();
        requestLogger_1.requestLogger({
            ip: '::1',
            path: '/test/path',
            _result: {
                returnCode: 50,
                errorList: ['There was an error']
            },
            method: 'GET',
            _start: Date.now() - 100,
            body: {}
        }, {});
        // Expectations
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('caller'));
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('httpMethod'));
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('status'));
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('serviceName'));
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('processTime'));
        expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('ERROR'));
    });
});
