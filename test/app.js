const express = require('express')
const app = new express()
const path = require('path')
const cors = require('cors')
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
    // res.status(403).end()
    res.send(500).end('server error')
})
app.use(express.static(path.join(__dirname, '../dist')))
app.listen(3001, () => {
    console.log('3001')
})