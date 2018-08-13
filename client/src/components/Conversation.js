import React, { Component } from 'react'
import DialogBubble from './DialogBubble'

export default class Conversation extends Component {
  constructor() {
    super()
    this.state= {
      bottomUnlocked: false,
      atBottom: true,
      haveUnreadMessage: false
    }
  }

  componentDidUpdate(props, state) {
    if (!this.state.bottomUnlocked) {
      this.div.scrollTop = this.div.scrollHeight - this.div.offsetHeight
    }
    return true
  }

  render() {
    const { conversationLog } = this.props
    const dialogBubbles = conversationLog.map((speak, i) => <DialogBubble key={i} id={i} speak={speak} />)
    return (
      <div
        style={{
          width: '100%',
          height: 'calc(100% - 50px)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          boxSizing: 'border-box',
          padding: '10px'
        }}
        ref={div => this.div = div}
        onScroll={({nativeEvent}) => {
          const {scrollTop, scrollHeight, offsetHeight} = nativeEvent.target
          if (scrollTop + offsetHeight === scrollHeight) {
            this.setState({
              atBottom: true,
              haveUnreadMessage: false,
              bottomUnlocked: false
            })
          } else {
            this.setState({
              atBottom: false,
              bottomUnlocked: true
            })
          }
        }}
        >
        {
          this.state.haveUnreadMessage &&
          <div
            style={{
              position: 'fixed',
              // right: 0,
              bottom: '50px',
              left: 'calc(50% - 20px)',
              margin: '6px',
              borderRadius: '40px',
              width: '40px',
              height: '40px',
              background: '#ffc107',
              fontSize: '20px',
              color: '#fff',
              textAlign: 'center',
              lineHeight: '44px',
              cursor: 'pointer'
            }}
            onClick={() => {
              this.div.scrollTop = this.div.scrollHeight - this.div.offsetHeight
            }}
            >
            ⬇︎
          </div>
        }
        {dialogBubbles}
      </div>
    )
  }
}
