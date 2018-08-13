import ReactDOM from 'react-dom'
import React from 'react'
import { hot } from 'react-hot-loader'
import App from './App'
import Speaker from './Speaker'

const render = (App, container) => ReactDOM.render(<App />, container)
const container = initDocument()

const theApp = process.env.production ? App : hot(module)(App)

const speaker = new Speaker()
function linkApp(speaker) {
  return function(C) {
    return class linkedApp extends React.Component {
      constructor() {
        super()
        speaker.beep = () => this.forceUpdate()
      }
      render() {
        return <C speaker={speaker} />
      }
    }
  }
}

render(linkApp(speaker)(theApp), container)

function initDocument() {
  document.documentElement.style.height = '100%',
  document.documentElement.style.fontFamily = 'Roboto'
  document.documentElement.style.fontSize = '0'

  document.body.style.margin = 0
  document.body.style.textAlign = 'center'
  document.body.style.height = '100%'

  const container = document.createElement('div')
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.maxWidth = '400px'
  container.style.display = 'inline-block'
  container.style.boxShadow = '0 0 2px #999'

  document.body.appendChild(container)

  return container
}
