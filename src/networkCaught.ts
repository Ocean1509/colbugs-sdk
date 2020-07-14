import SendMsg from './sendMessage'

class NetworkCaught extends SendMsg {
    networkCol: INetwork
    fetchworkCol: INetwork
    constructor() {
        super()
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
    wrapXmlhttprequest(): void {
        const that = this
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
            try {
                if (!this.sendByError) {
                    if (body !== void 0) {
                        this.networkCol.body = body
                    }
                    this.networkCol.startSend = (new Date).getTime()
                    this.networkCol.type = 'httpError'
                    this.networkCol.name = 'XHL'
                    listenNetworkProcess(this)
                }
            } catch (error) {
            }
            return origin_send.apply(this, arguments)
        }
        function listenNetworkProcess(self) {
            if (window.addEventListener) {
                self.addEventListener("readystatechange", function () {
                    if (self.readyState === 4) {
                        if (self.status >= 200 && self.status < 400) {
                            self.networkCol = null;
                        } else {
                            // if(self.networkCol.statusText) return
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
                        that.sendMsg(self.networkCol)
                    }
                }, true)
                self.addEventListener('error', function (e: ProgressEvent) {
                    if (self.networkCol && Object.keys(self.networkCol).length) {
                        self.networkCol.statusText = e.type
                        self.networkCol.status = self.status;
                        that.sendMsg(self.networkCol)
                    }
                })
                self.addEventListener('timeout', function () {
                    if (self.networkCol && Object.keys(self.networkCol).length) {
                        self.networkCol.statusText = "timeout error"
                        self.networkCol.status = self.status;
                        self.networkCol.timeout = self.timeout
                        that.sendMsg(self.networkCol)
                    }
                })
            }
        }
    }
    /**
     * @description caught fetch
     * @memberof NetworkCaught
     */
    wrapFetch(): void {
        const oldFetch = window.fetch;
        const that = this
        window.fetch = function (input: RequestInfo, init?: RequestInit): any {
            that.fetchworkCol = {
                method: init && init.method ? init.method : 'get',
                url: <string>input,
                name: 'Fetch',
                type: 'httpError',
                startSend: (new Date).getTime()
            }
            if (init && init.body) that.fetchworkCol.body = init.body;
            try {
                return oldFetch.apply(this, arguments).then(function (res: Response) {
                    // 请求成功
                    if (res.ok) {
                        that.fetchworkCol = null
                    } else {
                        that.fetchworkCol.status = res.status || '';
                        that.fetchworkCol.statusText = res.statusText || ''
                        that.fetchworkCol.fetchType = res.type;
                        that.fetchworkCol.url = res.url;
                        that.fetchworkCol.endSend = new Date().getTime()
                        that.sendMsg(that.fetchworkCol)
                    }
                    return res
                }, function (error: any) {
                    that.fetchworkCol.status = 0
                    that.fetchworkCol.statusText = error.toString()
                    that.fetchworkCol.endSend = new Date().getTime()
                    that.sendMsg(that.fetchworkCol)
                    throw error
                })

            } catch (error) {

            }
        }
    }
}

export default NetworkCaught