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
  const Main = require('./pages/Main').default

  render( <Provider store={store}>
    <Main/>
    </Provider>,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
 // eslint-disable-next-line no-undef
if (__DEV__) {
  console.log('Running in dev mode. Hot: ' + module.hot.active)
  if (module.hot.active) {
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
          './pages/Main'
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
