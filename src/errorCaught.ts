import Utils from './utils'
enum consoleLever {
    debug,
    log,
    info,
    warn,
    error
}

/**
 * @class ErrorCaught
 * @extends {Utils}
 */
class ErrorCaught extends Utils {
    colSource: boolean;
    colIframe: boolean;
    consoleLevel: string;
    /**
     * 创建实例
     * @param {ICaughtmsg} options
     * @memberof ErrorCaught
     */
    constructor(options: ICaughtmsg) {
        super()
        const { colSource, colIframe, consoleLevel } = options;
        this.colSource = colSource;
        this.colIframe = colIframe;
        this.consoleLevel = consoleLevel;
        this._init()
    }
    /**
     * 初始化
     * @private
     * @memberof ErrorCaught
     */
    private _init(): void {
        if (this.colSource) {
            this.resourceErrorCaught()
        }
        if (this.colIframe) {
            this.iframeErrorCaught()
        }
        this.syncErrorCaught()
        this.promiseErrorCaught()
        this.consoleWatch()
    }
    /**
     * 资源请求出错，400，500类型错误
     * 图片资源，js脚本，css资源
     * colSource选项决定是否捕获
     * 同步error也可以捕获，但是放在window.onerror统一处理
     * @memberof ErrorCaught
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
     * @memberof ErrorCaught
     */
    syncErrorCaught(): void {
        window.onerror = function (msg: string | Event, url: string, row: number, col: number, error: Error) {
            // 跨域脚本，且后台没有设置跨域，将异常往上抛出，交给其他输出处理
            console.log(msg, error)
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
     * @memberof promiseErrorCaught
     */
    promiseErrorCaught(): void {
        if (window.addEventListener) {
            window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
                const reason = this.tryGet(event, 'reason') || {}
                var result: IPromiseErrorMsg = {
                    type: event.type || "unhandledrejection",
                    name: event.type || "unhandledrejection",
                    message: reason.message,
                    stacktrace: reason.stack
                }
                console.log("promiseError======", result)
                event.preventDefault() // 阻止冒泡放在末尾，否则无法拿到堆栈信息
            }, true)
        }
    }
    /**
     * iframe错误捕获 - 跨域无法获取错误
     * @memberof ErrorCaught
     */
    iframeErrorCaught(): void {
    }
    /**
     * @description 重写浏览器console
     * @memberof ErrorCaught
     */
    consoleWatch() {
        const result = []
        if (window.console) {
            let setlevel: string | number;
            let level: number;
            let settingLevel: Array<string | number> = []
            if (setlevel = this.tryGet(consoleLever, this.consoleLevel)) {
                level = this.isNumber(setlevel) ? <number>setlevel : Infinity;
                this.foreach(consoleLever, (val, key) => {
                    if (this.isNumber(val) && val >= level) {
                        settingLevel.push(key)
                    }
                })
                if (this.getLength(settingLevel)) {
                    this.foreach(settingLevel, (type, i) => {
                        const originMethods = console[type]
                        const serialize = this.serialize.bind(this);
                        window.console[type] = function () {
                            try {
                                var params = {
                                    type: "console",
                                    timeStamp: Date.now(),
                                    level: type,
                                    getmessage: serialize(arguments[0]),
                                    url: window.location && window.location.href,
                                    title: document.title
                                }
                                result.push(params)
                            } catch (e) {
                            }
                            originMethods.apply(console, arguments)
                        }
                    })
                }
            }
        }
    }
    xhrRequestCaught() {
        
    }

}

export default ErrorCaught

