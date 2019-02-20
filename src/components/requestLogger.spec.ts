import { requestLogger } from './requestLogger';

describe('requestLogger', () => {
  test('successful', () => {
    console.log = jest.fn();
    requestLogger(
      {
        ip: '::1',
        path: '/test/path',
        _result: {
          returnCode: 0,
          errorList: []
        },
        method: 'GET',
        _start: Date.now() - 100,
        body: {}
      },
      {}
    );
    // Expectations
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('caller')
    );
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('httpMethod')
    );
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('status')
    );
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('serviceName')
    );
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('processTime')
    );
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('SUCCESS')
    );
  });

  test('unSuccessful', () => {
    console.log = jest.fn();
    requestLogger(
      {
        ip: '::1',
        path: '/test/path',
        _result: {
          returnCode: 50,
          errorList: ['There was an error']
        },
        method: 'GET',
        _start: Date.now() - 100,
        body: {}
      },
      {}
    );
    // Expectations
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('caller')
    );
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('httpMethod')
    );
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('status')
    );
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('serviceName')
    );
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('processTime')
    );
    expect((console.log as jest.Mock).mock.calls[0][1]).toEqual(
      expect.stringContaining('ERROR')
    );
  });

});
