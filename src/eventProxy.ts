/**
 * @description 事件代理类
 * @class EventProxy
 */
import BugsUtils from './utils'

interface IOptions {
    utils: BugsUtils.IUtils
    el: Document
}

class EventProxy{
    utils: BugsUtils.IUtils
    el: Document
    constructor(options: IOptions) {
        this.utils = options.utils
        this.el = options.el;
        this.init()
    }
    init(): void {
        // 页面点击事件
        const d = this.utils.bind(this.onDocumentClick, this)
        // input失去焦点事件
        const i = this.utils.bind(this.onInputChanged, this)
        if (this.el.addEventListener) {
            this.el.addEventListener("click", d, true)
            this.el.addEventListener("blur", i, true)
        } else {
            this.el.attachEvent("onclick", d)
            this.el.attachEvent("blur", i)
        }
    }
    /**
     * @description 文档点击：button,a标签点击轨迹上报，input(radio,checkbox)选项上报
     * @param {MouseEvent} e
     * @memberof EventProxy
     */
    onDocumentClick(e: MouseEvent): void {
        try {
            const elem = this.getElementFromEvent(e) as Element
            if (elem && elem.tagName) {
                // 记录button, a, 以及提交按钮相关的input
                if (this.isImportantElement(elem, 'button') || this.isImportantElement(elem, "a") || this.isImportantElement(elem, "input", ["button", "submit"])) {
                    this.recodeQueues(elem, "click")
                } else if (this.isImportantElement(elem, "input", ["checkbox", "radio"])) {
                    // radio checkbox 需要记录所选值
                    this.recodeQueues(elem, "click", (elem as HTMLInputElement).value, (elem as HTMLInputElement).checked)
                }
            }
        } catch { }
    }
    /**
     * @description 失去焦点时获取input输入值 select选中值，上报
     * @param {MouseEvent} e
     * @memberof EventProxy
     */
    onInputChanged(e: MouseEvent): void {
        try {
            const elem = this.getElementFromEvent(e) as Element
            if (elem && elem.tagName) {
                // 记录textarea
                if (this.isImportantElement(elem, "textarea")) {
                    this.recodeQueues(elem, "textarea", (elem as HTMLTextAreaElement).value)
                }
                // 记录失去焦点的input
                if (this.isImportantElement(elem, "input", ["password", "text", "file", "imgage"])) {
                    let value = ""
                    // 过滤密码
                    if (this.getElementType(elem) === "password") {
                        value = "******"
                    } else {
                        value = (elem as HTMLInputElement).value
                    }
                    this.recodeQueues(elem, "input", value)
                }
                // select
                if (this.isImportantElement(elem, "select") && (elem as HTMLSelectElement).options && (elem as HTMLSelectElement).options.length) {
                    if ((elem as HTMLSelectElement).selectedIndex && (elem as HTMLSelectElement).options[(elem as HTMLSelectElement).selectedIndex]) {
                        let value = (elem as HTMLSelectElement).options[(elem as HTMLSelectElement).selectedIndex].value;
                        this.recodeQueues(elem, "select", value)
                    }
                }
            }
        } catch { }
    }
    /**
     * @description 记录事件
     * @param {Element} elem
     * @param {string} type
     * @param {string} [value]
     * @param {boolean} [ischecked]
     * @memberof EventProxy
     */
    recodeQueues(elem: Element, type: string, value?: string, ischecked?: boolean): void {
        let outerHtml: string = (elem && elem.outerHTML) || "";
        if (outerHtml && outerHtml.length > 200) {
            outerHtml = outerHtml.slice(0, 200);
        }
        const params = {
            type: type,
            url: window.location && window.location.href,
            title: document.title,
            tagName: elem && elem.tagName && elem.tagName.toLowerCase(),
            id: (elem && elem.id) || "",
            className: (elem && elem.className) || "",
            outerHTML: outerHtml,
            timeStamp: Date.now(),
        } as IEventParams
        if (value !== void 0) {
            if (value.length > 200) value = value.slice(0, 200)
            params.value = value;
        }
        if (ischecked !== void 0) params.checked = ischecked;
        this.pushEqueue(params)
    }
    /**
     * @description
     * @param {MouseEvent} e
     * @returns {(Element | EventTarget | null)}
     * @memberof EventProxy
     */
    getElementFromEvent(e: MouseEvent): Element | EventTarget | null {
        return e.target || this.el.elementFromPoint(e.clientX, e.clientY);
    }
    /**
     * @description
     * @param {Element} elem
     * @param {string} eleTagName
     * @param {Array<string>} [types]
     * @returns {boolean}
     * @memberof EventProxy
     */
    isImportantElement(elem: Element, eleTagName: string, types?: Array<string>): boolean {
        let tagName = elem.tagName;
        if (tagName.toLowerCase() !== eleTagName) return false
        if (!types) return true
        const element = this.getElementType(elem)
        for (let i = 0; i < types.length; i++) {
            if (types[i] === element) {
                return true
            }
        }
        return false;
    }
    /**
     * @description
     * @param {Element} element
     * @returns {string}
     * @memberof EventProxy
     */
    getElementType(element: Element): string {
        return (element.getAttribute("type") || "").toLowerCase();
    }
    /**
     * @description
     * @private
     * @param {IEventParams} content
     * @memberof EventProxy
     */
    private pushEqueue(content: IEventParams): void {
        if(window && window.colbugs && window.colbugs.colQueues){
            window.colbugs.colQueues.pushStack(content)
        }
    }
}

export default EventProxy