import React from 'react';
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line

import App from './App.jsx';
// ReactDOM.render (<App/>, document.getElementById ('root'))
const root = document.getElementById('root');
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default //eslint-disable-line
    // ReactDOM.hydrate (<NextApp/>, document.getElementById ('root'))
    render(NextApp)
  })
}
// todo  render hydrate
// https://blog.csdn.net/ktutu/article/details/79055999
// default
