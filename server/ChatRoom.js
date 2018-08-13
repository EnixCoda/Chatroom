const { MESSAGE_TYPES, Message, ServerBroadcastMessage, ServerNotificationMessage } = require('./Message')
const User = require('./User')

class ChatRoom {
  constructor() {
    this.conversationLog = [] // only save messages from users
    this.users = new Map(/* username -> User */)
  }

  /**
   * enter(user): user enter as guest or get online again
   *
   * @param {User} user
   * @memberof ChatRoom
   */
  enter(user) {
    this.conversationLog.slice(-20).forEach(message => {
      this.send(user, message, { notLog: true })
    })
    this.broadcastNotification(
      user.name && this.users.get(user.name) === this.users.get(username)
        ? `'${user.name}' came back, ${this.users.size} users online`
        : `one guest connected, ${this.users.size} users online`
    )
  }


  /**
   * receive(user, message): receive message from user
   *
   * @param {User} user
   * @param {Message} message
   * @memberof ChatRoom
   */
  receive(user, message) {
    switch (message.type) {
      case MESSAGE_TYPES.REGISTER:
        const { name } = message
        const foundUser = this.users.get(name)
        if (foundUser && foundUser !== user) {
          this.notify(user, `username '${name}' already exist`)
        } else {
          user.register(name)
          this.users.set(name, user)
          this.notify(user, `register success`)
          this.broadcastNotification(`${name} registered`)
        }
        break

      case MESSAGE_TYPES.MESSAGE:
        this.broadcast(new Message({ user, content: message.content }))
        break

      case MESSAGE_TYPES.BROADCAST:
        // for now users cannot send broadcast to server
      case MESSAGE_TYPES.NOTIFICATION:
        // for now users cannot send notification to server
      default:
        break
    }
  }

  /**
   * leave(user): user leave
   *
   * @param {User} user
   * @memberof ChatRoom
   */
  leave(user) {
    this.users.delete(user.name)
    this.broadcastNotification(`${user.name || 'one guest'} left, ${this.users.size} users online`)
  }

  /**
   * send message to one user
   *
   * @param {User} user
   * @param {Message} message
   * @param {any} [options={}]
   * @memberof ChatRoom
   */
  send(user, message, options = {}) {
    user.socket.send(`${message}`)
    if (!options.notLog) {
      this.conversationLog.push(message)
    }
  }

  /**
   * send message to every user
   *
   * @param {Message} message
   * @param {any} [options={}]
   * @memberof ChatRoom
   */
  broadcast(message, options = {}) {
    this.users.forEach(user => {
      this.send(user, message, {...options, notLog: true})
    })
    if (!options.notLog) {
      this.conversationLog.push(message)
    }
  }

  /**
   * send notification to the user
   *
   * @param {User} user
   * @param {String} content
   * @memberof ChatRoom
   */
  notify(user, content) {
    this.send(user, new ServerNotificationMessage(content), { notLog: true })
  }

  /**
   * send notification to every user
   *
   * @param {String} content
   * @memberof ChatRoom
   */
  broadcastNotification(content) {
    this.broadcast(new ServerNotificationMessage(content), { notLog: true })
  }
}

module.exports = ChatRoom
