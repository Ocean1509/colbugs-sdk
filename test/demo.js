/**
 * window.onerror 和 window.addEventListen
 * 同步Error的种类,可以通过Error.name拿到error类型
 * 1. Error: 普通类型 new Error 
 * 2. RangeError: 数值变量或参数超出其有效范围。例子：var a = new Array(-1); 
 * 3. EvalError: 与eval()相关的错误。eval()本身没有正确执行。
 * 4. ReferenceError: 引用错误。 例子：console.log(b);
 * 5. SyntaxError: 语法错误。例子：var a = ;
 * 6. TypeError: 变量或参数不属于有效范围。例子：[1,2].split('.')
 * 7. URIError: 给 encodeURI或 decodeURl()传递的参数无效。例子：decodeURI('%2')
 */

 // 1. throw new Error(1)
 // 2. var a = new Array(-1)
 // 3. eval
 // 4. console.log(b);
 // 5. var a =:
 // 6. [1,2].split('.')
 // 7. decodeURI('%2')


 // 异步error  window.onerror捕获
 // 跨域脚本捕获
 // 允许跨域且 crossorigin = anonymous
 