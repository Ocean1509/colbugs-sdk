import getPerformance from './performance'
import BugsUtils from './utils'

interface IMsg {
    title?: string
    url?: string
    language?: string // 语言
    platform?: string // 操作系统
    userAgent?: string // 浏览器引擎
    queues?: Array<any> // 用户行为堆栈
    performance?: IPerformance // 页面性能
    type?: string // 错误类型
    message?: string // 错误信息
    target?: IResourceErrorTarget // resource error详细错误
    stacktrace?: string // 错误堆栈信息
    name?: string
    row?: number
    col?: number
    statusText?: string
    status?: string | number
    withCredentials?: boolean
    timeout?: number
    body?: Document | BodyInit | null
    method?: string
    startSend?: number
    fetchType?: string
    endSend?: number
    apiKey?: string
}
interface ISendMsg {
    sendMsg: (m, t?: string) => void
}
class SendMsg implements ISendMsg {
    msg: IMsg
    utils: BugsUtils.IUtils
    constructor() {
        this.resetMsg()
    }
    resetMsg() {
        this.msg = {
            title: '',
            url: '',
            type: '',
            message: '',
            apiKey: "",
        }
    }
    sendMsg<T extends IMsg>(m: (string | T), t?: string): void {
        this.send(m, t)
    }
    isHttpsProtocol(): boolean {
        if (window.location && window.location.protocol) {
            return window.location.protocol.indexOf('https') !== -1 ? true : false
        }
        return false;
    }
    private send<T extends IMsg>(msg: (string | T), type: string): void {
        if (window && window.colbugs) {
            // let imgUrl = window.colbugs && window.colbugs.errorUrl
            let errorurl = this.isHttpsProtocol() ? window.colbugs.errorSslUrl : window.colbugs.errorNoSslUrl;
            // 用户行为
            this.getErrorQueue()
            // 用户设备
            this.getUserMsg()
            // 获取性能指标
            const pers: IPerformance = getPerformance()
            if (typeof msg === 'string') {
                this.msg.message = msg;
                this.msg.type = type
                this.msg.performance = pers
                this.msg.stacktrace = function () {
                    var s: string;
                    try {
                        throw new Error("");
                    } catch (local) {
                        s = local.stack;
                    }
                    if (s) {
                        return "generated-stack:\n" + (s = s.replace(/(.*?)colbugs(.*?)\.js(.*)\n?/gm, "")).replace(/^Error\n/g, "");
                    }
                }();
            } else {
                this.msg = {
                    performance: pers,
                    ...this.msg,
                    ...msg
                }
            }
            // 获取api key
            this.msg.apiKey = this.getApiKey()
            // 测试发送
            // TODO to buffer
            // let blobs = new Blob([JSON.stringify(msg)], {type : 'application/json'});
            // const bodyBuffer = this.utils.stringToUint(JSON.stringify(msg));
            // const xhr = new XMLHttpRequest();
            // xhr.sendByError = true;
            // xhr.open("POST", errorurl)
            // xhr.setRequestHeader("Content-Type", "application/octet-stream")
            // xhr.send(bodyBuffer)
            if (navigator.sendBeacon) {
                navigator.sendBeacon(errorurl, JSON.stringify(this.msg))
            } else {
                const xhr = new XMLHttpRequest();
                xhr.sendByError = true;
                xhr.open("POST", errorurl)
                xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8")
                xhr.send(JSON.stringify(this.msg))
            }
            // reset
            this.resetMsg()
        }
    }
    /**
     * 获取网站基本信息，用户设备等
     * @memberof Colbugs
     */
    getUserMsg(): void {
        if ("navigator" in window) {
            const { language, platform, userAgent } = window.navigator;
            this.msg.language = language;
            this.msg.platform = platform;
            this.msg.userAgent = userAgent;
        }
        if ("document" in window) {
            this.msg.title = window.document.title || "";
        }
        this.msg.url = window.location && window.location.href;
    }
    /**
     * @description 获取用户行为
     * @memberof SendMsg
     */
    getErrorQueue(): void {
        if (window && window.colbugs) {
            this.msg.queues = window.colbugs.colQueues.getStacks();
        }
    }
    /**
     * @description 获取apikey
     * @returns {string}
     * @memberof SendMsg
     */
    getApiKey(): string {
        if (window.colbugs) {
            return window.colbugs.apiKey
        }
        return ""
    }
}
export default SendMsg