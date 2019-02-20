/**
 *
 * Logger to contain te level and arguments to display.
 * If the level is greater than or equal to the global log level (default to INFO)
 * then the logger will print to the console
 * @param {string} level - the level of severity of the Log.
 * Levels can be (in descending order) FATAL, ERROR, WARN, INFO (global default), DEBUG, FINE, OFF
 * @param  {...any} args - What you want to log
 */
export function scribe(level: string, ...args: any[]) {
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
  level = mapLevel ? level : 'INFO';
  mapLevel = mapLevel ? mapLevel : 3;
  const logLevel = logMap.get(process.env.LOG_LEVEL || 'INFO');
  if (mapLevel >= logLevel && logLevel !== 0) {
    for (const arg of args) {
      if (typeof arg === 'object') {
        console.log(
          `[${new Date(Date.now())
            .toISOString()
            .replace('T', ' ')
            .replace('Z', '')}] [${levelString(level.toUpperCase())}]\t|\n`,
          arg
        );
      } else {
        console.log(
          `[${new Date(Date.now())
            .toISOString()
            .replace('T', ' ')
            .replace('Z', '')}] [${levelString(level.toUpperCase())}]\t|`,
          arg
        );
      }
    }
  }
}

function levelString(level: string): string {
  let retString: string;
  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
    switch (level) {
      case 'FATAL':
        retString = '\u001b[47m\u001b[30m';
        break;
      case 'ERROR':
        retString = '\u001b[31m';
        break;
      case 'WARN':
        retString = '\u001b[33m';
        break;
      case 'INFO':
        retString = '\u001b[34m';
        break;
      case 'DEBUG':
        retString = '\u001b[35m';
        break;
      case 'FINE':
        retString = '\u001b[32m';
        break;
    }
    retString += level + '\u001b[0m';
  } else {
    retString = level;
  }
  return retString;
}
