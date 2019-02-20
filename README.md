# Mc-Scribe

[![Build Status](https://travis-ci.org/jmcdo29/mcScribe.svg?branch=master)](https://travis-ci.org/jmcdo29/mcScribe)
[![codecov](https://codecov.io/gh/jmcdo29/mcScribe/branch/master/graph/badge.svg)](https://codecov.io/gh/jmcdo29/mcScribe)

Before getting started import the module in your root server file with

JavaScript

```javascript
const logging = require('mc-scribe');
```

TypeScript

```typescript
import * as logger from 'mc-scribe';
```

from there the functions `logStart`, `requestLogger`, and `logger` can be accessed.

## Logger Start Middleware

While setting up your middleware add in the following line to make sure the request object has the correct properties.

JavaScript

```javascript
app.use(logging.logStart(returnCode, errorList));
```

TypeScript

```typescript
app.use(logging.logStart(returnCode, errorList));
```

To use it without adding any of your own values, just call

JavaScript

```javascript
app.use(logging.logStart());
```

TypeScript

```typescript
app.use(logging.logStart());
```

This ensures that the express request object will have the request start time and the API result object. `returnCode` is a number and `errorList` is an array of strings. These can both be set for additional error handling further on in the execution chain (like looking for 404s with the errorList containing 'URL not found.'). By default the returnCode is 0 and the errorList is empty.

## Middleware Logging

### Expected Server Set Up

It is expected that the express request object follow good logging standards for Node.JS APIs. This means that the API response object should look like the following

```javascript
result = {
  returnCode: <number>
  errorList: <string[]>
  ...
};
```

To use this request logger in your application, make sure to import the function specifically with

JavaScript

```javascript
const requestLogger = require('mc-scribe').requestLogger;
app.use(requestLogger);
```

TypeScript

```typescript
import { requestLogger } from 'mc-scribe';
app.use(requestLogger);
```

or import the main object and use the property

JavaScript

```javascript
const logging = require('mc-scribe');
app.use(logging.requestLogger);
```

TypeScript

```typescript
import * as logging from 'mc-scribe';
app.use(logging.requestLogger);
```

When you call `app.use();` make sure it is after the `logStart` middleware. It would be best to have the logger fire after all process have finished (i.e. all middleware, route handlers, and error handler). This really should be the last middeware function you call.

### Expected Server Output

So long as these two properties are present the request logger will recognize they are there and log them as a part of the request.
The expected output of the log is as follows:

```text
[9/4/18 10:25:46.57] [INFO] | {"caller":"<ip address>" | "serviceName":"<url path>" | "status":"<SUCCESS | ERROR>" | "versionId":"1.0.0" | "httpMethod":"<POST | GET | PUT>" | "processTime":"<time in ms>" | "loggerTime":"<UTC Date String>" | "statusCode":"<result.returnCode>" | "statusMessage":"<result.errorList[0]>." | "serviceType":"REST"}
```

This middleware logger already takes into account Daylight Savings Time so that the request date and time is always correct for the Pacific Coast of the United States.
If in the environment variables `LOG_LEVEL` is set to `FINE` then the requestLogger will also print out the `req.body` object. This is so system admins and developers can fine tune what information is being seen when debugging problem.s

## Console Logging

### Expected Console Set Up

In any module you would like to implement the logger you will need to import the logger with

JavaScript

```javascript
const logger = require('mc-scribe').scribe;
```

TypeScript

```typescript
import { scribe as logger } from 'mc-scribe';
```

`scribe` is the natural name of the logging method, and can be used to log if you so choose to use it. To use the logger you will need to call the function with

JavaScript

```javascript
logger(level, ...args);
```

TypeScript

```typescript
logger(level, ...args);
```

where `level` is the severity of the log as a string and `args` is what is to logged. The severities of the logger are as follows in descending order

* `FATAL`
  * Should be used mainly for application crashes.
* `ERROR`
  * Should be used for application errors like 404s and failed database callouts.
* `WARN`
  * Should be used for calls that take multiple attempts. Should be looked into, but is not severe as an error.
* `INFO`
  * Should be used for stating when services start and stop. This will most likely be the default log level.
* `DEBUG`
  * Should be used to get a little bit more into the weeds. Start looking into non-sensitive request parameters, content length and response times.
* `FINE`
  * Should be used to look into speciifed HTTP codes, error stacks, all request parameters, and other sensitive information.
* `OFF` (not recommended)
  * Should only be used if log levels are too high for the application. This will most likely never be the case.

So long as the level provided is above the global log level the statement will be printed out. The global log level may be set with `process.env.LOG_LEVEL` using a `.env` file or by running `env LOG_LEVEL=level npm start` with git bash (or equivalent), `LOG_LEVEL=level npm start` on Ubuntu and other Linux distros, or `SET LOG_LEVEL=level npm start` on Windows. If a log level is not provided to work with, the global default is `INFO`.

### Expected Console Output

The expected output of the call

```javascript
logger('INFO', 'THIS IS A TEST.', 'THIS IS ANOTHER TEST.', {message: 'THIS IS AN OBJECT TEST'}, 501, ['This', 'Is', 'An', 'Array']);
```

```text
[9/4/18 13:31:25.937] [INFO] | THIS IS A TEST.
[9/4/18 13:31:25.937] [INFO] | THIS IS ANOTHER TEST.
[9/4/18 13:31:25.937] [INFO] |
 { "message": "THIS IS AN OBJECT TEST" }
[9/4/18 13:31:25.937] [INFO] | 501
[9/4/18 13:31:25.937] [INFO] |
 [ 'This', 'Is', 'An', 'Array' ]
```