/**
 * Logs the request made to the API. Captures the sender's IP address, the request path, and type, the returnCode, the status type, the logger's version, the service type, and if the logger is set to the right level, the body details.
 * @param {Express.Request} req the express request object for express middleware
 * @param {Express.Response} res the express response object for express middleware
 */
export declare function requestLogger(req: {
    ip: string;
    path: string;
    _result: {
        returnCode: number;
        errorList: string[];
    };
    method: string;
    _start: number;
    body: any;
}, res: any): void;
