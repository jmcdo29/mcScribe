"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcScribe = require("../index");
describe('index', () => {
    test('make sure the module exports correctly', () => {
        expect(mcScribe.logStart).toBeTruthy();
        expect(mcScribe.logStart).toBeTruthy();
        expect(mcScribe.requestLogger).toBeTruthy();
        expect(typeof mcScribe.consoleLogger).toBe('function');
        expect(typeof mcScribe.logStart).toBe('function');
        expect(typeof mcScribe.requestLogger).toBe('function');
    });
});
