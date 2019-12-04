# Mc-Scribe

[![Build Status](https://travis-ci.org/jmcdo29/mcScribe.svg?branch=master)](https://travis-ci.org/jmcdo29/mcScribe)

Before getting started import the module in your root server file with

JavaScript

```javascript
const logging = require('mc-scribe');
```

TypeScript

```typescript
import * as logger from 'mc-scribe';
```

from there the function `scribe` can be accessed.

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
logger.level(...args);
```

TypeScript

```typescript
logger.level(...args);
```

where `level` is the severity of the log as a string and `args` is what is to logged. The severities of the logger are as follows in descending order

- `FATAL`
  - Should be used mainly for application crashes.
- `ERROR`
  - Should be used for application errors like 404s and failed database callouts.
- `WARN`
  - Should be used for calls that take multiple attempts. Should be looked into, but is not severe as an error.
- `INFO`
  - Should be used for stating when services start and stop. This will most likely be the default log level.
- `DEBUG`
  - Should be used to get a little bit more into the weeds. Start looking into non-sensitive request parameters, content length and response times.
- `FINE`
  - Should be used to look into speciifed HTTP codes, error stacks, all request parameters, and other sensitive information.
- `OFF` (not recommended)
  - Should only be used if log levels are too high for the application. This will most likely never be the case.

So long as the level provided is above the global log level the statement will be printed out. The global log level may be set with `process.env.LOG_LEVEL` using a `.env` file or by running `env LOG_LEVEL=level npm start` with git bash (or equivalent), `LOG_LEVEL=level npm start` on Ubuntu and other Linux distros, or `SET LOG_LEVEL=level npm start` on Windows. If a log level is not provided to work with, the global default is `INFO`.

### Expected Console Output

The expected output of the call

```javascript
logger.info(
  'THIS IS A TEST.',
  'THIS IS ANOTHER TEST.',
  { message: 'THIS IS AN OBJECT TEST' },
  501,
  ['This', 'Is', 'An', 'Array']
);
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
