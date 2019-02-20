import { scribe } from './consoleLogger';

describe('test the scribe', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    process.env.NODE_ENV = 'dev';
    console.log = jest.fn();
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('FATAL LEVEL', () => {
    process.env.LOG_LEVEL = 'FATAL';
    scribe('FATAL', 'log this');
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(expect.stringContaining('log this'));
    scribe('ERROR', "don't log this");
    expect((console.log as jest.Mock).mock.calls[0][1]).not.toEqual(expect.stringContaining("don't log this"));
  });

  test('ERROR LEVEL', () => {
    process.env.LOG_LEVEL = "ERROR";
    scribe('ERROR', ['This', 'should', 'log']);
    expect((console.log as jest.Mock).mock.calls[0][1]).toContain('This')
    scribe('WARN', "Don't log this");
    expect(typeof (console.log as jest.Mock).mock.calls[0][1]).not.toBe('string');
  });

  test('WARN LEVEL', () => {
    process.env.LOG_LEVEL = "WARN";
    scribe('WARN', 'This should log');
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(expect.stringContaining('This should log'));
    scribe('INFO', 'Don\'t log this');
    expect((console.log as jest.Mock).mock.calls[0][1]).not.toEqual(expect.stringContaining("Don't log this"));
  });

  test('INFO LEVEL', () => {
    process.env.LOG_LEVEL = "INFO";
    scribe('INFO', 'This should log');
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(expect.stringContaining('This should log'));
    scribe('DEBUG', 'Don\'t log this');
    expect((console.log as jest.Mock).mock.calls[0][1]).not.toEqual(expect.stringContaining("Don't log this"));
  });

  test('DEBUG LEVEL', () => {
    process.env.LOG_LEVEL = "DEBUG";
    scribe('DEBUG', 'This should log');
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(expect.stringContaining('This should log'));
    scribe('FINE', 'Don\'t log this');
    expect((console.log as jest.Mock).mock.calls[0][1]).not.toEqual(expect.stringContaining("Don't log this"));
  });

  test('FINE LEVEL', () => {
    process.env.LOG_LEVEL = "FINE";
    scribe('FINE', 'This should log');
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(expect.stringContaining('This should log'));
    scribe('FINE', 'This should log');
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(expect.stringContaining('This should log'));
  });

  test('OFF LEVEL', () => {
    process.env.LOG_LEVEL = "OFF";
    scribe('FINE', 'This shouldn\'t log');
    expect((console.log as jest.Mock).mock.calls[0]).toBeFalsy();
    scribe('FATAL', 'Don\'t log this');
    expect((console.log as jest.Mock).mock.calls[0]).toBeFalsy();
  });

  test('NO LEVEL SET', () => {
    scribe('INFO', 'This should print');
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(expect.stringContaining("This should print"));
    scribe('DEBUG', 'This should not');
    expect((console.log as jest.Mock).mock.calls[0][1]).not.toEqual(expect.stringContaining("This should not"));
  });

  test('bad level passed', () => {
    process.env.NODE_ENV = 'development';
    scribe('inof', 'this should still log', {message: 'An object too'});
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(expect.stringContaining("this should still log"));
    expect((console.log as jest.Mock).mock.calls[1][1]).toEqual({message: 'An object too'});
  });

  test('DO NOT CHANGE COLOR', () => {
    process.env.NODE_ENV = 'production';
    scribe('inof', 'this should still log', {message: 'An object too'});
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(expect.stringContaining("this should still log"));
    expect((console.log as jest.Mock).mock.calls[1][1]).toEqual({message: 'An object too'});
  });
});