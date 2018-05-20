/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import { Provider } from 'mobx-react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { lightBlue, pink } from 'material-ui/colors'
import App from './views/App.jsx';
import { AppState, TopicStore} from './store/store';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    accent: pink,
    type: 'light',
  },
})

const createApp = (TheApp) => {
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
    render(){
      return <TheApp />
    }
  }
  return Main;
}

const initialListState = {}; // eslint-disable-line
const appState = new AppState(initialListState.appState)
const topicStore = new TopicStore(initialListState.topicStore);
// const initialListSize = window.__INITIAL_STATE__ !! {}; // eslint-disable-line

// ReactDOM.render (<App/>, document.getElementById ('root'))
const root = document.getElementById('root');
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}/>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}
render(createApp(App))

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default //eslint-disable-line
    // ReactDOM.hydrate (<NextApp/>, document.getElementById ('root'))
    render(createApp(NextApp))
  })
}
// todo  render hydrate
// https://blog.csdn.net/ktutu/article/details/79055999
// default
/* eslint-disable */
