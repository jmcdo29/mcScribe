/**
 *
 * Logger to contain te level and arguments to display.
 * If the level is greater than or equal to the global log level (default to INFO)
 * then the logger will print to the console
 * @param {string} level - the level of severity of the Log.
 * Levels can be (in descending order) FATAL, ERROR, WARN, INFO (global default), DEBUG, FINE, OFF
 * @param  {...any} args - What you want to log
 */
export declare function consoleLogger(level: string, ...args: any[]): void;
