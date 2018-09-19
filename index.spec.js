const logging  = require('./index');

describe('index', () => {
  test('make sure the module exports correctly', () => {
    expect(logging.consoleLogger).toBeTruthy();
    expect(logging.logStart).toBeTruthy();
    expect(logging.requestLogger).toBeTruthy();
    expect(typeof logging.consoleLogger).toBe('function');
    expect(typeof logging.logStart).toBe('function');
    expect(typeof logging.requestLogger).toBe('function');
  });
})