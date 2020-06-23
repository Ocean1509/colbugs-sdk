interface ISendMsg {

}
class SendMsg implements ISendMsg {
    msg: any
    constructor() { 
        this.msg = {}
    }
    sendMsg(m: any, t?: string) {

        this.send(m, t)
    }
    isHttpsProtocol(): boolean {
        if (window.location && window.location.protocol) {
            return window.location.protocol.indexOf('https') !== -1 ? true : false
        }
        return false;
    }
    private send(msg, type: string) {
        if (window && window.colbugs) {
            let imgUrl = window.colbugs && window.colbugs.errorUrl
            let errorurl = this.isHttpsProtocol() ? window.colbugs.errorSslUrl : window.colbugs.errorNoSslUrl;

        }
    }
    /**
     * 获取网站基本信息，用户设备等
     * @memberof Colbugs
     */
    getUserMsg(): void{
        if("navigator" in window) {
            const { language, platform, userAgent } = window.navigator;
            this.msg.language = language;
            this.msg.platform = platform;
            this.msg.userAgent = userAgent;
        }
        if("document" in window) {
            this.msg.title = window.document.title || "";
        }
        this.msg.url = window.location && window.location.href; 
    }
    getErrorQueue() {
        if(window && window.colbugs) {
            window.colbugs.colQueues
        }
    }

}
export default SendMsg