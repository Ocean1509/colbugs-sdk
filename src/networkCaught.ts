interface INetwork {
    method: string
    url: string
    body?: Document | BodyInit | null
    startSend?: number
    endSend?: number
    status?: string | number
    statusText?: string
    type?: string
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
    constructor(options: IOptions) {
        this.caughtQueues = options.queues
        if (window.XMLHttpRequest) {
            this.wrapXmlhttprequest()
        }
    }
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
                self.addEventListener('timeout', function() {
                    if (self.networkCol && Object.keys(self.networkCol).length) {
                        self.networkCol.statusText = "timeout error"
                        self.networkCol.status = self.status;
                        that.caughtQueues.push(self.networkCol)
                    }
                })
            }
        }
    }
}

export default NetworkCaught