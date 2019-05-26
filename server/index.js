const ChatRoom = require('./ChatRoom')
const User = require('./User')

const chatRoom = new ChatRoom()
const HTTP = require('http')
const WebSocket = require('ws')

const server = HTTP.createServer()

const webSocketServer = new WebSocket.Server({ server })

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

const port = Number(process.env.PORT) || 8080
server.listen(port, () => {
  console.log('Server listening on port', port)
})
