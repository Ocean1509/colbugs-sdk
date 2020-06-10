interface INetwork {
    method: string
    url: string
    body?: Document | BodyInit | null
    startSend?: number
    endSend?: number
    status?: string | number
    statusText?: string
    type?: string
} 
interface IOptions {
    queues: Array<Record<string | number, any>>
}
class NetworkCaught{
    caughtQueues: Array<Record<string | number, any>>
    networkCol: INetwork
    constructor(options: IOptions) {
        this.caughtQueues = options.queues
        if(window.XMLHttpRequest) {
            this.wrapXmlhttprequest()
        }
    }
    wrapXmlhttprequest() {
        let that = this
        const Xml = window.XMLHttpRequest;
        const origin_open = Xml.prototype.open;
        const origin_send = Xml.prototype.send;
        Xml.prototype.open = function(method: string, url: string) {
            console.log(this)
            that.networkCol = {
                method: method,
                url: url
            }
            return origin_open.apply(this, arguments)
        }
        Xml.prototype.send = function(body?: Document | BodyInit | null) {
            if(body !== void 0) {
                that.networkCol.body = body
            }
            that.networkCol.startSend = (new Date).getTime()
            that.networkCol.type = 'xhr'
            try {
                listenNetworkProcess(this)
            } catch {}
            return origin_send.apply(this, arguments)
        }
        function listenNetworkProcess(self: XMLHttpRequest) {
            if(window.addEventListener) {
                self.addEventListener("readystatechange", function() {
                    if(self.readyState === 4) {
                        if(self.status >= 200 && self.status < 400) {
                            console.log('pass')
                            that.networkCol = null;
                        } else {
                            that.networkCol.endSend = (new Date).getTime()
                            that.networkCol.status = self.status || '500'
                            that.networkCol.statusText = self.statusText || 'unknown request error'

                        }
                    }
                }, true)
            }
        }
    }
}   

export default NetworkCaught