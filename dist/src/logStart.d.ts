/**
 * A function to set the initial API result object. By default the object starts with the return code as 0 and the errorList as a blank array. These can be modified to change middleware functionality later in the execution chain.
 * @param {number} returnCode The initial return code
 * @param {string[]} errorList the initial error list
 */
export declare function logStart(returnCode?: number, errorList?: string[]): (req: any, res: any, next: any) => void;
