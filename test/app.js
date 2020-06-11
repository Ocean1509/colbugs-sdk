const express = require('express')
const app = new express()
const path = require('path')
const cors = require('cors')
app.set('host','192.168.0.110')
// let options = {
//     setHeaders: function (res, path, stat) {
//         res.set('Access-Control-Allow-Origin', '*')
//     }
// }
// app.all('/', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
app.use(cors())
// test iframe
app.get('/iframe', (req, res) => {
    res.send(`
    <!DOCTYPE html >
        <html lang="en">
        <head>
        <meta charset = "UTF-8">
        <meta name = "viewport" content = "width=device-width, initial-scale=1.0">
        <title> Document </title> </head> 
        <body>
        <div>
            
        </div> <script>console.log(a)</script> </body> </html> `)
})
// test api
app.get('/api/test', (req, res) => {
    // res.json({ success: 'ok' })
    // 情景模拟
    // 1. 500服务端错误
    // 2. 400
    // 3. 304
    // 4. 无法跨域
    // 5. 超时
    // 6. 200
    // res.send(500).end('server error')
    // res.status(403).end()
    // res.status(303).end("dfdsfsd")
    // cancel cors
    // setTimeout(() => {res.send('1232')}, 1200)
    res.status(400).send('test1')
})
// 多接口请求
app.get('/api/test2', (req, res) => {
    setTimeout(() => {
        res.status(401).send('test2')
    }, 1000)
})
app.get('/api/test3', (req, res) => {
    setTimeout(() => {
        res.status(200).send('test3')
    }, 2000)
})
app.get('/api/test4', (req, res) => {
    res.status(500).send('test4')
})
app.use(express.static(path.join(__dirname, '../dist')))
app.listen(3001, () => {
    console.log('3001')
})