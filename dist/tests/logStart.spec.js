"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logStart_1 = require("../src/logStart");
describe('logStart tests', () => {
    test('passing in args', () => {
        const req = {};
        const res = {};
        const next = jest.fn();
        const mw = logStart_1.logStart(50, ['some list']);
    });
    test('passing nothing', () => {
        const req = {};
        const res = {};
        const next = jest.fn();
        const mw = logStart_1.logStart();
        mw(req, res, next);
    });
});
