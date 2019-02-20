import * as mcScribe from './index';

describe('index', () => {
  test('make sure the module exports correctly', () => {
    expect(mcScribe.logStart).toBeTruthy();
    expect(mcScribe.logStart).toBeTruthy();
    expect(mcScribe.requestLogger).toBeTruthy();
    expect(typeof mcScribe.scribe).toBe('function');
    expect(typeof mcScribe.logStart).toBe('function');
    expect(typeof mcScribe.requestLogger).toBe('function');
  });
});
