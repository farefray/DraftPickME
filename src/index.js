import React from 'react';
import {
  ReactDOM,
  render
} from 'react-dom'
import { Provider } from 'react-redux';
import store from './store'
import './styles/main.scss'
import { App } from "./pages/App";

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('app')

let myRender = () => {
  render( <Provider store={store}>
    <App/>
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

      myRender = () => {
        try {
          renderApp()
        } catch (e) {
          console.error(e)
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
