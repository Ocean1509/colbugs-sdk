namespace BugsUtils {
  const MAX_ARRAY_INDEX: number = Math.pow(2, 53) - 1;
  /**
   * @export
   * @interface IUtils
   */
  export interface IUtils {
    tryGet(it: Record<string | number | symbol, any>, key: string): any
    isNumber(obj: any): boolean
    isString(obj: any): boolean
    isBoolean(obj: any): boolean
    isSymbol(obj: any): boolean
    isFunction(obj: any): boolean
    isError(obj: any): boolean
    isObject(obj: any): boolean
    isElement(obj: any): boolean
    isArrayLike(collection: any): boolean
    shallowProperty(key: string): (obj: null | Record<string | number | symbol, any>) => (undefined | string | number)
    foreach(target: any, callback: (val: any, key: string | number) => any): void
    elementToString(obj: HTMLElement): string
    serialize(val: any): string
    getLength: (obj: any) => (string | number)
  }
  /**
 * @description
 * @class Utils
 */
  export class Utils implements IUtils {
    getLength: (obj: any) => (string | number) = this.shallowProperty('length');
    constructor() { }
    // xpath() {

    // }
    /**
     * @description 获取属性值
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
    /**
     * @param {*} obj
     * @returns {boolean}
     * @memberof Utils
     */
    isNumber(obj: any): boolean {
      return Object.prototype.toString.call(obj) === '[object Number]';
    }
    /**
     * @param {*} obj
     * @returns {boolean}
     * @memberof Utils
     */
    isString(obj: any): boolean {
      return Object.prototype.toString.call(obj) === '[object String]'
    }
    /**
     * @param {*} obj
     * @returns {boolean}
     * @memberof Utils
     */
    isSymbol(obj: any): boolean {
      return typeof obj === 'symbol'
    }
    /**
     * @param {*} obj
     * @returns {boolean}
     * @memberof Utils
     */
    isBoolean(obj: any): boolean {
      return Object.prototype.toString.call(obj) === '[object String]'
    }
    /**
     * @param {*} obj
     * @returns {boolean}
     * @memberof Utils
     */
    isFunction(obj: any): boolean {
      return typeof obj === 'function'
    }
    /**
     * @param {*} obj
     * @returns {boolean}
     * @memberof Utils
     */
    isError(obj: any): boolean {
      if (!this.isObject(obj)) {
        return false;
      }
      var value = Object.prototype.toString.call(obj);
      return value === "[object Error]" || value === "[object DOMException]" || this.isString(obj.name) && this.isString(obj.message);
    }
    /**
     * @param {*} obj
     * @returns {boolean}
     * @memberof Utils
     */
    isObject(obj: any): boolean {
      return typeof obj === 'object' && obj !== null
    }
    /**
     * @param {*} obj
     * @returns {boolean}
     * @memberof Utils
     */
    isElement(obj: any): boolean {
      return this.isObject(obj) && obj.nodeType === 1;
    }
    /**
     * @param {*} collection
     * @returns {boolean}
     * @memberof Utils
     */
    isArrayLike(collection: any): boolean {
      var length = this.getLength(collection);
      return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    }
    /**
     * @description shallowProperty
     * @param {string} key
     * @returns {((obj: null | Record<string | number | symbol, any>) => (undefined | string | number))}
     * @memberof Utils
     */
    shallowProperty(key: string): (obj: null | Record<string | number | symbol, any>) => (undefined | string | number) {
      return function (obj: null | Record<string | number | symbol, any>): undefined | string | number {
        return obj == null ? void 0 : obj[key];
      };
    }
    /**
     * @description foreach实现
     * @param {*} target
     * @param {((val, key: string|number) => any)} callback
     * @memberof Utils
     */
    foreach(target: any, callback: (val, key: string | number) => any): void {
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
    /**
     * @param {HTMLElement} obj
     * @returns {string}
     * @memberof Utils
     */
    elementToString(obj: HTMLElement): string {
      let elementstring = '<' + obj.tagName.toLowerCase()
      const attributes = obj.attributes;
      for (let i = 0; i < attributes.length; i++) {
        elementstring += (" " + attributes[i].name + '="' + attributes[i].value + '"')
      }
      return elementstring + '>'
    }
    /**
     * @description console消息序列化
     * @param {*} val
     * @returns {string}
     * @memberof Utils
     */
    serialize(val: any): string {
      if (val === '') {
        return "empty message"
      }
      if (val === void 0) {
        return "undefined message"
      }
      if (this.isBoolean(val) || this.isString(val) || this.isNumber(val) || this.isFunction(val)) {
        return String(val)
      }
      if (this.isElement(val)) {
        return this.elementToString(val)
      }
      if (this.isSymbol(val)) {
        return Symbol.prototype.toString.call(val)
      }
      if (this.isError(val)) {
        val = {
          name: val.name,
          message: val.message,
          stack: val.stack
        }

      }
      let s = ""
      try {
        s = JSON.stringify(val)
      } catch (error) {
        s = `无法序列化的console: ${error}`
      }
      return s
    }
  }
}

export default BugsUtils