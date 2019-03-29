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
  let mapLevel = logMap.get(level);
  const dateString = '[' + new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '') + ']';
  level = '[' + level + ']';
  const levelOut = levelString(level.padEnd(7).toUpperCase());
  const logLevel = logMap.get(process.env.LOG_LEVEL || 'INFO');
  if (mapLevel >= logLevel && logLevel !== 0) {
    for (const arg of args) {
      if (typeof arg === 'object') {
        process.stdout.write(`${dateString} ${levelOut}|\n`);
        process.stdout.write(JSON.stringify(arg, null, 2));
        process.stdout.write('\n');
      } else {
        process.stdout.write(`${dateString} ${levelOut}| ${arg}\n`);
      }
    }
  }
}

function levelString(level: string): string {
  let retString: string;
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'prod') {
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

export const scribe = {
  fatal: (...args: any[]) => scriber('FATAL', ...args),
  error: (...args: any[]) => scriber('ERROR', ...args),
  warn: (...args: any[]) => scriber('WARN', ...args),
  info: (...args: any[]) => scriber('INFO', ...args),
  debug: (...args: any[]) => scriber('DEBUG', ...args),
  fine: (...args: any[]) => scriber('FINE', ...args)
}
