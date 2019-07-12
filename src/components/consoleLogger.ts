/**
 *
 * Logger to contain te level and arguments to display.
 * If the level is greater than or equal to the global log level (default to INFO)
 * then the logger will print to the console
 * @param {string} level - the level of severity of the Log.
 * Levels can be (in descending order) FATAL, ERROR, WARN, INFO (global default), DEBUG, FINE, OFF
 * @param  {...any} args - What you want to log
 */
function scriber(level: string, ...args: any[]) {
  level = level.toUpperCase();
  const logMap = new Map([
    ['FATAL', 6],
    ['ERROR', 5],
    ['WARN', 4],
    ['INFO', 3],
    ['DEBUG', 2],
    ['FINE', 1],
    ['OFF', 0]
  ]);
  const mapLevel = logMap.get(level);
  const dateString =
    '[' +
    new Date(Date.now())
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '') +
    ']';
  level = '[' + level + ']';
  const levelOut = levelString(level.padEnd(7).toUpperCase());
  const logLevel = logMap.get(process.env.LOG_LEVEL || 'INFO');
  if (mapLevel >= logLevel && logLevel !== 0) {
    for (const arg of args) {
      if (typeof arg === 'object') {
        process.stdout.write(`${dateString} ${levelOut}|\n`);
        process.stdout.write(JSON.stringify(arg, getCircularReplacer(), 2));
        process.stdout.write('\n');
      } else {
        process.stdout.write(`${dateString} ${levelOut}| ${arg}\n`);
      }
    }
  }
}

function isNotProd() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  return (
    process.env.NODE_ENV.toLowerCase() !== 'production' &&
    process.env.NODE_ENV.toLowerCase() !== 'prod'
  );
}

function levelString(level: string): string {
  let retString: string;
  if (isNotProd()) {
    switch (level.trim()) {
      case '[FATAL]':
        retString = '\u001b[47m\u001b[30m';
        break;
      case '[ERROR]':
        retString = '\u001b[31m';
        break;
      case '[WARN]':
        retString = '\u001b[33m';
        break;
      case '[INFO]':
        retString = '\u001b[34m';
        break;
      case '[DEBUG]':
        retString = '\u001b[35m';
        break;
      case '[FINE]':
        retString = '\u001b[32m';
        break;
    }
    retString += level + '\u001b[0m';
  } else {
    retString = level;
  }
  return retString;
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'function') {
      return '[Function]';
    } else if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  };
};

export const scribe = {
  /**
   * Logging function for catastrophic errors. Or stack traces. Whatever you want.
   * @param {...any} args what you want to be written
   */
  fatal: (...args: any[]) => scriber('FATAL', ...args),
  /**
   * Logging function for error messages. Or whatever else you want to show up in red you want.
   * @param {...any} args what you want to be written
   */
  error: (...args: any[]) => scriber('ERROR', ...args),
  /**
   * Logging function for warnings to show that some things are slow. Or whatever you want with a yellow tag.
   * @param {...any} args what you want to be written
   */
  warn: (...args: any[]) => scriber('WARN', ...args),
  /**
   * Logging function for general information with a pretty blue tag.
   * @param {...any} args what you want to be written
   */
  info: (...args: any[]) => scriber('INFO', ...args),
  /**
   * Logging function for getting into some details, great for debugging and checking some properties. Has a purple tag in dev.
   * @param {...any} args what you want to be written
   */
  debug: (...args: any[]) => scriber('DEBUG', ...args),
  /**
   * Logging function for the nitty-gritty. Payloads, timings, sensitive information, you name it.
   * Green tagged in dev, but should be used sparingly in prod.
   * @param {...any} args what you want to be written
   */
  fine: (...args: any[]) => scriber('FINE', ...args)
};
