import { requestLogger } from './requestLogger';

describe('requestLogger', () => {
  test('successful', () => {
    process.stdout.write = jest.fn();
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
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('caller')
    );
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('httpMethod')
    );
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('status')
    );
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('serviceName')
    );
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('processTime')
    );
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('SUCCESS')
    );
  });

  test('unSuccessful', () => {
    process.stdout.write = jest.fn();
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
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('caller')
    );
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('httpMethod')
    );
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('status')
    );
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('serviceName')
    );
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('processTime')
    );
    expect((process.stdout.write as jest.Mock).mock.calls[0][0]).toEqual(
      expect.stringContaining('ERROR')
    );
  });
});
