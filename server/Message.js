const User = require('./User')

const MESSAGE_TYPES = {
  NOTIFICATION: 'notification',
  REGISTER: 'register',
  MESSAGE: 'message',
  BROADCAST: 'broadcast',
}

class Message {
  constructor({ user, content, type = MESSAGE_TYPES.MESSAGE }) {
    this.user = user
    this.content = content
    this.type = type
    this.stringified = null
  }

  toString() {
    if (this.stringified === null) {
      this.stringified = JSON.stringify({
        user: `${this.user.name}`, // invoke toString magic
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

Message.types = MESSAGE_TYPES

class ServerBroadcastMessage extends Message {
  constructor(content) {
    super({
      user: ServerBroadcastMessage.Server,
      content,
      type: ServerBroadcastMessage.types.BROADCAST,
    })
  }
}
ServerBroadcastMessage.Server = new User({ name: 'Server' })

class ServerNotificationMessage extends Message {
  constructor(content) {
    super({
      user: ServerBroadcastMessage.Server,
      content,
      type: ServerBroadcastMessage.types.NOTIFICATION,
    })
  }
}
ServerNotificationMessage.Server = new User({ name: 'Server' })

module.exports = {
  MESSAGE_TYPES,
  Message,
  ServerBroadcastMessage,
  ServerNotificationMessage,
}
