interface INetwork {
    method: string
    url: string
    body?: Document | BodyInit | null
    startSend?: number
    endSend?: number
    status?: string | number
    statusText?: string
    type?: string
    fetchType?: string
    responseText?: string
    withCredentials?: boolean
    timeout?: number
}
interface IOptions {
    queues: Array<Record<string | number, any>>
}
class NetworkCaught {
    caughtQueues: Array<Record<string | number, any>>
    networkCol: INetwork
    fetchworkCol: INetwork
    constructor(options: IOptions) {
        this.caughtQueues = options.queues
        if (window.XMLHttpRequest) {
            this.wrapXmlhttprequest()
        }
        if (window.fetch) {
            this.wrapFetch()
        }
    }
    /**
     * @description caught xmlhttprequest
     * @memberof NetworkCaught
     */
    wrapXmlhttprequest() {
        let that = this
        const Xml = window.XMLHttpRequest;
        const origin_open = Xml.prototype.open;
        const origin_send = Xml.prototype.send;
        Xml.prototype.open = function (method: string, url: string) {
            this.networkCol = {
                method: method,
                url: url
            }
            return origin_open.apply(this, arguments)
        }
        Xml.prototype.send = function (body?: Document | BodyInit | null) {
            if (body !== void 0) {
                this.networkCol.body = body
            }
            this.networkCol.startSend = (new Date).getTime()
            this.networkCol.type = 'xhr'
            try {
                listenNetworkProcess(this)
            } catch { }
            return origin_send.apply(this, arguments)
        }
        function listenNetworkProcess(self) {
            if (window.addEventListener) {
                self.addEventListener("readystatechange", function () {
                    if (self.readyState === 4) {
                        if (self.status >= 200 && self.status < 400) {
                            self.networkCol = null;
                        } else {
                            self.networkCol.endSend = (new Date).getTime()
                            self.networkCol.status = self.status || '500'
                            self.networkCol.statusText = self.statusText || 'unknown request error'
                        }
                    }
                }, true)
                self.addEventListener('load', function () {
                    // 支持onload事件的还拥有timeout，withCredentials两个属性
                    if (self.networkCol && Object.keys(self.networkCol).length) {
                        self.networkCol.withCredentials = self.withCredentials
                        self.networkCol.timeout = self.timeout
                        that.caughtQueues.push(self.networkCol)
                    }
                }, true)
                self.addEventListener('error', function (e: ProgressEvent) {
                    if (self.networkCol && Object.keys(self.networkCol).length) {
                        self.networkCol.statusText = e.type
                        self.networkCol.status = self.status;
                        that.caughtQueues.push(self.networkCol)
                    }
                })
                self.addEventListener('timeout', function () {
                    if (self.networkCol && Object.keys(self.networkCol).length) {
                        self.networkCol.statusText = "timeout error"
                        self.networkCol.status = self.status;
                        that.caughtQueues.push(self.networkCol)
                    }
                })
            }
        }
    }
    /**
     * @description caught fetch
     * @memberof NetworkCaught
     */
    wrapFetch() {
        const oldFetch = window.fetch;
        let that = this
        window.fetch = function(input: RequestInfo, init?: RequestInit): any  {
            that.fetchworkCol = {
                method: init && init.method ? init.method : 'get',
                url: <string>input,
                type: 'fetch',
                startSend: (new Date).getTime()
            }
            if(init && init.body) that.fetchworkCol.body = init.body;
            try {
                return oldFetch.apply(this, arguments).then(function(res: Response) {
                    // 请求成功
                    if(res.ok) {
                        that.fetchworkCol = null
                    } else {
                        that.fetchworkCol.status = res.status || '';
                        that.fetchworkCol.statusText = res.statusText || ''
                        that.fetchworkCol.fetchType = res.type;
                        that.fetchworkCol.url = res.url;
                        that.fetchworkCol.endSend = new Date().getTime()
                    }
                    return res
                }, function(error: any) {
                    that.fetchworkCol.status = 0
                    that.fetchworkCol.statusText = error.toString()
                    that.fetchworkCol.endSend = new Date().getTime()
                    throw error
                })

            } catch (error) {

            }
        }
    }
}

export default NetworkCaught