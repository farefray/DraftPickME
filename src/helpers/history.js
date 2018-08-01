let history;

if (typeof document !== 'undefined') {
  const createHistory = require('history/createBrowserHistory').default

  history = createHistory()
}

export default history