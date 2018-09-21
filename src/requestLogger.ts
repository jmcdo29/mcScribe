import { consoleLogger as myLogger } from './consoleLogger';

/**
 * Logs the request made to the API. Captures the sender's IP address, the request path, and type, the returnCode, the status type, the logger's version, the service type, and if the logger is set to the right level, the body details.
 * @param {Express.Request} req the express request object for express middleware
 * @param {Express.Response} res the express response object for express middleware
 */
export function requestLogger(req: {ip: string, path: string, _result: {returnCode: number, errorList: string[]}, method: string, _start: number, body: any}, res: any) {
  const now = Date.now();
  const logging: {
    caller: string,
    serviceName: string,
    status: string,
    versionId: string,
    httpMethod: string,
    processTime: string,
    loggerTime: Date,
    statusCode: number,
    statusMessage: string,
    serviceType: string
  } = {} as any;
  logging.caller = req.ip;
  logging.serviceName = req.path;
  logging.status = req._result.returnCode === 0 ? 'SUCCESS' : 'ERROR';
  logging.versionId = '1.0.0';
  logging.httpMethod = req.method;
  logging.processTime = now - req._start + 'ms';
  logging.loggerTime = new Date(now);
  logging.statusCode = req._result.returnCode;
  logging.statusMessage = req._result.errorList[0];
  logging.serviceType = 'REST';
  myLogger(
    'INFO',
    JSON.stringify(logging).replace(/,/g, ' | ')
  );
  myLogger('FINE', req.body);
};
