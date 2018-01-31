const ChatRoom = require('./ChatRoom')
const User = require('./User')

const chatRoom = new ChatRoom()
const webSocketServer = new (require('ws')).Server({port: 8080})

console.log('Server running')

webSocketServer.on('connection', webSocket => {
  console.log('one connection up')

  const user = new User({ socket: webSocket })
  chatRoom.enter(user)

  webSocket
    .on('message', message => {
      console.log(user.name, message)
      try {
        chatRoom.receive(user, JSON.parse(message))
      } catch (err) {
        console.error(err)
      }
    })
    .on('close', (code, message) => {
      console.log('one connection close')
      try {
        chatRoom.leave(user)
      } catch (err) {
        console.error(err)
      }
    })
})
