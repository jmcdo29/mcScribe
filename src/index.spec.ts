import * as mcScribe from './index';

describe('index', () => {
  test('make sure the module exports correctly', () => {
    expect(typeof mcScribe.scribe).toBe('object');
  });
});
