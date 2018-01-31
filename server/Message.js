const User = require('./User')

const MESSAGE_TYPES = {
  NOTIFICATION: 'notification',
  REGISTER: 'register',
  MESSAGE: 'message',
  BROADCAST: 'broadcast',
}

class Message {
  static types = MESSAGE_TYPES

  constructor({ user, content, type = MESSAGE_TYPES.MESSAGE }) {
    this.user = user
    this.content = content
    this.type = type
    this.stringified = null
  }

  toString() {
    if (this.stringified === null) {
      this.stringified = JSON.stringify({
        user: `${this.user}`, // invoke toString magic
        content: `${this.content}`,
        type: `${this.type}`,
      })
    }
    return this.stringified
  }

  valueOf() {
    return this.toString()
  }
}

class ServerBroadcastMessage extends Message {
  static Server = new User({ name: 'Server' })
  constructor(content) {
    super({
      user: ServerBroadcastMessage.Server,
      content,
      type: ServerBroadcastMessage.types.BROADCAST,
    })
  }
}

class ServerNotificationMessage extends Message {
  static Server = new User({ name: 'Server' })
  constructor(content) {
    super({
      user: ServerBroadcastMessage.Server,
      content,
      type: ServerBroadcastMessage.types.NOTIFICATION,
    })
  }
}

module.exports = {
  MESSAGE_TYPES,
  Message,
  ServerBroadcastMessage,
  ServerNotificationMessage,
}
