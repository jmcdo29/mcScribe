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
  const logMap = {
    FATAL: 6,
    ERROR: 5,
    WARN: 4,
    INFO: 3,
    DEBUG: 2,
    FINE: 1,
    OFF: 0
  };
  const mapLevel = logMap[level];
  const dateString =
    '[' +
    new Date(Date.now())
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '') +
    ']';
  level = '[' + level + ']';
  level = levelString(level.padEnd(7).toUpperCase());
  const logLevel = logMap[process.env.LOG_LEVEL || 'INFO'];
  if (mapLevel >= logLevel && logLevel !== 0) {
    for (const arg of args) {
      if (typeof arg === 'object') {
        process.stdout.write(`${dateString} ${level}|\n`);
        process.stdout.write(JSON.stringify(arg, getCircularReplacer(), 2));
        process.stdout.write('\n');
      } else {
        process.stdout.write(`${dateString} ${level}| ${arg}\n`);
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

function getColor(
  color:
    | 'red'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'purple'
    | 'cyan'
    | 'whiteAndBlack'
    | 'reset'
): string {
  let retString = '';
  if (isNotProd()) {
    switch (color) {
      case 'red':
        retString = '\u001b[31m';
        break;
      case 'blue':
        retString = '\u001b[34m';
        break;
      case 'green':
        retString = '\u001b[32m';
        break;
      case 'yellow':
        retString = '\u001b[33m';
        break;
      case 'purple':
        retString = '\u001b[35m';
        break;
      case 'whiteAndBlack':
        retString = '\u001b[47m\u001b[30m';
        break;
      case 'cyan':
        retString = '\u001b[36m';
        break;
      case 'reset':
      default:
        retString = '\u001b[0m';
    }
  }
  return retString;
}

function levelString(level: string): string {
  let retString: string;
  switch (level.trim()) {
    case '[FATAL]':
      retString = getColor('whiteAndBlack');
      break;
    case '[ERROR]':
      retString = getColor('red');
      break;
    case '[WARN]':
      retString = getColor('yellow');
      break;
    case '[INFO]':
      retString = getColor('blue');
      break;
    case '[DEBUG]':
      retString = getColor('purple');
      break;
    case '[FINE]':
      retString = getColor('green');
      break;
  }
  retString += level + getColor('reset');
  return retString;
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === 'function') {
      return getColor('cyan') + '[Function]' + getColor('reset');
    } else if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return getColor('cyan') + '[Circular]' + getColor('reset');
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
