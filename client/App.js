import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import { Provider } from 'mobx-react'

import App from './views/App.jsx';
import AppState from './store/app-state';
const initialListSize = window.__INITIAL_STATE__!!{} //eslint-disable-line
// ReactDOM.render (<App/>, document.getElementById ('root'))
const root = document.getElementById('root');
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={new AppState()}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App').default //eslint-disable-line
    // ReactDOM.hydrate (<NextApp/>, document.getElementById ('root'))
    render(NextApp)
  })
}
// todo  render hydrate
// https://blog.csdn.net/ktutu/article/details/79055999
// default
