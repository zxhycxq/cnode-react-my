import React from 'react';
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App';
import { createStoreMap } from './store/store';
import { MuiThemeProvider } from 'material-ui/styles';
import { JssProvider } from 'react-jss';

useStaticRendering(true)

export default (stores, routerContext, SheetsRegistry, jss, url) => (
      <Provider {...stores}>
        <StaticRouter context={routerContext} location={url}>
          <JssProvider registry={SheetsRegistry} jss={jss}>
            <MuiThemeProvider theme={theme}>
              <App />
            </MuiThemeProvider>
          </JssProvider>
        </StaticRouter>
      </Provider>
  )

export { createStoreMap }
