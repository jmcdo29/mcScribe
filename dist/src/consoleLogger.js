"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Logger to contain te level and arguments to display. If the level is greater than or equal to the global log level (default to INFO) then the logger will print to the console
 * @param {string} level - the level of severity of the Log. Levels can be (in descending order) FATAL, ERROR, WARN, INFO (global default), DEBUG, FINE, OFF
 * @param  {...any} args - What you want to log
 */
function consoleLogger(level, ...args) {
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
                console.log(`[${new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '')}] [${level.toUpperCase()}] \t|\n`, arg);
            }
            else {
                console.log(`[${new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', '')}] [${level.toUpperCase()}] \t|`, arg);
            }
        }
    }
}
exports.consoleLogger = consoleLogger;
;
