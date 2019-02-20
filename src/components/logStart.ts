/**
 * A function to set the initial API result object. By default the object starts with the return code as 0 and the errorList as a blank array. These can be modified to change middleware functionality later in the execution chain.
 * @param {number} returnCode The initial return code
 * @param {string[]} errorList the initial error list
 */
export function logStart(returnCode?: number, errorList?: string[]) {
  return function(req: any, res: any, next: any) {
    req._result = {};
    req._result.returnCode = returnCode || 0;
    req._result.errorList = errorList || [];
    req._start = Date.now();
    next();
  };
};
