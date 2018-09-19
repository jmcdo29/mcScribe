const consoleLogger = require('../src/consoleLogger');

describe('test the consoleLogger', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
    console.log = jest.fn();
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('FATAL LEVEL', () => {
    process.env.LOG_LEVEL = 'FATAL';
    consoleLogger('FATAL', 'log this');
    expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('log this'));
    consoleLogger('ERROR', "don't log this");
    expect(console.log.mock.calls[0][1]).not.toEqual(expect.stringContaining("don't log this"));
  });

  test('ERROR LEVEL', () => {
    process.env.LOG_LEVEL = "ERROR";
    consoleLogger('ERROR', ['This', 'should', 'log']);
    expect(console.log.mock.calls[0][1]).toContain('This')
    consoleLogger('WARN', "Don't log this");
    expect(typeof console.log.mock.calls[0][1]).not.toBe('string');
  });

  test('WARN LEVEL', () => {
    process.env.LOG_LEVEL = "WARN";
    consoleLogger('WARN', 'This should log');
    expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('This should log'));
    consoleLogger('INFO', 'Don\'t log this');
    expect(console.log.mock.calls[0][1]).not.toEqual(expect.stringContaining("Don't log this"));
  });

  test('INFO LEVEL', () => {
    process.env.LOG_LEVEL = "INFO";
    consoleLogger('INFO', 'This should log');
    expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('This should log'));
    consoleLogger('DEBUG', 'Don\'t log this');
    expect(console.log.mock.calls[0][1]).not.toEqual(expect.stringContaining("Don't log this"));
  });

  test('DEBUG LEVEL', () => {
    process.env.LOG_LEVEL = "DEBUG";
    consoleLogger('DEBUG', 'This should log');
    expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('This should log'));
    consoleLogger('FINE', 'Don\'t log this');
    expect(console.log.mock.calls[0][1]).not.toEqual(expect.stringContaining("Don't log this"));
  });

  test('FINE LEVEL', () => {
    process.env.LOG_LEVEL = "FINE";
    consoleLogger('FINE', 'This should log');
    expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('This should log'));
    consoleLogger('FINE', 'This should log');
    expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining('This should log'));
  });

  test('OFF LEVEL', () => {
    process.env.LOG_LEVEL = "OFF";
    consoleLogger('FINE', 'This shouldn\'t log');
    expect(console.log.mock.calls[0]).toBeFalsy();
    consoleLogger('FATAL', 'Don\'t log this');
    expect(console.log.mock.calls[0]).toBeFalsy();
  });

  test('NO LEVEL SET', () => {
    consoleLogger('INFO', 'This should print');
    expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining("This should print"));
    consoleLogger('DEBUG', 'This should not');
    expect(console.log.mock.calls[0][1]).not.toEqual(expect.stringContaining("This should not"));
  });

  test('bad level passed', () => {
    consoleLogger('inof', 'this should still log', {message: 'An object too'});
    expect(console.log.mock.calls[0][1]).toEqual(expect.stringContaining("this should still log"));
    expect(console.log.mock.calls[1][1]).toEqual({message: 'An object too'});
  });

});