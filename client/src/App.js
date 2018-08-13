import React, { Component } from 'react'
import Conversation from './components/Conversation'
import InputArea from './components/InputArea'
import Speaker from './Speaker'

const actionTexts = {
  [Speaker.states.OFFLINE]: 'CONNECT',
  [Speaker.states.CONNECTING]: 'WAIT...',
  [Speaker.states.UNREGISTERED]: 'REGISTER',
  [Speaker.states.ONLINE]: 'SEND',
}

const hintTexts = {
  [Speaker.states.OFFLINE]: 'you are offline',
  [Speaker.states.CONNECTING]: 'connecting, please wait...',
  [Speaker.states.UNREGISTERED]: 'enter your name to start',
  [Speaker.states.ONLINE]: 'type here to chat',
}

export default class App extends Component {
  componentDidMount() {
    const { speaker } = this.props
    speaker.connect()
  }

  render() {
    const { speaker } = this.props
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'left',
        }}
      >
        <Conversation conversationLog={speaker.conversationLog} />
        <InputArea
          speak={speaker.speak}
          actionText={actionTexts[speaker.state]}
          hintText={hintTexts[speaker.state]}
          disabled={speaker.state === Speaker.states.CONNECTING}
        />
      </div>
    )
  }
}
