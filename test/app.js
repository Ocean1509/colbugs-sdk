const express = require('express')
const app = new express()
const path = require('path')
app.use(express.static(path.join(__dirname, '../dist')))


app.listen(3001, () => { console.log('3001')})