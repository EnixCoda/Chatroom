import React, { Component } from 'react'

const reverseColor = color => {
  return '#' + ('000000' + (0xFFFFFF - parseInt(color.replace(/#/, ''), 16)).toString(16)).slice(-6)
}

export default class DialogBubble extends Component {
  shouldComponentUpdate() {
    return false
  }

  componentDidUpdate(props, state) {
    console.log('dialog bubble updated')
  }

  render() {
    const {name, type, content, color} = this.props.speak
    let messageEle
    if (type === 'notification') {
      messageEle = (
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: '14px',
          }}
          >
          <div
            style={{
              display: 'inline-block',
              background: '#999',
              borderRadius: '4px',
              margin: '3px 0',
              padding: '2px 4px'
            }}
            >
            <span
              style={{
                color: '#eee'
              }}
              >
              {content}
            </span>
          </div>
        </div>
      )
    } else if (type === 'message') {
      messageEle = (
        <div
          style={{
            display: 'inline-block'
          }}
          >
          <b
            style={{
              fontSize: '16px',
              color,
            }}
            >
            {name + ':'}
          </b>
          <p
            style={{
              display: 'inlineBlock',
              fontSize: '18px',
              color: '#666',
              //background: reverseColor(color),
              margin: 0,
              marginBottom: '6px',
              borderRadius: '8px',
              padding: '4px',
              paddingLeft: '12px'
            }}
            >
            {content}
          </p>
        </div>
      )
    }
    return (
      <div id={this.props.id}>
        {messageEle}
      </div>
    )
  }
}
