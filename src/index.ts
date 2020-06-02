import colbugs from './colbugs'

interface ISendMsg {
  per?: IPerformance;
  language?: string;
  platform?: string; // 
  userAgent?: string;
  url: string;
  time: number;
  title?: string;
  message: string;
}

interface IPerformance {
  dns: number;
  tcp: number;
  rspendReqstart: number;
  rspFetchS: number;
  domResolve: number;
  domIFetchS: number;
  domEndFetchS: number;
  redirectCount: number;
  type: number;
}

(window as any).colbugs = new colbugs();


export { IPerformance, ISendMsg }