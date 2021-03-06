interface Document {
  attachEvent(arg0: string, arg1: () => void);
}

interface HTMLElement {
  attachEvent(arg0: string, arg1: () => void);
}
interface Window {
  errorq: any
  colbugs: IColbugs
}
interface ICaughtmsg {
  colSource: boolean;
  colIframe: boolean;
  colNetwork: boolean;
  consoleLevel: string;
}

interface IUncaughtMsg {
  message: string;
  row: number;
  col: number;
  name: string;
  stacktrace: string;
  type: string;
}

interface IPromiseErrorMsg {
  type: string;
  message: string;
  name: string;
  stacktrace: string
}


interface IColbugs {
  errorUrl: string;
  errorSslUrl: string;
  errorNoSslUrl: string;
  sendError: (s?: string) => void;
  colQueues: IEqueueClass
  apiKey: string
}

interface IConsoleParams {
  type: string;
  timeStamp: number;
  level: string;
  getmessage: string,
}

interface IEqueueClass {
  pushStack: (c: Record<string | number, any>) => void
  getStacks: () => Array<any>
}

interface IEventParams {
  type: string,
  url: string,
  title: string,
  tagName: string,
  id: string,
  className: string,
  outerHTML: string,
  timeStamp: number,
  value?: string,
  checked?: boolean
}

interface INetwork {
  method: string
  url: string
  body?: Document | BodyInit | null
  startSend?: number
  endSend?: number
  status?: string | number
  statusText?: string
  type?: string
  name?: string
  fetchType?: string
  responseText?: string
  withCredentials?: boolean
  timeout?: number
}

interface IPerformance {
  dns: number
  tcp: number
  rspendReqstart: number
  rspFetchS: number
  domResolve: number
  domIFetchS: number
  domEndFetchS: number
  redirectCount: number
  type: number;
}

interface XMLHttpRequest {
  sendByError: boolean
}
interface IResourceErrorTarget {
  outerHTML: string
  src: string
  tagName: string
  id: string
  className: string
  name: string
  type: string
  timeStamp: number
}