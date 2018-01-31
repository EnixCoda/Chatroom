// const WebSocket = typeof WebSocket === 'undefined' ? require('ws') : WebSocket
const WebSocket = require('ws')

class Speaker {
  static states = {
    OFFLINE: 'OFFLINE',
    CONNECTING: 'CONNECTING',
    ONLINE: 'ONLINE',
    UNREGISTERED: 'UNREGISTERED',
  }

  static get actionTexts() {
    const {
      OFFLINE,
      CONNECTING,
      UNREGISTERED,
      ONLINE,
    } = Speaker.states

    return {
      [OFFLINE]: 'CONNECT',
      [CONNECTING]: 'WAIT...',
      [UNREGISTERED]: 'REGISTER',
      [ONLINE]: 'SEND',
    }
  }

  static get hintTexts() {
    const {
      OFFLINE,
      CONNECTING,
      UNREGISTERED,
      ONLINE,
    } = Speaker.states
    return {
      [OFFLINE]: 'you are offline',
      [CONNECTING]: 'connecting, please wait...',
      [UNREGISTERED]: 'enter your name to start',
      [ONLINE]: 'type here to chat',
    }
  }

  get hintText() {
    return Speaker.hintTexts[this.state]
  }

  get actionText() {
    return Speaker.actionTexts[this.state]
  }

  constructor(serverUrl) {
    this.serverUrl = serverUrl
    this.state = Speaker.states.OFFLINE
    this.sendingWords = []
    this.conversationLog = []
    this.connect()
  }

  connect() {
    this.state = Speaker.states.CONNECTING
    this.ws = new WebSocket(this.serverUrl)
    this.ws.addEventListener('open', this.onOpen)
    this.ws.addEventListener('error', this.onError)
    this.ws.addEventListener('close', this.onClose)
    this.ws.addEventListener('message', this.onMessage)
  }

  onOpen = event => {
    this.conversationLog.length = 0
    this.state = Speaker.states.UNREGISTERED
    if (this.name) {
      this.speak(this.name)
    } else {
      this.speak('enix')
    }
  }

  onError = error => {
    this.state = Speaker.states.OFFLINE
    console.error(error)
  }

  onClose = event => {
    this.state = Speaker.states.OFFLINE
    this.listen({
      type: 'notification',
      content: 'disconnect from server',
      time: Date.now(),
    })
  }

  onMessage = event => {
    this.listen(JSON.parse(event.data))
  }

  speak(content) {
    switch (this.state) {
      case Speaker.states.ONLINE:
        if (content) {
          const message = {
            content,
            type: 'message',
          }
          this.ws.send(JSON.stringify(message))
        }
        break

      case Speaker.states.UNREGISTERED:
        if (content) {
          this.name = content
          const registerMessage = {
            name: this.name,
            type: 'register',
          }
          this.ws.send(JSON.stringify(registerMessage))
        }
        break

      case Speaker.states.OFFLINE:
      case Speaker.states.CONNECTING:
      default:
        break
    }
  }

  listen(data) {
    console.log(data)
    const { name, type, content, time, color } = data
    if (type === 'notification') {
      if (content === 'register success') {
        this.onRegister(data)
      }
    } else {
      // type in ['notification', 'message']
      this.conversationLog.push(data)
    }
  }

  onRegister(data) {
    const { name, type, content, time, color } = data
    this.name = name
    this.state = Speaker.states.ONLINE
    this.color = color
  }
}

module.exports.default = Speaker
