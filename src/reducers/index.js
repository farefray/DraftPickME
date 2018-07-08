import { combineReducers } from 'redux';
import { nprogress } from 'redux-nprogress';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alerts } from './alerts.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alerts,
  nprogress
});

export default rootReducer;
