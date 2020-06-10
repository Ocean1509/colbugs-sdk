import Performance from './performance'
import { ISendMsg } from './index'
import ErrorCaught from './errorCaught'

interface IinitOptions {
    callback?: () => {},
    apiKey?: string
    colDev?: boolean;
    colSource?: boolean;
    colPerformance?: boolean;
    colBehavior?: boolean;
    colIframe?: boolean;
    consoleLevel?: string;
}

class Colbugs {

    sendMsg: ISendMsg;
    // callback: 自定义回调处理，不使用上传，使用用户自定义回调
    callback: (rest: any) => void;

    apiKey: string;
    // colDev: 开发环境下是否收集日志
    colDev: boolean;
    // colSource: 是否监控静态资源加载错误
    colSource: boolean;
    // colPerformance: 报错时是否上传页面性能指标
    colPerformance: boolean;
    // colBehavior: 报错时是否上传用户行为
    colBehavior: boolean;
    // colIframe: 是否监控iframe加载错误
    colIframe: boolean;
    // 网站标题
    title: string;
    // 网站url
    url: string;
    // console日志级别
    consoleLevel: string

    constructor() {
        this.init({})
        
        this.domReady()
    }
    /**
     * 初始化参数配置
     * @param param0 
     */
    init(options: IinitOptions) {
        const { callback = null, apiKey = "wyp", colDev = false, colSource = true, colPerformance = true, colBehavior = true, colIframe = true, consoleLevel = "log" } = options
        this.callback = !callback ? (data) => { console.log(data) } : callback;
        this.apiKey = apiKey;
        this.colDev = colDev;
        this.colSource = colSource;
        this.colPerformance = colPerformance;
        this.colBehavior = colBehavior;
        this.colIframe = colIframe
        this.consoleLevel = consoleLevel;
        // 初始化错误监控
        const errorCaught = new ErrorCaught({ colSource, colIframe, consoleLevel });
        
    }
    /**
     * 发送自定义错误
     */
    sendError(message: string = "test"): void {
        this._sendError(message)
    }
    /**
     * 内部调用发送错误
     */
    private _sendError(message: string) :void{
        this.getUserMsg();
        if(message) {
            this.sendMsg.message = message;
        }
        if (this.colPerformance) {
            const p = new Performance()
            this.sendMsg.per = p.performances;
            console.log(this.sendMsg)
        }
        this.sendMsg.time = (new Date).getTime();
        this.sendMsg.title = this.title;
        this.sendMsg.url = this.url;
    }
    /**
     * 获取网站基本信息，用户设备等
     * @memberof Colbugs
     */
    getUserMsg(): void{
        if("navigator" in window) {
            const { language, platform, userAgent } = window.navigator;
            this.sendMsg.language = language;
            this.sendMsg.platform = platform;
            this.sendMsg.userAgent = userAgent;
        }
        if("document" in window) {
            this.sendMsg.title = window.document.title || "";
        }
        this.sendMsg.url = window.location && window.location.href; 
    }
    /**
     * 监控domready事件
     * @memberof domReady
     */
    private domReady():void {
        if(document.addEventListener) {
            document.addEventListener('DOMContentLoaded', () => {
                this.url = window.location.href;
                this.title = document.title;
            })
        } else {
            document.attachEvent('onreadystatechange', () => {
                this.sendMsg.url = window.location.href;
                this.sendMsg.title = document.title;
            })
        }
    }
}


export default Colbugs