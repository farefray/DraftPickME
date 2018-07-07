import { combineReducers } from 'redux';
import { nprogress } from 'redux-nprogress';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  nprogress
});

export default rootReducer;
