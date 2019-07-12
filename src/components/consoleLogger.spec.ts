import { scribe } from './consoleLogger';

describe('test the scribe', () => {
  const OLD_ENV = process.env;

  const circular: any = {};
  circular.a = 'foo';
  circular.b = circular;
  circular.c = function() {
    return 'hello';
  };

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    process.env.NODE_ENV = 'dev';
    process.stdout.write = jest.fn();
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('FATAL LEVEL', () => {
    process.env.LOG_LEVEL = 'FATAL';
    scribe.fatal('log this');
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('log this')
    );
    scribe.error("don't log this");
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).not.toEqual(
      expect.stringContaining("don't log this")
    );
  });

  test('ERROR LEVEL', () => {
    process.env.LOG_LEVEL = 'ERROR';
    scribe.error(['This', 'should', 'log']);
    expect((process.stdout.write as jest.Mock).mock.calls[1][0]).toContain(
      'This'
    );
    scribe.warn("Don't log this");
    expect((process.stdout.write as jest.Mock).mock.calls[3]).toBeFalsy();
  });

  test('WARN LEVEL', () => {
    process.env.LOG_LEVEL = 'WARN';
    scribe.warn('This should log');
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('This should log')
    );
    scribe.info("Don't log this");
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).not.toEqual(
      expect.stringContaining("Don't log this")
    );
  });

  test('INFO LEVEL', () => {
    process.env.LOG_LEVEL = 'INFO';
    scribe.info('This should log');
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('This should log')
    );
    scribe.debug("Don't log this");
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).not.toEqual(
      expect.stringContaining("Don't log this")
    );
    scribe.info(circular);
    expect((process.stdout.write as jest.Mock).mock.calls[2][0]).toContain(
      '[Circular]'
    );
    expect((process.stdout.write as jest.Mock).mock.calls[2][0]).toContain(
      '[Function]'
    );
  });

  test('DEBUG LEVEL', () => {
    process.env.LOG_LEVEL = 'DEBUG';
    scribe.debug('This should log');
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('This should log')
    );
    scribe.fine("Don't log this");
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).not.toEqual(
      expect.stringContaining("Don't log this")
    );
  });

  test('FINE LEVEL', () => {
    process.env.LOG_LEVEL = 'FINE';
    scribe.fine('This should log');
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('This should log')
    );
    scribe.fine('This should log');
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('This should log')
    );
  });

  test('OFF LEVEL', () => {
    process.env.LOG_LEVEL = 'OFF';
    scribe.fine("This shouldn't log");
    expect((process.stdout.write as jest.Mock).mock.calls[0]).toBeFalsy();
    scribe.fatal("Don't log this");
    expect((process.stdout.write as jest.Mock).mock.calls[0]).toBeFalsy();
  });

  test('NO LEVEL SET', () => {
    scribe.info('This should print');
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('This should print')
    );
    scribe.debug('This should not');
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).not.toEqual(
      expect.stringContaining('This should not')
    );
  });

  test('No colors', () => {
    process.env.NODE_ENV = 'prod';
    scribe.info('NO COLORS!');
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('NO COLORS!')
    );
    scribe.info(circular);
    expect((process.stdout.write as jest.Mock).mock.calls[2][0]).toContain(
      '[Circular]'
    );
    expect((process.stdout.write as jest.Mock).mock.calls[2][0]).toContain(
      '[Function]'
    );
  });

  test('No NODE_ENV', () => {
    process.env.NODE_ENV = '';
    scribe.info(circular);
    expect((process.stdout.write as jest.Mock).mock.calls[1][0]).toContain(
      '[Circular]'
    );
    expect((process.stdout.write as jest.Mock).mock.calls[1][0]).toContain(
      '[Function]'
    );
  });
});
