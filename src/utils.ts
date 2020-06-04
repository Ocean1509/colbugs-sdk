
/**
 *
 *
 * @class Utils
 */
const MAX_ARRAY_INDEX: number = Math.pow(2, 53) - 1;

class Utils {
  getLength: (obj: any) => (string | number) = this.shallowProperty('length');
  constructor() {

  }
  xpath() {

  }
  /**
   * 获取属性值
   * @param {(Record<string | number | symbol, any>)} it
   * @param {string} key
   * @returns {*}
   * @memberof Utils
   */
  tryGet(it: Record<string | number | symbol, any>, key: string): any {
    try {
      return it[key]
    } catch (c) { }
  }
  isNumber(obj: any): boolean {
    return toString.call(obj) === '[object Number]';
  }
  isArrayLike(collection: any): boolean {
    var length = this.getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  }
  shallowProperty(key: string): (obj: null | Record<string | number | symbol, any>) => (undefined | string | number) {
    return function (obj: null | Record<string | number | symbol, any>): undefined | string | number {
      return obj == null ? void 0 : obj[key];
    };
  }
  foreach(target: any, callback:(val, key: string|number) => any) {
    if (this.isArrayLike(target)) {
      var length = target.length;
      for (let i = 0; i < length; i++) {
        callback(target[i], i);
      }
    } else {
      for (const key in target) {
        callback(target[key], key)
      }
    }
  }
}


export default Utils