/**
 * 错误处理类 ErrorCaught
 * 处理资源请求错误 resourceErrorCatch
 * 
 */
interface ICaughtmsg {
    colSource: boolean;
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
            this.resourceErrorCatch()
        }
        this.syncErrorCatch()
    }
    /**
     * 资源请求出错，400，500类型错误
     * 图片资源，js脚本，css资源
     * colSource选项决定是否捕获
     */
    resourceErrorCatch(): void {
        if (window.addEventListener) {
            window.addEventListener('error', (event) => {
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
                    console.log(e)
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
     */
    syncErrorCatch(): void {
        window.onerror = function (msg: string | Event, url: string, row: number, col: number, error: Error) {
            console.log(msg, url, row, col, error)
            console.log(arguments)
            console.log(arguments.callee)
            // console.log(arguments.callee.caller)
            // console.log(arguments.callee.caller.caller)
            var result = {
                message: error && error.message,
                row: row,
                col: col,
                // fileName: "",
                name: error && error.name || "uncaught error",
                stacktrace: error && error.stack,
                type: "uncaught"
            };
            console.log(result)
            return true
        }
    }
}

export default ErrorCaught

