步骤
1. 网站性能
2. 错误
3. 错误还原 错误堆栈 留十个  [XPATH] body/div[3]/ul/li/  -> buffer -> 后端 -> 自动化测试ui 十张图   ->   nodegif

分析sourcemap

传递方式
img
fetch报错立刻发送
navigator.sendBeacon 不忙的时候传递，性能相关


4. 后端接收
  1. 分析sourcemap
  2. 数据可视化平台
  3. 日志，node分析日志，过滤脏数据



/base.js  负责发送  降级处理   navigator.sendBeason
/pageperformance.js 负责性能相关
/errorcatch.js 异常捕获



// 行为捕获

sentry


系统设计
数据收集支撑系统

监控面板
两者最好分开，小系统合在一起要注意耦合性





数据模块:
各监控模块：获取需要上报的具体内容信息（EventData或ErrorData）
  DNS劫持检测
  资源完整性检查
  资源加载错误
  API监控
  全局错误
  用户交互
  自定义上报




数据处理模块：将环境数据和各内容数据，处理成接口对应的格式，并返回标准格式数据


上报模块：获取标准数据后发送到node层。上报模块先查看本地缓存数据，将本地数据和新产生的数据一起上报，若上报失败则存入localStorage


事件监听都在捕获阶段进行，防止事件冒泡被阻止


init初始化环境参数


xpath 要为整个网站做代理


支持单页面 ？ hash history


网页ajax请求基本基于  xmlhttprequest 和  fetch，需要重写两者的方法 complete


debugger模式，所有请求，input内容都上报？



数据上报需要考虑到东西：
  1. 跨域处理
  2. 页面销毁后，如果将未上传到埋点数据成功上传。
  3. 基于流发送

img好处：
1. src 天然不存在跨域问题
2. 只上报不接受响应
缺点： 
3. 对大小有限制
4. 页面卸载过程，若存在数据未发送对情况，会将对应对数据发送完，再执行页面卸载，体验不好。

sendBeacon
1. 异步，非阻塞对数据传输方法。
2. 返回值true，false表示是否成功

缺点：
不能跨域，需要服务端设置
兼容性问题。
请求方式为post
