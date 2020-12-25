/* eslint-disable */
const app = require('express')()
const server = require('http').createServer(app)

// const io = require('socket.io')(server)
const io = require('socket.io')(server, {
  cors: {
    origin: '*:*',
    transports: ['websocket', 'polling', 'long-polling'],
    methods: ['GET', 'POST']
  }
})

// const redisAdapter = require('socket.io-redis')
// io.adapter(redisAdapter({ host: 'localhost', port: 6379 }))

const users = require('./users')()

const m = (name, text, id) => ({ name, text, id })

io.on('connection', (socket) => {
  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Data is wrong!')
    }
    socket.join(data.room)

    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })
    cb({ userId: socket.id })
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
    socket.emit('newMessage', m('admin', `Welcome to our chat ${data.name}`))
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `User ${data.name} joined!`))
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      return cb('Please enter text')
    }
    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id))
    }
    cb()
  })
  socket.on('userLeft', (id, cb) => {
    const user = users.remove(id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit(
        'newMessage',
        m('admin', `User ${user.name} has left the room!`)
      )
    }
    cb()
  })

  socket.on('disconect', () => {
    const user = users.remove(id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit(
        'newMessage',
        m('admin', `User ${user.name} has left the room!`)
      )
    }
  })
})

module.exports = {
  app,
  server
}
