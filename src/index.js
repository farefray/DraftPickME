import React from 'react';
import {
  ReactDOM,
  render
} from 'react-dom'
import { Provider } from 'react-redux';
import store from './store'
import './styles/main.scss'

import {
  configureFakeBackend
} from './helpers';

// setup fake backend [todo on dev only]
configureFakeBackend();

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('app')

let myRender = () => {
  const App = require('./pages/App').default

  render( <Provider store={store}>
    <App/>
    </Provider>,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = myRender
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      render( < RedBox error = {
          error
        }
        />, MOUNT_NODE)
      }

      myRender = () => {
        try {
          renderApp()
        } catch (e) {
          console.error(e)
          renderError(e)
        }
      }

      // Setup hot module replacement
      module.hot.accept([
          './pages/App'
        ], () =>
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(MOUNT_NODE)
          myRender()
        })
      )
    }
  }

  // Let's Go!
  // ------------------------------------
  myRender()
