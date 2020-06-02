interface ICaughtmsg {
    colSource: boolean;
}
class ErrorCaught{
    constructor(options: ICaughtmsg) {
        this._init()
    }
    private _init(): void {
        this.resourceErrorCatch()
    }
    /**
     * 资源请求出错，400，500类型错误
     */
    resourceErrorCatch(): void {
        if(window.addEventListener) {
            window.addEventListener('error', (event) => {
                var node: EventTarget = event.target ? event.target : event.srcElement;
                var outerHTML = (node as Element).outerHTML;
                // var e = {
                //     type: "resourceError",
                //     target: {
                //         outerHTML: outerHTML,
                //         src: node && (node).src,
                //         tagName: node && (node as Element).tagName,
                //         id: node && (node as Element).id,
                //         className: node && node.className,
                //         name: node && node.name,
                //         type: node && (node as HTMLLinkElement).type,
                //         timeStamp: event.timeStamp
                //     }
                // }
                // console.log(e.src)
                return true
            }, true)
        }
    }
    // 异常捕获
}

export default ErrorCaught