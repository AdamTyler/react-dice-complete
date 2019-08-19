import React from 'react'
import ReactDOM from 'react-dom'
import TestApp from './TestApp'

import { AppContainer } from 'react-hot-loader'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(TestApp)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./TestApp', () => {
    const NextApp = require('./TestApp')
    render(NextApp)
  })
}
