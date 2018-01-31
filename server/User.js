class User {
  /**
   * Creates an instance of User.
   * @param {any} { socket, name } 
   * @memberof User
   */
  constructor({ socket, name }) {
    this.socket = socket
    this.name = name
    this.messages = []
  }

  register(name) {
    this.name = name
    this.color = this.randomColor()
  }

  randomColor() {
    return '#' + Math.round(Math.random() * 0xFFFFFF).toString(16)
  }

  toString() {
    if (this.stringified === null) {
      this.stringified = JSON.stringify(this, ['name', 'color'])
    }
    return this.stringified
  }

  valueOf() {
    return this.toString()
  }
}

module.exports = User
