function getDataType(val: any): string {
  return Object.prototype.toString.call(val);
}

export function isDate(val: any): val is Date {
  return getDataType(val) === "[object Date]";
}

export function isObject(val: any): val is Record<string, any> {
  return val !== null && typeof val === "object";
}

export function isPlainObject(val: any): val is Record<string, any> {
  if (val === null || getDataType(val) !== "[object Object]") {
    return false;
  }
  const prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

export function assign<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }

  return to as T & U;
}

export function isUndefined(val: any): boolean {
  return typeof val === "undefined";
}

/**
 * 遍历
 * @param {Object|Array} obj
 * @param fn
 */
export function forEach(obj: any, fn: IAppletsRequest.IEmptyFN): void {
  if (typeof obj === "undefined" || obj === null) {
    return;
  }

  let arr = obj;

  // 如果obj是非object类型，例如：number，string等
  if (typeof obj !== "object") {
    arr = [obj];
  }

  if (Array.isArray(arr)) {
    arr.forEach((item, i) => {
      fn.call(null, item, i, obj);
    });
    return;
  }
  Object.keys(arr).forEach((key) => {
    fn.call(null, arr[key], key, arr);
  });
}

export function merge(...objs: Record<string, any>[]): any[] | Record<string, any> {
  if (objs.length === 0) {
    return Object.create(null);
  }

  let result: any = {};
  function assignValue(val: any, key: string | number): void {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (Array.isArray(val)) {
      result[key] = merge(val);
    } else {
      result[key] = val;
    }
  }

  if (Array.isArray(objs[0])) {
    result = [];
  } else {
    result = Object.create(null);
  }

  objs.forEach((obj) => {
    forEach(obj, assignValue);
  });

  return result;
}

export function isNumber(val: any): boolean {
  return typeof val === "number";
}

export function isString(val: any): boolean {
  return typeof val === "string";
}

export function isFunction(val: any): boolean {
  return typeof val === "function";
}
