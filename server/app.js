/* eslint-disable */
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    console.log('IO connected')
})

module.exports = {
    app,
    server
}