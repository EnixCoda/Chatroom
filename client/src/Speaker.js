export default class Speaker {
  static states = {
    OFFLINE: 'OFFLINE',
    CONNECTING: 'CONNECTING',
    ONLINE: 'ONLINE',
    UNREGISTERED: 'UNREGISTERED',
  }

  static serverUrl = `ws://${window.location.hostname}:8080`

  constructor() {
    this.state = Speaker.states.OFFLINE
    this.sendingWords = []
    this.conversationLog = []
    this.beep()
  }

  beep() {}

  onError = error => {
    this.state = Speaker.states.OFFLINE
    console.log(error)
    this.beep()
  }

  onClose = event => {
    this.state = this.states.OFFLINE
    this.listen({
      data: JSON.stringify({
        type: 'notification',
        content: 'disconnect from server',
        time: +new Date(),
      }),
    })
    this.beep()
  }

  onOpen = event => {
    this.conversationLog.length = 0
    this.state = Speaker.states.UNREGISTERED
    if (this.name) this.speak(this.name)
    this.beep()
  }

  onMessage = event => {
    this.listen(event)
    this.beep()
  }

  connect = () => {
    this.state = Speaker.states.CONNECTING
    this.ws = new WebSocket(Speaker.serverUrl)
    this.ws.addEventListener('open', this.onOpen)
    this.ws.addEventListener('error', this.onError)
    this.ws.addEventListener('close', this.onClose)
    this.ws.addEventListener('message', this.onMessage)
    this.beep()
  }

  logout = () => {
    // TODO: clear cached user info
    this.beep()
  }

  speak = (content) => {
    switch (this.state) {
      case Speaker.states.ONLINE:
        if (content) {
          const message = {
            name: this.name,
            content,
            type: 'message',
            time: +new Date(),
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
            content,
          }
          this.ws.send(JSON.stringify(registerMessage))
        }
        break
      case Speaker.states.OFFLINE:
        this.connect()
        break
      case Speaker.states.CONNECTING:
    }
    this.beep()
  }

  listen = (event) => {
    const rawData = event.data
    const data = JSON.parse(rawData)
    const { id, name, type, content, code, time, color } = data
    if (type === 'notification') {
      if (content === 'register success') {
        this.state = Speaker.states.ONLINE
        const { color } = content
        this.color = color
      }
    }
    this.conversationLog.push(data)
    this.beep()
  }
}
