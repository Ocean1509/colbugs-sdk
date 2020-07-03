import NetworkCaught from './networkCaught'
import BugsUtils from './utils'
import EventProxy from './Eventproxy'
import SendMsg from './sendMessage'

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
class ErrorCaught extends SendMsg {
    colSource: boolean;
    colIframe: boolean;
    colnums: number;
    consoleLevel: string;
    // 工具类
    utils: BugsUtils.IUtils
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
        // 初始化工具类
        this._initUtils()
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
            // this.iframeErrorCaught()
        }
        this.syncErrorCaught()
        this.promiseErrorCaught()
        this.consoleWatch()
        // 全局事件代理
        if(document) {
            new EventProxy({ utils: this.utils, el: document })
        }
        // 网络请求异常监控
        new NetworkCaught()
    }
    /**
     * @description 初始化工具类
     * @private
     * @memberof ErrorCaught
     */
    private _initUtils() {
        this.utils = new BugsUtils.Utils()
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
                const node: EventTarget = event.target ? event.target : event.srcElement;
                const outerHTML = (node as Element).outerHTML;
                // 图片资源，js脚本，css资源
                if (/img|script|link/.test((node as Element).localName)) {
                    const e = {
                        type: "ResourceError",
                        name: "ResourceError",
                        message: `resourceError: ${node && (node as HTMLImageElement).src}`,
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
                        } as IResourceErrorTarget
                    }
                    this.sendMsg(e)
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
        window.onerror = (msg: string | Event, url: string, row: number, col: number, error: Error) => {
            // 跨域脚本，且后台没有设置跨域，将异常往上抛出，交给其他输出处理
            if (msg === "Script error.") return false
            const result: IUncaughtMsg = {
                message: error && error.message,
                row: row,
                col: col,
                // fileName: "",
                name: error && error.name || "uncaught error",
                stacktrace: error && error.stack,
                type: "Uncaught"
            };
            this.sendMsg(result)
            // this.caughtQueues.push(result)
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
                const reason = this.utils.tryGet(event, 'reason') || {}
                const result: IPromiseErrorMsg = {
                    type: "Unhandledrejection",
                    name: event.type || "unhandledrejection",
                    message: (typeof reason !== 'string') ? reason.message : reason,
                    stacktrace: reason.stack
                }
                this.sendMsg(result)
                // this.caughtQueues.push(result)
                event.preventDefault() // 阻止冒泡放在末尾，否则无法拿到堆栈信息
            }, true)
        }
    }
    /**
     * iframe错误捕获 - 跨域无法获取错误
     * @memberof ErrorCaught
     */
    // iframeErrorCaught(): void {}
    /**
     * @description 重写浏览器console
     * @memberof ErrorCaught
     */
    consoleWatch(): void {
        if (window.console) {
            let that = this
            let setlevel: string | number;
            let level: number;
            const settingLevel: Array<string | number> = []
            if (setlevel = this.utils.tryGet(consoleLever, this.consoleLevel)) {
                level = this.utils.isNumber(setlevel) ? <number>setlevel : Infinity;
                this.utils.foreach(consoleLever, (val, key) => {
                    if (this.utils.isNumber(val) && val >= level) {
                        settingLevel.push(key)
                    }
                })
                if (this.utils.getLength(settingLevel)) {
                    this.utils.foreach(settingLevel, (type) => {
                        const originMethods = console[type]
                        const serialize = this.utils.serialize.bind(this.utils);
                        // alert(serialize)
                        window.console[type] = function () {
                            try {
                                const params: IConsoleParams = {
                                    type: "console",
                                    timeStamp: Date.now(),
                                    level: type,
                                    getmessage: serialize(arguments[0]),
                                }
                                that.pushEqueue(params)
                                // this.caughtQueues.push(params)
                            } catch (e) {
                                alert(e)
                            }
                            return originMethods.apply(console, arguments)
                        }
                    })
                }
            }
        }
    }
    /**
     * @description
     * @private
     * @param {IEventParams} content
     * @memberof EventProxy
     */
    private pushEqueue(content: IConsoleParams): void {
        if(window && window.colbugs && window.colbugs.colQueues){
            window.colbugs.colQueues.pushStack(content)
        }
    }
}

export default ErrorCaught

