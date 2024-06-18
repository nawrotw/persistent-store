// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
export const pick2 = <T extends object, U extends keyof T>(object: T, keys: U[]): Partial<T> => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as any);
}

export const isEmpty = (obj: any) =>
  [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;


export const debounce = <T extends (...args: any) => any>(func: T, wait: number, immediate?: boolean): T => {
  let timeout: number | undefined;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = undefined;
      if (!immediate) func(...args);
    }, wait);
  }) as T;
}

export const isFunction = (fn: unknown): fn is Function => {
  return typeof fn === "function"
}
