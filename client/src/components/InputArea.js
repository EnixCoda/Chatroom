import React, { Component } from 'react'

export default class InputArea extends Component {
  componentWillMount() {
    this.setState({
      message: '',
    })
  }

  submitMessage() {
    const { message } = this.state
    this.props.speak(message)
    this.setState({
      message: '',
    })
  }

  render() {
    const { disabled, actionText, hintText } = this.props
    return (
      <div
        style={{
          position: 'fixed',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 0 2px 2px #ddd',
          display: 'flex',
        }}
      >
        <input
          style={{
            fontSize: '20px',
            height: '50px',
            flex: 1,
            margin: 0,
            padding: '10px 4px',
            boxSizing: 'border-box',
            border: '1px solid',
            borderColor:
              this.state.message.length < 40
                ? this.state.focused
                  ? '#3190e8'
                  : '#999'
                : '#ff9075',
            boxShadow: this.state.focused ? 'inset 0 0 1px 1px #eee' : 'none',
            borderRadius: 0,
            outline: 'none',
          }}
          onFocus={() => {
            this.setState({
              focused: true,
            })
          }}
          onBlur={() => {
            this.setState({
              focused: false,
            })
          }}
          onChange={({ nativeEvent }) => {
            this.setState({
              message: nativeEvent.target.value,
            })
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Enter') {
              this.submitMessage()
            }
          }}
          placeholder={hintText}
          value={this.state.message}
          maxLength={40}
        />
        <button
          style={{
            height: '50px',
            lineHeight: '50px',
            padding: '0 10px',
            boxSizing: 'border-box',
            margin: 0,
            border: 'none',
            fontSize: '16px',
            color: this.state.buttonActive ? '#f5f5f5' : '#3190e8',
            background: this.state.buttonActive ? '#3190e8' : '#f5f5f5',
            outline: 'none',
          }}
          disabled={disabled}
          onFocus={() => {
            this.setState({
              buttonActive: true,
            })
          }}
          onBlur={() => {
            this.setState({
              buttonActive: false,
            })
          }}
          onTouchStart={() => {
            this.setState({
              buttonActive: true,
            })
          }}
          onTouchEnd={() => {
            this.setState({
              buttonActive: false,
            })
          }}
          onMouseDown={() => {
            this.setState({
              buttonActive: true,
            })
          }}
          onMouseUp={() => {
            this.setState({
              buttonActive: false,
            })
          }}
          onClick={() => {
            this.submitMessage()
          }}
        >
          {actionText}
        </button>
      </div>
    )
  }
}
