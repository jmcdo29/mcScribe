import { logStart } from '../src/logStart';

describe('logStart tests', () => {

  test('passing in args', () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const mw = logStart(50, ['some list']);
  });

  test('passing nothing', () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const mw = logStart();
    mw(req, res, next);
  });

});
