class Performance {
    performances: IPerformance;
    constructor() {
        this.performances = {
            dns: 0,
            tcp: 0,
            rspendReqstart: 0,
            rspFetchS: 0,
            domResolve: 0,
            domIFetchS: 0,
            domEndFetchS: 0,
            redirectCount: 0,
            type: 0
        }
        this._performance()
    }
    _performance(): void {
        // 脚本最终会放在head，dom解析的过程，除了开始解析阶段，其他阶段的时间都无法准确获取。
        if (!("performance" in window)) return
        const perTime = window.performance.timing;
        const performances = {
            dns: perTime.domainLookupEnd - perTime.domainLookupStart, //dns域名解析的耗时
            tcp: perTime.connectEnd - perTime.connectStart, // TCP的耗时
            rspendReqstart: perTime.responseEnd - perTime.requestStart, // 请求耗时,一个TTI时间
            rspFetchS: perTime.responseEnd - perTime.fetchStart, // 理论白屏时间，发出请求到收到响应
            domResolve: perTime.domInteractive - perTime.responseEnd,// dom解析时间
            domIFetchS: perTime.domInteractive - perTime.fetchStart,// 首次可交互时间
            domEndFetchS: perTime.domContentLoadedEventEnd - perTime.fetchStart//DOM Ready
        }

        /**
         * performance.navigation
         * 有两个属性redirectCount, type
         * type类型代表
         * 0	TYPE_NAVIGATE      - 链接，例如a
         * 1	TYPE_RELOAD        - 浏览器reload
         * 2	TYPE_BACK_FORWARD  - 浏览器前进后退
         * 255	TYPE_RESERVED      - 其他方式
         */
        const navigation = performance.navigation;

        this.performances = {
            ...performances,
            ...navigation
        }

    }
}

export default Performance