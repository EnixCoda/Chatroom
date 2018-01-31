import ReactDOM from 'react-dom'
import React from 'react'
import App from './containers/App'

import Speaker from './Speaker'

const speaker = new Speaker(`ws://${window.location.hostname}/chatroom/ws`)

initDocument()

const render = App => {
  ReactDOM.render(
    <App speaker={speaker} />,
    document.querySelector('#app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App) })
}

function initDocument() {
  document.documentElement.style.height = '100%',
  document.documentElement.style.fontFamily = 'Roboto'
  document.documentElement.style.fontSize = '0'

  document.body.style.margin = 0
  document.body.style.textAlign = 'center'
  document.body.style.height = '100%'

  const container = document.querySelector('#app')
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.maxWidth = '400px'
  container.style.display = 'inline-block'
  container.style.boxShadow = '0 0 2px #999'
}
