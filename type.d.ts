interface Document {
  attachEvent(arg0: string, arg1: () => void);
}

interface Window {
  result: Array<any>
}
interface ICaughtmsg {
  colSource: boolean;
  colIframe: boolean;
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
