import React, { Component } from 'react'
import Conversation from '../components/Conversation'
import InputArea from '../components/InputArea'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      speaker: props.speaker
    }
    this.update = () => {
      this.setState({
        speaker: this.props.speaker
      })
    }
    props.speaker.bindApp(this)
  }

  render() {
    const { speaker } = this.state
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'left',
        }}
        >
        <Conversation speaker={speaker} />
        <InputArea speaker={speaker} />
      </div>
    )
  }
}
