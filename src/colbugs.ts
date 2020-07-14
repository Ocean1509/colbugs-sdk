import ErrorCaught from './errorCaught'
import SendMsg from './sendMessage'
import { createEqueue } from './equeue'
interface IinitOptions {
    callback?: () => Record<string, unknown>,
    apiKey?: string
    colDev?: boolean;
    colSource?: boolean;
    colPerformance?: boolean;
    colBehavior?: boolean;
    colIframe?: boolean;
    consoleLevel?: string;
    colnums?: number;
    errorSslUrl? : string;
    errorNoSslUrl?: string;
}

export default class Colbugs extends SendMsg implements IColbugs {

    // callback: 自定义回调处理，不使用上传，使用用户自定义回调
    callback: (rest: unknown) => void;

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
    consoleLevel: string;
    // 错误栈收集数目
    colnums: number;
    // 错误栈队列
    colQueues: IEqueueClass;
    // colbugs 版本号
    static version = "1.0.0"
    // 采集服务url
    // img
    errorUrl: string = "http://localhost:3002/fault.gif"
    // https
    errorSslUrl: string = "https://"
    // http
    errorNoSslUrl: string = "http://192.168.0.110:8083/report"



    constructor() {
        super()
    }
    /**
     * @description 初始化参数配置
     * @param {IinitOptions} options
     * @memberof Colbugs
     */
    init(options: IinitOptions): void {
        const { callback = null, apiKey = "wyp", colDev = false, colSource = true, colPerformance = true, colBehavior = true, colIframe = true, consoleLevel = "log", colnums = 10 } = options
        this.callback = !callback ? (data) => { console.log(data) } : callback;
        this.apiKey = apiKey;
        this.colDev = colDev;
        this.colSource = colSource;
        this.colPerformance = colPerformance;
        this.colBehavior = colBehavior;
        this.colIframe = colIframe
        this.consoleLevel = consoleLevel;
        this.colnums = colnums;
        if(options.errorSslUrl) {
            this.errorSslUrl = options.errorSslUrl;
        }
        if(options.errorSslUrl) {
            this.errorSslUrl = options.errorSslUrl;
        }
        // 初始化错误监控
        new ErrorCaught({ colSource, colIframe, consoleLevel });
        // 初始化错误栈队列
        this.initqueue()
    }
    private initqueue(): void {
        this.colQueues = createEqueue(this.colnums);
    }
    /**
     * 发送自定义错误
     */
    sendError(message = "test"): void {
        if(typeof message !== 'string') return;
        let type = "Customize"
        this.sendMsg(message, type)
    }
}
