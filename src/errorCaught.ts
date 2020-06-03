/**
 * 错误处理类 ErrorCaught
 * 处理资源请求错误 resourceErrorCatch
 * 
 */
interface ICaughtmsg {
    colSource: boolean;
}

interface IUncaughtMsg {
    message: string;
    row: number;
    col: number;
    name: string;
    stacktrace: string;
    type: string;
}

interface IPromiseErrorMsg {
    type: string;
    message: string;
    name: string;
    stacktrace: string
}

class ErrorCaught {
    colSource: boolean;
    constructor(options: ICaughtmsg) {
        const { colSource } = options;
        this.colSource = colSource;
        this._init()
    }
    private _init(): void {
        if (this.colSource) {
            this.resourceErrorCaught()
        }
        this.syncErrorCaught()
        this.promiseErrorCaught()
    }
    /**
     * 资源请求出错，400，500类型错误
     * 图片资源，js脚本，css资源
     * colSource选项决定是否捕获
     * 同步error也可以捕获，但是放在window.onerror统一处理
     */
    resourceErrorCaught(): void {
        if (window.addEventListener) {
            window.addEventListener('error', (event) => {
                console.log('-------', event)
                var node: EventTarget = event.target ? event.target : event.srcElement;
                var outerHTML = (node as Element).outerHTML;
                // 图片资源，js脚本，css资源
                if (/img|script|link/.test((node as Element).localName)) {
                    var e = {
                        type: "resourceError",
                        target: {
                            outerHTML: outerHTML,
                            src: node && (node as HTMLImageElement).src,
                            tagName: node && (node as Element).localName,
                            id: node && (node as Element).id,
                            className: node && (node as Element).className,
                            name: node && (node as HTMLImageElement).name,
                            type: node && (node as HTMLLinkElement).type,
                            timeStamp: event.timeStamp
                            // status: ?
                            // statusText ?
                        }
                    }
                    console.log("resourceErrorCaught", e)
                }

                return true
            }, true)
        }
    }
    /**
     * 1.异步错误捕获
     * 2.跨域脚本错误
     *  2.1 cross-origin="anonymous"
     *  2.2 后台允许跨域
     * 3.同步error
     *   同步Error的种类,可以通过Error.name拿到error类型
     *   3.1. Error: 普通类型 new Error 
     *   3.2. RangeError: 数值变量或参数超出其有效范围。例子：var a = new Array(-1); 
     *   3.3. EvalError: 与eval()相关的错误。eval()本身没有正确执行。
     *   3.4. ReferenceError: 引用错误。 例子：console.log(b);
     *   3.5. SyntaxError: 语法错误。例子：var a = ;
     *   3.6. TypeError: 变量或参数不属于有效范围。例子：[1,2].split('.')
     *   3.7. URIError: 给 encodeURI或 decodeURl()传递的参数无效。例子：decodeURI('%2')
     */
    syncErrorCaught(): void {
        window.onerror = function (msg: string | Event, url: string, row: number, col: number, error: Error) {
            // 跨域脚本，且后台没有设置跨域，将异常往上抛出，交给其他输出处理
            if (msg === "Script error.") return false
            var result: IUncaughtMsg = {
                message: error && error.message,
                row: row,
                col: col,
                // fileName: "",
                name: error && error.name || "uncaught error",
                stacktrace: error && error.stack,
                type: "uncaught"
            };
            console.log("syncErrorCaught", result)
            return true
        }
    }
    /**
     * promise 错误捕获
     */
    promiseErrorCaught() {
        window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
            const reason = event.reason || {}
            var result: IPromiseErrorMsg = {
                type: event.type || "unhandledrejection",
                name: event.type || "unhandledrejection",
                message: reason.message,
                stacktrace: reason.stack
            }
            console.log(result)
            let value = this.tryGet(event, 'reason')
            if (!this.isError(value)) {
                try {
                    //   throw Error(e.serialize(value));
                } catch (sequence_values) {
                    value = sequence_values;
                }
                event.preventDefault() // 阻止冒泡放在末尾，否则无法拿到堆栈信息
            }
        }, true)
    }
    tryGet(it, key): any {
        try {
            return it[key];
        } catch (c) {
        }
    }
    isObject(o): boolean {
        return Object.prototype.toString.call(o) === 'object'
    }
    isString(o): boolean {
        return "string" === typeof o
    }
    toString(func) {
        return Object.prototype.toString.call(func);
    }
    isError(obj) {
        if (!this.isObject(obj)) {
            return false;
        }
        var value = this.toString(obj);
        return "[object Error]" === value || "[object DOMException]" === value || this.isString(obj.name) && this.isString(obj.message);
    }
}

export default ErrorCaught

